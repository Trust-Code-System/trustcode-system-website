"use client";
import { budgetOptions } from "@/lib/budgets";
import { Select } from "./select";
export function BudgetPicker({
  value,
  onChange,
  invalid = false,
}: {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  const options =
    value && !budgetOptions.includes(value)
      ? [...budgetOptions, value]
      : budgetOptions;
  return (
    <div>
      <Select
        id="budget"
        name="budget"
        options={options.map((item) => ({ value: item, label: item }))}
        defaultValue={value}
        onValueChange={onChange}
        placeholder="Not sure yet"
        aria-invalid={invalid}
        aria-describedby="budget-help"
      />
      <p
        id="budget-help"
        className="mt-2 text-[0.78rem] leading-relaxed text-slate"
      >
        Your available budget, not a quote. For ongoing work, tell us your
        monthly budget in the details.
      </p>
    </div>
  );
}
