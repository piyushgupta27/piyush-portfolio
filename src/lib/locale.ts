export type CurrencyCode =
  | "GBP"
  | "EUR"
  | "SGD"
  | "AED"
  | "SAR"
  | "USD"
  | "INR";

export type LocaleConfig = {
  country: string;
  currency: { code: CurrencyCode };
  regions: readonly string[];
  highlightedRegion: string | null;
  cricketContext: "known" | "needs-qualifier";
};

export const RELOCATION_REGIONS = [
  "UK",
  "Ireland",
  "Europe",
  "UAE",
  "Saudi Arabia",
  "Singapore",
] as const;
export type RelocationRegion = (typeof RELOCATION_REGIONS)[number];

const COUNTRY_TO_REGION: Record<string, RelocationRegion> = {
  GB: "UK",
  IE: "Ireland",
  DE: "Europe",
  FR: "Europe",
  NL: "Europe",
  SE: "Europe",
  NO: "Europe",
  DK: "Europe",
  FI: "Europe",
  BE: "Europe",
  CH: "Europe",
  AT: "Europe",
  ES: "Europe",
  IT: "Europe",
  PT: "Europe",
  PL: "Europe",
  CZ: "Europe",
  HU: "Europe",
  RO: "Europe",
  GR: "Europe",
  HR: "Europe",
  SK: "Europe",
  AE: "UAE",
  SA: "Saudi Arabia",
  SG: "Singapore",
};

const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  GB: "GBP",
  IE: "EUR",
  DE: "EUR",
  FR: "EUR",
  NL: "EUR",
  FI: "EUR",
  BE: "EUR",
  AT: "EUR",
  ES: "EUR",
  IT: "EUR",
  PT: "EUR",
  GR: "EUR",
  SK: "EUR",
  // Non-Eurozone EU (SE, NO, DK, CH, PL, CZ, HU, RO, HR) → USD default
  AE: "AED",
  SA: "SAR",
  SG: "SGD",
  IN: "INR",
  US: "USD",
  CA: "USD",
};

// AE + SA included: large South Asian expat population, cricket is well-known
const CRICKET_KNOWN = new Set([
  "IN",
  "GB",
  "AU",
  "PK",
  "SL",
  "BD",
  "NZ",
  "ZA",
  "WI",
  "IE",
  "NL",
  "KE",
  "UG",
  "TZ",
  "AE",
  "SA",
]);

export function getLocaleConfig(country?: string | null): LocaleConfig {
  const c = country?.toUpperCase() ?? "";
  const code = COUNTRY_TO_CURRENCY[c] ?? "USD";
  const highlightedRegion = COUNTRY_TO_REGION[c] ?? null;
  const cricketContext: LocaleConfig["cricketContext"] = CRICKET_KNOWN.has(c)
    ? "known"
    : "needs-qualifier";
  return {
    country: c,
    currency: { code },
    regions: RELOCATION_REGIONS,
    highlightedRegion,
    cricketContext,
  };
}

const NEEDS_ARTICLE = new Set(["UK", "UAE"]);
export function getRegionPhrase(locale: LocaleConfig): string {
  if (!locale.highlightedRegion) return "internationally";
  const article = NEEDS_ARTICLE.has(locale.highlightedRegion) ? "the " : "";
  return `in ${article}${locale.highlightedRegion}`;
}

export function resolveText(
  block: { text: string; localeText?: Partial<Record<string, string>> },
  locale: LocaleConfig,
): string {
  const base = block.localeText?.[locale.currency.code] ?? block.text;
  return base.replaceAll("{regionPhrase}", getRegionPhrase(locale));
}
