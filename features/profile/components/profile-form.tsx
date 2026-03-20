"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { profileInputSchema } from "@/lib/validation/profile";
import { joinCsvList, splitCsvList } from "@/lib/validation/shared";
import { cn } from "@/lib/utils";
import type { ProfileInput } from "@/types/profile";

type ProfileFormProps = {
  initialValues: ProfileInput;
  onSubmit: (values: ProfileInput) => Promise<void> | void;
  className?: string;
  submitLabel?: string;
};

const sexOptions = [
  "female",
  "male",
  "intersex",
  "nonbinary",
  "prefer_not_to_say",
] as const;
const goalOptions = ["fat_loss", "muscle_gain", "maintenance", "general_health"] as const;
const activityOptions = [
  "sedentary",
  "lightly_active",
  "moderately_active",
  "very_active",
  "athlete",
] as const;
const budgetPeriodOptions = ["daily", "weekly"] as const;
const equipmentOptions = [
  "bodyweight",
  "dumbbells",
  "resistance_bands",
  "bench",
  "barbells",
  "cable_machines",
  "leg_press",
  "treadmill",
  "full_gym_equipment",
] as const;
const weekdayOptions = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

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

function buildProfilePayload(formData: FormData) {
  return {
    displayName: normalizeTextValue(formData.get("displayName")),
    age: toNumberValue(formData.get("age")),
    sex: normalizeTextValue(formData.get("sex")),
    heightCm: toNumberValue(formData.get("heightCm")),
    weightKg: toNumberValue(formData.get("weightKg")),
    targetWeightKg: toNumberValue(formData.get("targetWeightKg")),
    goal: normalizeTextValue(formData.get("goal")),
    activityLevel: normalizeTextValue(formData.get("activityLevel")),
    mealsPerDay: toNumberValue(formData.get("mealsPerDay")),
    maxCookingTimeMin: toNumberValue(formData.get("maxCookingTimeMin")),
    budgetAmount: toNumberValue(formData.get("budgetAmount")),
    budgetPeriod: normalizeTextValue(formData.get("budgetPeriod")),
    dietaryTags: splitCsvList(normalizeTextValue(formData.get("dietaryTagsCsv"))),
    allergies: splitCsvList(normalizeTextValue(formData.get("allergiesCsv"))),
    dislikedFoods: splitCsvList(normalizeTextValue(formData.get("dislikedFoodsCsv"))),
    cuisinePreferences: splitCsvList(normalizeTextValue(formData.get("cuisinePreferencesCsv"))),
    availableWorkoutEquipment: Array.from(
      formData.getAll("availableWorkoutEquipment"),
      (value) => String(value),
    ),
    preferredWorkoutDays: Array.from(formData.getAll("preferredWorkoutDays"), (value) =>
      String(value),
    ),
    location: normalizeTextValue(formData.get("location")),
  };
}

function mapIssuesToErrors(issues: { path: PropertyKey[]; message: string }[]) {
  return Object.fromEntries(
    issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
  );
}

export function ProfileForm({
  initialValues,
  onSubmit,
  className,
  submitLabel = "Lưu hồ sơ",
}: ProfileFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const initialPayload = useMemo(() => ({ ...initialValues }), [initialValues]);

  useEffect(() => {
    const parsed = profileInputSchema.safeParse(initialPayload);
    setIsValid(parsed.success);
  }, [initialPayload]);

  function validateForm(formData: FormData) {
    const parsed = profileInputSchema.safeParse(buildProfilePayload(formData));

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
          setError(parsed.error.issues[0]?.message ?? "Vui lòng kiểm tra lại các trường trong hồ sơ.");
          setIsPending(false);
          return;
        }

        try {
          await onSubmit(parsed.data);
          setSuccess("Đã lưu hồ sơ.");
        } catch (submissionError) {
          setError(submissionError instanceof Error ? submissionError.message : "Không thể lưu hồ sơ.");
        } finally {
          setIsPending(false);
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">
            Hồ sơ
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950 dark:text-white">Tùy chọn cá nhân hóa</h2>
        </div>
        <Button type="submit" disabled={isPending || !isValid}>
          {isPending ? "Đang lưu..." : submitLabel}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Tên hiển thị" name="displayName" defaultValue={initialValues.displayName} error={fieldErrors.displayName} />
        <Field label="Tuổi" name="age" type="number" defaultValue={initialValues.age} error={fieldErrors.age} />
        <SelectField label="Giới tính" name="sex" options={sexOptions} defaultValue={initialValues.sex ?? "prefer_not_to_say"} error={fieldErrors.sex} />
        <Field label="Chiều cao (cm)" name="heightCm" type="number" defaultValue={initialValues.heightCm ?? ""} error={fieldErrors.heightCm} />
        <Field label="Cân nặng (kg)" name="weightKg" type="number" defaultValue={initialValues.weightKg ?? ""} error={fieldErrors.weightKg} />
        <Field
          label="Cân nặng mục tiêu (kg)"
          name="targetWeightKg"
          type="number"
          defaultValue={initialValues.targetWeightKg ?? ""}
          error={fieldErrors.targetWeightKg}
        />
        <SelectField label="Mục tiêu" name="goal" options={goalOptions} defaultValue={initialValues.goal} error={fieldErrors.goal} />
        <SelectField
          label="Mức độ vận động"
          name="activityLevel"
          options={activityOptions}
          defaultValue={initialValues.activityLevel}
          error={fieldErrors.activityLevel}
        />
        <Field label="Số bữa mỗi ngày" name="mealsPerDay" type="number" defaultValue={initialValues.mealsPerDay} error={fieldErrors.mealsPerDay} />
        <Field
          label="Thời gian nấu tối đa"
          name="maxCookingTimeMin"
          type="number"
          defaultValue={initialValues.maxCookingTimeMin}
          error={fieldErrors.maxCookingTimeMin}
        />
        <Field label="Mức ngân sách" name="budgetAmount" type="number" defaultValue={initialValues.budgetAmount ?? ""} error={fieldErrors.budgetAmount} />
        <SelectField
          label="Chu kỳ ngân sách"
          name="budgetPeriod"
          options={budgetPeriodOptions}
          defaultValue={initialValues.budgetPeriod ?? "weekly"}
          error={fieldErrors.budgetPeriod}
        />
        <Field label="Địa điểm" name="location" defaultValue={initialValues.location ?? ""} error={fieldErrors.location} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextAreaField
          label="Nhãn ăn uống"
          name="dietaryTagsCsv"
          defaultValue={joinCsvList(initialValues.dietaryTags)}
          hint="Nhập cách nhau bởi dấu phẩy."
        />
        <TextAreaField
          label="Dị ứng"
          name="allergiesCsv"
          defaultValue={joinCsvList(initialValues.allergies)}
          hint="Nhập danh sách cần tránh."
        />
        <TextAreaField label="Món không thích" name="dislikedFoodsCsv" defaultValue={joinCsvList(initialValues.dislikedFoods)} />
        <TextAreaField label="Ẩm thực yêu thích" name="cuisinePreferencesCsv" defaultValue={joinCsvList(initialValues.cuisinePreferences)} />
      </div>

      <ChoiceGroup label="Thiết bị tập luyện sẵn có">
        {equipmentOptions.map((option) => (
          <CheckboxPill
            key={option}
            name="availableWorkoutEquipment"
            value={option}
            label={option.replaceAll("_", " ")}
            defaultChecked={initialValues.availableWorkoutEquipment.includes(option)}
          />
        ))}
      </ChoiceGroup>

      <ChoiceGroup label="Ngày tập ưu tiên">
        {weekdayOptions.map((option) => (
          <CheckboxPill
            key={option}
            name="preferredWorkoutDays"
            value={option}
            label={option}
            defaultChecked={initialValues.preferredWorkoutDays.includes(option)}
          />
        ))}
      </ChoiceGroup>

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
  defaultValue?: string | number;
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
        defaultValue={defaultValue}
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

type TextAreaFieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
};

function TextAreaField({ label, name, defaultValue, hint }: TextAreaFieldProps) {
  return (
    <label className="space-y-2 md:col-span-1">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{label}</span>
      <textarea
        className="min-h-28 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 dark:border-white/10 dark:bg-white/8 dark:text-white"
        defaultValue={defaultValue}
        name={name}
      />
      {hint ? <p className="text-xs text-neutral-500">{hint}</p> : null}
    </label>
  );
}

type ChoiceGroupProps = {
  label: string;
  children: ReactNode;
};

function ChoiceGroup({ label, children }: ChoiceGroupProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

type CheckboxPillProps = {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
};

function CheckboxPill({ name, value, label, defaultChecked }: CheckboxPillProps) {
  return (
    <label className="cursor-pointer">
      <input
        className="peer sr-only"
        defaultChecked={defaultChecked}
        name={name}
        type="checkbox"
        value={value}
      />
      <span className="inline-flex items-center rounded-full border border-black/10 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-checked:text-white dark:border-white/10 dark:bg-white/8 dark:text-neutral-200 dark:peer-checked:border-white dark:peer-checked:bg-white dark:peer-checked:text-neutral-950">
        {label}
      </span>
    </label>
  );
}
