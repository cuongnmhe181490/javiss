"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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
const activityOptions = [
  "sedentary",
  "lightly_active",
  "moderately_active",
  "very_active",
  "athlete",
] as const;
const sexOptions = [
  "female",
  "male",
  "intersex",
  "nonbinary",
  "prefer_not_to_say",
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

export function OnboardingForm({
  initialValues,
  onSubmit,
  className,
  submitLabel = "Hoan tat thiet lap",
}: OnboardingFormProps) {
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
            availableWorkoutEquipment: Array.from(
              formData.getAll("availableWorkoutEquipment"),
              (value) => String(value),
            ),
            preferredWorkoutDays: Array.from(formData.getAll("preferredWorkoutDays"), (value) =>
              String(value),
            ),
            location: normalizeTextValue(formData.get("location")),
          },
          pantryItems: splitCsvList(normalizeTextValue(formData.get("starterPantryCsv"))).map(
            (item) => ({
              name: item,
              normalizedName: item.toLowerCase(),
              quantity: 1,
              unit: "item",
              category: "other",
              source: "manual",
              isEstimated: false,
            }),
          ),
        };

        const parsed = onboardingDraftSchema.safeParse(nextValue);
        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? "Vui long kiem tra lai cac truong onboarding.");
          setIsPending(false);
          return;
        }

        try {
          await onSubmit(parsed.data);
        } catch (submissionError) {
          setError(submissionError instanceof Error ? submissionError.message : "Khong the hoan tat thiet lap.");
        } finally {
          setIsPending(false);
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">
            Onboarding
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950">Thiet lap tuan dau tien</h2>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Dang luu..." : submitLabel}
        </Button>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-neutral-700">Che do thiet lap</span>
        <select
          className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
          defaultValue={initialValues.setupMode}
          name="setupMode"
        >
          <option value="guided">Co huong dan</option>
          <option value="manual">Thu cong</option>
          <option value="imported">Nhap tu du lieu san co</option>
        </select>
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Ten hien thi" name="displayName" defaultValue={initialValues.profile.displayName} />
        <Field label="Tuoi" name="age" type="number" defaultValue={initialValues.profile.age} />
        <SelectField
          label="Gioi tinh"
          name="sex"
          options={sexOptions}
          defaultValue={initialValues.profile.sex ?? "prefer_not_to_say"}
        />
        <SelectField label="Muc tieu" name="goal" options={goalOptions} defaultValue={initialValues.profile.goal} />
        <SelectField
          label="Muc do van dong"
          name="activityLevel"
          options={activityOptions}
          defaultValue={initialValues.profile.activityLevel}
        />
        <Field label="Chieu cao (cm)" name="heightCm" type="number" defaultValue={initialValues.profile.heightCm ?? ""} />
        <Field label="Can nang (kg)" name="weightKg" type="number" defaultValue={initialValues.profile.weightKg ?? ""} />
        <Field
          label="Can nang muc tieu (kg)"
          name="targetWeightKg"
          type="number"
          defaultValue={initialValues.profile.targetWeightKg ?? ""}
        />
        <Field
          label="So bua moi ngay"
          name="mealsPerDay"
          type="number"
          defaultValue={initialValues.profile.mealsPerDay}
        />
        <Field
          label="Thoi gian nau toi da"
          name="maxCookingTimeMin"
          type="number"
          defaultValue={initialValues.profile.maxCookingTimeMin}
        />
        <Field
          label="Muc ngan sach"
          name="budgetAmount"
          type="number"
          defaultValue={initialValues.profile.budgetAmount ?? ""}
        />
        <SelectField
          label="Chu ky ngan sach"
          name="budgetPeriod"
          options={budgetPeriodOptions}
          defaultValue={initialValues.profile.budgetPeriod ?? "weekly"}
        />
        <Field label="Dia diem" name="location" defaultValue={initialValues.profile.location ?? ""} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextAreaField
          label="Nhan an uong"
          name="dietaryTagsCsv"
          defaultValue={joinCsvList(initialValues.profile.dietaryTags)}
        />
        <TextAreaField
          label="Di ung"
          name="allergiesCsv"
          defaultValue={joinCsvList(initialValues.profile.allergies)}
        />
        <TextAreaField
          label="Mon khong thich"
          name="dislikedFoodsCsv"
          defaultValue={joinCsvList(initialValues.profile.dislikedFoods)}
        />
        <TextAreaField
          label="Am thuc yeu thich"
          name="cuisinePreferencesCsv"
          defaultValue={joinCsvList(initialValues.profile.cuisinePreferences)}
        />
        <TextAreaField
          label="Pantry khoi dau"
          name="starterPantryCsv"
          defaultValue={initialValues.pantryItems.map((item) => item.name).join(", ")}
          hint="Them mon cach nhau boi dau phay de dien san vao pantry."
        />
      </div>

      <ChoiceGroup label="Thiet bi tap luyen">
        {equipmentOptions.map((option) => (
          <CheckboxPill
            key={option}
            name="availableWorkoutEquipment"
            value={option}
            label={option.replaceAll("_", " ")}
            defaultChecked={initialValues.profile.availableWorkoutEquipment.includes(option)}
          />
        ))}
      </ChoiceGroup>

      <ChoiceGroup label="Ngay tap uu tien">
        {weekdayOptions.map((option) => (
          <CheckboxPill
            key={option}
            name="preferredWorkoutDays"
            value={option}
            label={option}
            defaultChecked={initialValues.profile.preferredWorkoutDays.includes(option)}
          />
        ))}
      </ChoiceGroup>

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
  defaultValue?: string | number;
  type?: string;
};

function Field({ label, name, defaultValue, type = "text" }: FieldProps) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <input
        className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
        defaultValue={defaultValue}
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

type TextAreaFieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
};

function TextAreaField({ label, name, defaultValue, hint }: TextAreaFieldProps) {
  return (
    <label className="space-y-2 md:col-span-1">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <textarea
        className="min-h-28 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
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
      <legend className="text-sm font-medium text-neutral-700">{label}</legend>
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
      <span className="inline-flex items-center rounded-full border border-black/10 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 transition peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-checked:text-white">
        {label}
      </span>
    </label>
  );
}
