export const currencies = [
  { value: "NGN", label: "₦ NGN" },
  { value: "USD", label: "$ USD" },
  { value: "GBP", label: "£ GBP" },
] as const;
export type BudgetCurrency = (typeof currencies)[number]["value"];
export const budgetBands = {
  NGN: [
    "Under ₦500,000",
    "₦500,000–₦1,500,000",
    "₦1,500,000–₦5,000,000",
    "₦5,000,000+",
  ],
  USD: ["Under $1,000", "$1,000–$3,000", "$3,000–$10,000", "$10,000+"],
  GBP: ["Under £1,000", "£1,000–£3,000", "£3,000–£10,000", "£10,000+"],
} as const;
export const budgetOptions = [
  "Under ₦500k",
  "₦500k–₦1.5m",
  "₦1.5m–₦5m",
  "₦5m+",
  "Not sure yet",
  "Prefer not to say",
];
export function normalizeBudget(value?: string) {
  if (!value) return "";
  // Preserve unquantified historic answers without inventing an amount.
  const legacy = [
    "Exploring / not set yet",
    "Modest",
    "Mid-range",
    "Significant",
  ];
  if (legacy.includes(value)) return "Not sure yet";
  if (value === "Retainer / ongoing") return value;
  const previous = {
    "Under ₦500,000": "Under ₦500k",
    "₦500,000–₦1,500,000": "₦500k–₦1.5m",
    "₦1,500,000–₦5,000,000": "₦1.5m–₦5m",
    "₦5,000,000+": "₦5m+",
  } as Record<string, string>;
  if (previous[value]) return previous[value];
  if (
    [...budgetBands.USD, ...budgetBands.GBP].some((option) => option === value)
  )
    return value;
  return budgetOptions.find((option) => option === value) ?? "";
}
export function currencyForBudget(value: string): BudgetCurrency {
  return value.includes("$") ? "USD" : value.includes("£") ? "GBP" : "NGN";
}
