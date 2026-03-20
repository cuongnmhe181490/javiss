"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  activityLevelLabels,
  budgetPeriodLabels,
  equipmentLabels,
  goalLabels,
  sexLabels,
  weekdayLabels,
} from "@/lib/display";
import { onboardingDraftSchema } from "@/lib/validation/onboarding";
import { joinCsvList, splitCsvList } from "@/lib/validation/shared";
import { cn } from "@/lib/utils";
import type { OnboardingDraft } from "@/types/onboarding";

type OnboardingFormProps = {
  initialValues: OnboardingDraft;
  onSubmit: (values: OnboardingDraft) => Promise<void> | void;
  className?: string;
  submitLabel?: string;
};

const goalOptions = ["fat_loss", "muscle_gain", "maintenance", "general_health"] as const;
const activityOptions = ["sedentary", "lightly_active", "moderately_active", "very_active", "athlete"] as const;
const sexOptions = ["female", "male", "intersex", "nonbinary", "prefer_not_to_say"] as const;
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
const weekdayOptions = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

function normalizeTextValue(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length > 0 ? text : undefined;
}

function toNumberValue(value: FormDataEntryValue | null) {
  const text = normalizeTextValue(value);
  if (!text) return undefined;
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function mapIssuesToErrors(issues: { path: PropertyKey[]; message: string }[]) {
  return Object.fromEntries(issues.map((issue) => [issue.path.join("."), issue.message]));
}

function buildOnboardingPayload(formData: FormData) {
  return {
    setupMode: normalizeTextValue(formData.get("setupMode")),
    profile: {
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
      availableWorkoutEquipment: Array.from(formData.getAll("availableWorkoutEquipment"), (value) => String(value)),
      preferredWorkoutDays: Array.from(formData.getAll("preferredWorkoutDays"), (value) => String(value)),
      location: normalizeTextValue(formData.get("location")),
    },
    pantryItems: splitCsvList(normalizeTextValue(formData.get("starterPantryCsv"))).map((item) => ({
      name: item,
      normalizedName: item.toLowerCase(),
      quantity: 1,
      unit: "item",
      category: "other",
      source: "manual",
      isEstimated: false,
    })),
  };
}

export function OnboardingForm({
  initialValues,
  onSubmit,
  className,
  submitLabel = "Hoàn tất thiết lập",
}: OnboardingFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [budgetPeriodDisplay, setBudgetPeriodDisplay] = useState(initialValues.profile.budgetPeriod);

  const initialPayload = useMemo(() => initialValues, [initialValues]);

  useEffect(() => {
    const parsed = onboardingDraftSchema.safeParse(initialPayload);
    setIsValid(parsed.success);
  }, [initialPayload]);

  function validateForm(formData: FormData) {
    const parsed = onboardingDraftSchema.safeParse(buildOnboardingPayload(formData));

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
        if (success) setSuccess(null);
      }}
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setIsPending(true);

        const parsed = validateForm(new FormData(event.currentTarget));
        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? "Vui lòng kiểm tra lại thông tin thiết lập.");
          setIsPending(false);
          return;
        }

        try {
          await onSubmit(parsed.data);
          setSuccess("Đã lưu thiết lập.");
        } catch (submissionError) {
          setError(submissionError instanceof Error ? submissionError.message : "Không thể hoàn tất thiết lập.");
        } finally {
          setIsPending(false);
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">Onboarding</p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950 dark:text-white">Thiết lập tuần đầu tiên</h2>
        </div>
        <Button type="submit" disabled={isPending || !isValid}>
          {isPending ? "Đang lưu..." : submitLabel}
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <GuideCard title="1. Hồ sơ" description="Điền mục tiêu, chiều cao, cân nặng." />
        <GuideCard title="2. Bữa ăn" description="Chọn số bữa, thời gian nấu, ngân sách." />
        <GuideCard title="3. Tập luyện" description="Chọn thiết bị có sẵn và ngày tập." />
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Chế độ thiết lập</span>
        <SelectShell>
          <select
            className={cn("app-select", fieldErrors.setupMode ? "border-rose-300" : "border-black/10 dark:border-white/10")}
            defaultValue={initialValues.setupMode}
            name="setupMode"
          >
            <option value="guided">Có hướng dẫn</option>
            <option value="manual">Tự nhập nhanh</option>
            <option value="imported">Dùng dữ liệu có sẵn</option>
          </select>
        </SelectShell>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Nếu mới dùng lần đầu, chọn <span className="font-medium text-neutral-700 dark:text-neutral-200">Có hướng dẫn</span>.
        </p>
        {fieldErrors.setupMode ? <p className="text-xs text-rose-600">{fieldErrors.setupMode}</p> : null}
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Tên hiển thị" name="displayName" defaultValue={initialValues.profile.displayName} error={fieldErrors["profile.displayName"]} />
        <Field label="Tuổi" name="age" type="number" defaultValue={initialValues.profile.age} error={fieldErrors["profile.age"]} />
        <SelectField label="Giới tính" name="sex" options={sexOptions} defaultValue={initialValues.profile.sex ?? "prefer_not_to_say"} error={fieldErrors["profile.sex"]} />
        <SelectField label="Mục tiêu" name="goal" options={goalOptions} defaultValue={initialValues.profile.goal} error={fieldErrors["profile.goal"]} />
        <SelectField label="Mức độ vận động" name="activityLevel" options={activityOptions} defaultValue={initialValues.profile.activityLevel} error={fieldErrors["profile.activityLevel"]} />
        <Field label="Chiều cao (cm)" name="heightCm" type="number" defaultValue={initialValues.profile.heightCm ?? ""} error={fieldErrors["profile.heightCm"]} />
        <Field label="Cân nặng (kg)" name="weightKg" type="number" defaultValue={initialValues.profile.weightKg ?? ""} error={fieldErrors["profile.weightKg"]} />
        <Field label="Cân nặng mục tiêu (kg)" name="targetWeightKg" type="number" defaultValue={initialValues.profile.targetWeightKg ?? ""} error={fieldErrors["profile.targetWeightKg"]} />
        <Field label="Số bữa mỗi ngày" name="mealsPerDay" type="number" defaultValue={initialValues.profile.mealsPerDay} error={fieldErrors["profile.mealsPerDay"]} />
        <Field label="Thời gian nấu tối đa (phút)" name="maxCookingTimeMin" type="number" defaultValue={initialValues.profile.maxCookingTimeMin} error={fieldErrors["profile.maxCookingTimeMin"]} />
        <Field label={`Ngân sách ${budgetPeriodDisplay === "daily" ? "ngày" : "tuần"} (VND)`} name="budgetAmount" type="number" defaultValue={initialValues.profile.budgetAmount ?? ""} error={fieldErrors["profile.budgetAmount"]} />
        <SelectField
          label="Chu kỳ ngân sách"
          name="budgetPeriod"
          options={budgetPeriodOptions}
          defaultValue={initialValues.profile.budgetPeriod ?? "weekly"}
          error={fieldErrors["profile.budgetPeriod"]}
          onValueChange={(value) => setBudgetPeriodDisplay(value as typeof budgetPeriodDisplay)}
        />
        <Field label="Địa điểm tập" name="location" defaultValue={initialValues.profile.location ?? ""} error={fieldErrors["profile.location"]} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextAreaField label="Nhãn ăn uống" name="dietaryTagsCsv" defaultValue={joinCsvList(initialValues.profile.dietaryTags)} hint="Ví dụ: giàu đạm, ít dầu mỡ." />
        <TextAreaField label="Dị ứng" name="allergiesCsv" defaultValue={joinCsvList(initialValues.profile.allergies)} hint="Ví dụ: hải sản, đậu phộng." />
        <TextAreaField label="Món không thích" name="dislikedFoodsCsv" defaultValue={joinCsvList(initialValues.profile.dislikedFoods)} />
        <TextAreaField label="Ẩm thực yêu thích" name="cuisinePreferencesCsv" defaultValue={joinCsvList(initialValues.profile.cuisinePreferences)} />
        <TextAreaField
          label="Pantry khởi đầu"
          name="starterPantryCsv"
          defaultValue={initialValues.pantryItems.map((item) => item.name).join(", ")}
          hint="Ví dụ: trứng, gạo, sữa chua."
        />
      </div>

      <ChoiceGroup label="Thiết bị tập luyện">
        {equipmentOptions.map((option) => (
          <CheckboxPill
            key={option}
            name="availableWorkoutEquipment"
            value={option}
            label={equipmentLabels[option]}
            defaultChecked={initialValues.profile.availableWorkoutEquipment.includes(option)}
          />
        ))}
      </ChoiceGroup>

      <ChoiceGroup label="Ngày tập ưu tiên">
        {weekdayOptions.map((option) => (
          <CheckboxPill
            key={option}
            name="preferredWorkoutDays"
            value={option}
            label={weekdayLabels[option]}
            defaultChecked={initialValues.profile.preferredWorkoutDays.includes(option)}
          />
        ))}
      </ChoiceGroup>

      {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      {success ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</p> : null}
    </form>
  );
}

function GuideCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="interactive-card rounded-2xl border border-black/5 bg-white/80 p-4 dark:border-white/10 dark:bg-white/6">
      <p className="text-sm font-semibold text-neutral-900 dark:text-white">{title}</p>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
    </div>
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
      <input className={cn("app-input", error ? "border-rose-300" : "border-black/10 dark:border-white/10")} defaultValue={defaultValue} name={name} type={type} />
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
  onValueChange?: (value: string) => void;
};

function SelectField({ label, name, options, defaultValue, error, onValueChange }: SelectFieldProps) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{label}</span>
      <SelectShell>
        <select
          className={cn("app-select", error ? "border-rose-300" : "border-black/10 dark:border-white/10")}
          defaultValue={defaultValue}
          name={name}
          onChange={(event) => onValueChange?.(event.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {name === "sex"
                ? sexLabels[option as keyof typeof sexLabels]
                : name === "goal"
                  ? goalLabels[option as keyof typeof goalLabels]
                  : name === "activityLevel"
                    ? activityLevelLabels[option as keyof typeof activityLevelLabels]
                    : name === "budgetPeriod"
                      ? budgetPeriodLabels[option as keyof typeof budgetPeriodLabels]
                      : option.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </SelectShell>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </label>
  );
}

function SelectShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-300" />
    </div>
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
      <textarea className="app-textarea" defaultValue={defaultValue} name={name} />
      {hint ? <p className="text-xs text-neutral-500 dark:text-neutral-400">{hint}</p> : null}
    </label>
  );
}

function ChoiceGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function CheckboxPill({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="cursor-pointer">
      <input className="peer sr-only" defaultChecked={defaultChecked} name={name} type="checkbox" value={value} />
      <span className="inline-flex items-center rounded-full border border-black/10 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-checked:text-white dark:border-white/10 dark:bg-white/8 dark:text-neutral-200 dark:peer-checked:border-white dark:peer-checked:bg-white dark:peer-checked:text-neutral-950">
        {label}
      </span>
    </label>
  );
}
