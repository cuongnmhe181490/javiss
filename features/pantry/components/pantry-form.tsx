"use client";

import { useEffect, useMemo, useState } from "react";

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

function mapIssuesToErrors(issues: { path: PropertyKey[]; message: string }[]) {
  return Object.fromEntries(
    issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
  );
}

function buildPantryPayload(formData: FormData) {
  const name = normalizeTextValue(formData.get("name"));

  return {
    name,
    normalizedName: normalizeTextValue(formData.get("normalizedName")) ?? name?.toLowerCase(),
    quantity: toNumberValue(formData.get("quantity")),
    unit: normalizeTextValue(formData.get("unit")),
    category: normalizeTextValue(formData.get("category")),
    expiresOn: normalizeTextValue(formData.get("expiresOn")),
    source: normalizeTextValue(formData.get("source")),
    isEstimated: formData.get("isEstimated") === "on",
  };
}

export function PantryForm({
  initialValues,
  onSubmit,
  className,
  submitLabel = "Lưu pantry",
}: PantryFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const initialPayload = useMemo(
    () => ({
      name: initialValues?.name,
      normalizedName: initialValues?.normalizedName,
      quantity: initialValues?.quantity,
      unit: initialValues?.unit,
      category: initialValues?.category,
      expiresOn: initialValues?.expiresOn,
      source: initialValues?.source,
      isEstimated: initialValues?.isEstimated ?? false,
    }),
    [initialValues],
  );

  useEffect(() => {
    const parsed = pantryItemInputSchema.safeParse(initialPayload);
    setIsValid(parsed.success);
  }, [initialPayload]);

  function validateForm(formData: FormData) {
    const parsed = pantryItemInputSchema.safeParse(buildPantryPayload(formData));

    if (parsed.success) {
      setFieldErrors({});
      setIsValid(true);
      return parsed;
    }

    setFieldErrors(mapIssuesToErrors(parsed.error.issues));
    setIsValid(false);
    return parsed;
  }

  return (
    <form
      className={cn(
        "space-y-6 rounded-3xl border border-black/5 bg-white/90 p-6 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.22)] backdrop-blur-sm dark:border-white/10 dark:bg-white/6",
        className,
      )}
      onChange={(event) => {
        validateForm(new FormData(event.currentTarget));
        if (success) {
          setSuccess(null);
        }
      }}
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setIsPending(true);

        const parsed = validateForm(new FormData(event.currentTarget));
        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? "Vui lòng kiểm tra lại các trường pantry.");
          setIsPending(false);
          return;
        }

        try {
          await onSubmit(parsed.data);
          setSuccess("Đã lưu nguyên liệu.");
        } catch (submissionError) {
          setError(submissionError instanceof Error ? submissionError.message : "Không thể lưu nguyên liệu.");
        } finally {
          setIsPending(false);
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">
            Pantry
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950 dark:text-white">
            Thêm nguyên liệu sẵn có
          </h2>
        </div>
        <Button type="submit" disabled={isPending || !isValid}>
          {isPending ? "Đang lưu..." : submitLabel}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Tên" name="name" defaultValue={initialValues?.name} error={fieldErrors.name} />
        <Field label="Tên chuẩn hóa" name="normalizedName" defaultValue={initialValues?.normalizedName} error={fieldErrors.normalizedName} />
        <Field label="Số lượng" name="quantity" type="number" defaultValue={initialValues?.quantity} error={fieldErrors.quantity} />
        <Field label="Đơn vị" name="unit" defaultValue={initialValues?.unit} error={fieldErrors.unit} />
        <Field label="Hạn sử dụng" name="expiresOn" type="date" defaultValue={initialValues?.expiresOn} error={fieldErrors.expiresOn} />
        <SelectField label="Nguồn" name="source" options={sourceOptions} defaultValue={initialValues?.source ?? "manual"} error={fieldErrors.source} />
      </div>

      <SelectField
        label="Danh mục"
        name="category"
        options={categoryOptions}
        defaultValue={initialValues?.category ?? "other"}
        error={fieldErrors.category}
      />

      <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/8 dark:text-neutral-200">
        <input defaultChecked={initialValues?.isEstimated ?? false} name="isEstimated" type="checkbox" />
        Số lượng ước tính
      </label>

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
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
  error?: string;
};

function Field({ label, name, defaultValue, type = "text", error }: FieldProps) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{label}</span>
      <input
        className={cn(
          "h-12 w-full rounded-2xl border bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 dark:bg-white/8 dark:text-white",
          error ? "border-rose-300" : "border-black/10 dark:border-white/10",
        )}
        defaultValue={defaultValue === null ? "" : (defaultValue as string | number | undefined)}
        name={name}
        type={type}
      />
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  options: readonly string[];
  defaultValue: string;
  error?: string;
};

function SelectField({ label, name, options, defaultValue, error }: SelectFieldProps) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{label}</span>
      <select
        className={cn(
          "h-12 w-full rounded-2xl border bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 dark:bg-white/8 dark:text-white",
          error ? "border-rose-300" : "border-black/10 dark:border-white/10",
        )}
        defaultValue={defaultValue}
        name={name}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </label>
  );
}
