"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { joinCsvList, splitCsvList } from "@/lib/validation/shared";
import { profileInputSchema } from "@/lib/validation/profile";
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

export function ProfileForm({
  initialValues,
  onSubmit,
  className,
  submitLabel = "Save profile",
}: ProfileFormProps) {
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

        const parsed = profileInputSchema.safeParse(nextValue);
        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? "Please review the profile fields.");
          setIsPending(false);
          return;
        }

        try {
          await onSubmit(parsed.data);
        } catch (submissionError) {
          setError(submissionError instanceof Error ? submissionError.message : "Unable to save profile.");
        } finally {
          setIsPending(false);
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">
            Profile
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950">Personalized settings</h2>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Display name" name="displayName" defaultValue={initialValues.displayName} />
        <Field label="Age" name="age" type="number" defaultValue={initialValues.age} />
        <SelectField label="Sex" name="sex" options={sexOptions} defaultValue={initialValues.sex ?? "prefer_not_to_say"} />
        <Field label="Height cm" name="heightCm" type="number" defaultValue={initialValues.heightCm ?? ""} />
        <Field label="Weight kg" name="weightKg" type="number" defaultValue={initialValues.weightKg ?? ""} />
        <Field
          label="Target weight kg"
          name="targetWeightKg"
          type="number"
          defaultValue={initialValues.targetWeightKg ?? ""}
        />
        <SelectField label="Goal" name="goal" options={goalOptions} defaultValue={initialValues.goal} />
        <SelectField
          label="Activity level"
          name="activityLevel"
          options={activityOptions}
          defaultValue={initialValues.activityLevel}
        />
        <Field
          label="Meals per day"
          name="mealsPerDay"
          type="number"
          defaultValue={initialValues.mealsPerDay}
        />
        <Field
          label="Max cooking time"
          name="maxCookingTimeMin"
          type="number"
          defaultValue={initialValues.maxCookingTimeMin}
        />
        <Field
          label="Budget amount"
          name="budgetAmount"
          type="number"
          defaultValue={initialValues.budgetAmount ?? ""}
        />
        <SelectField
          label="Budget period"
          name="budgetPeriod"
          options={budgetPeriodOptions}
          defaultValue={initialValues.budgetPeriod ?? "weekly"}
        />
        <Field label="Location" name="location" defaultValue={initialValues.location ?? ""} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextAreaField
          label="Dietary tags"
          name="dietaryTagsCsv"
          defaultValue={joinCsvList(initialValues.dietaryTags)}
          hint="Comma-separated tags such as high_protein, low_cost, quick."
        />
        <TextAreaField
          label="Allergies"
          name="allergiesCsv"
          defaultValue={joinCsvList(initialValues.allergies)}
          hint="Comma-separated list of allergens to avoid."
        />
        <TextAreaField
          label="Disliked foods"
          name="dislikedFoodsCsv"
          defaultValue={joinCsvList(initialValues.dislikedFoods)}
        />
        <TextAreaField
          label="Cuisine preferences"
          name="cuisinePreferencesCsv"
          defaultValue={joinCsvList(initialValues.cuisinePreferences)}
        />
      </div>

      <ChoiceGroup label="Available workout equipment">
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

      <ChoiceGroup label="Preferred workout days">
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
