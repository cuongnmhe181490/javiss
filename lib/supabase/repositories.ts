import type { Database } from "@/types/supabase";

import { createSupabaseServerClient } from "./server";

type Tables = Database["public"]["Tables"];
type QueryResult<T> = Promise<{ data: T; error: Error | null }>;

type ProfilesQuery = {
  select: (columns: string) => {
    eq: (column: string, value: string) => {
      maybeSingle: () => QueryResult<Tables["profiles"]["Row"] | null>;
    };
  };
  upsert: (payload: Tables["profiles"]["Insert"]) => {
    select: (columns: string) => {
      single: () => QueryResult<Tables["profiles"]["Row"]>;
    };
  };
};

type PantryItemsQuery = {
  select: (columns: string) => {
    eq: (column: string, value: string) => {
      order: (column: string, options: { ascending: boolean }) => {
        order: (column: string, options: { ascending: boolean }) => QueryResult<
          Tables["pantry_items"]["Row"][]
        >;
      };
    };
  };
  delete: () => {
    eq: (column: string, value: string) => QueryResult<null>;
  };
  insert: (payload: Array<Tables["pantry_items"]["Insert"] & { user_id: string }>) => {
    select: (columns: string) => QueryResult<Tables["pantry_items"]["Row"][]>;
  };
};

interface LooseSupabaseClient {
  from(table: "profiles"): ProfilesQuery;
  from(table: "pantry_items"): PantryItemsQuery;
}

export async function getProfileByUserId(userId: string) {
  const supabase = (await createSupabaseServerClient()) as unknown as LooseSupabaseClient;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Tables["profiles"]["Row"] | null;
}

export async function upsertProfile(profile: Tables["profiles"]["Insert"]) {
  const supabase = (await createSupabaseServerClient()) as unknown as LooseSupabaseClient;
  const { data, error } = await supabase.from("profiles").upsert(profile).select("*").single();

  if (error) {
    throw error;
  }

  return data as Tables["profiles"]["Row"];
}

export async function listPantryItems(userId: string) {
  const supabase = (await createSupabaseServerClient()) as unknown as LooseSupabaseClient;
  const { data, error } = await supabase
    .from("pantry_items")
    .select("*")
    .eq("user_id", userId)
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as Tables["pantry_items"]["Row"][];
}

export async function replacePantryItems(userId: string, items: Tables["pantry_items"]["Insert"][]) {
  const supabase = (await createSupabaseServerClient()) as unknown as LooseSupabaseClient;
  const { error: deleteError } = await supabase.from("pantry_items").delete().eq("user_id", userId);

  if (deleteError) {
    throw deleteError;
  }

  if (items.length === 0) {
    return [];
  }

  const payload = items.map((item) => ({ ...item, user_id: userId }));
  const { data, error } = await supabase.from("pantry_items").insert(payload).select("*");

  if (error) {
    throw error;
  }

  return (data ?? []) as Tables["pantry_items"]["Row"][];
}

export async function getUserBootstrap(userId: string) {
  const [profile, pantryItems] = await Promise.all([
    getProfileByUserId(userId),
    listPantryItems(userId),
  ]);

  return {
    profile,
    pantryItems,
  };
}
