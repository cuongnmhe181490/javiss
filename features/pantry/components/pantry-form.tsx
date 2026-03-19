"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { pantryItemInputSchema } from "@/lib/validation/profile";
import { cn } from "@/lib/utils";
import type { PantryItemInput } from "@/types/pantry";

type PantryFormProps = {
  initialValues?: Partial<PantryItemInput>;
  onSubmit: (values: PantryItemInput) => Promise<void> | void;
  className?: string;
  submitLabel?: string;
};

const categoryOptions = [
  "proteins",
  "vegetables",
  "fruits",
  "carbs_grains",
  "dairy",
  "spices_condiments",
  "other",
] as const;

const sourceOptions = ["manual", "imported", "shopping", "recipe"] as const;

function normalizeTextValue(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length > 0 ? text : undefined;
}

function toNumberValue(value: FormDataEntryValue | null) {
  const text = normalizeTextValue(value);
  if (!text) {
    return undefined;
  }

  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function PantryForm({
  initialValues,
  onSubmit,
  className,
  submitLabel = "Luu mon pantry",
}: PantryFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  return (
    <form
      className={cn(
        "space-y-6 rounded-3xl border border-black/5 bg-white/90 p-6 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.22)] backdrop-blur-sm",
        className,
      )}
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        const nextValue = {
          name: normalizeTextValue(formData.get("name")),
          normalizedName: normalizeTextValue(formData.get("normalizedName")),
          quantity: toNumberValue(formData.get("quantity")),
          unit: normalizeTextValue(formData.get("unit")),
          category: normalizeTextValue(formData.get("category")),
          expiresOn: normalizeTextValue(formData.get("expiresOn")),
          source: normalizeTextValue(formData.get("source")),
          isEstimated: formData.get("isEstimated") === "on",
        };

        const parsed = pantryItemInputSchema.safeParse(nextValue);
        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? "Vui long kiem tra lai cac truong pantry.");
          setIsPending(false);
          return;
        }

        try {
          await onSubmit(parsed.data);
        } catch (submissionError) {
          setError(
            submissionError instanceof Error ? submissionError.message : "Khong the luu mon pantry.",
          );
        } finally {
          setIsPending(false);
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">
            Mon trong pantry
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950">
            Them nguyen lieu ban da co
          </h2>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Dang luu..." : submitLabel}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Ten" name="name" defaultValue={initialValues?.name} />
        <Field
          label="Ten chuan hoa"
          name="normalizedName"
          defaultValue={initialValues?.normalizedName}
        />
        <Field label="So luong" name="quantity" type="number" defaultValue={initialValues?.quantity} />
        <Field label="Don vi" name="unit" defaultValue={initialValues?.unit} />
        <Field label="Han su dung" name="expiresOn" type="date" defaultValue={initialValues?.expiresOn} />
        <SelectField
          label="Nguon"
          name="source"
          options={sourceOptions}
          defaultValue={initialValues?.source ?? "manual"}
        />
      </div>

      <SelectField
        label="Danh muc"
        name="category"
        options={categoryOptions}
        defaultValue={initialValues?.category ?? "other"}
      />

      <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
        <input defaultChecked={initialValues?.isEstimated ?? false} name="isEstimated" type="checkbox" />
        So luong uoc tinh
      </label>

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | boolean | null;
  type?: string;
};

function Field({ label, name, defaultValue, type = "text" }: FieldProps) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <input
        className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
        defaultValue={defaultValue === null ? "" : (defaultValue as string | number | undefined)}
        name={name}
        type={type}
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  options: readonly string[];
  defaultValue: string;
};

function SelectField({ label, name, options, defaultValue }: SelectFieldProps) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <select
        className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
        defaultValue={defaultValue}
        name={name}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll("_", " ")}
          </option>
        ))}
      </select>
    </label>
  );
}
