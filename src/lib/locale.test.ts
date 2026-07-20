import { describe, test, expect } from "vitest";
import {
  getLocaleConfig,
  getRegionPhrase,
  resolveText,
  RELOCATION_REGIONS,
} from "./locale";

describe("RELOCATION_REGIONS", () => {
  test("contains exactly 6 regions in correct order", () => {
    expect(RELOCATION_REGIONS).toEqual([
      "UK",
      "Ireland",
      "Europe",
      "UAE",
      "Saudi Arabia",
      "Singapore",
    ]);
  });
});

describe("getLocaleConfig", () => {
  test("GB → GBP, UK region, cricket known", () => {
    const c = getLocaleConfig("GB");
    expect(c.currency.code).toBe("GBP");
    expect(c.highlightedRegion).toBe("UK");
    expect(c.cricketContext).toBe("known");
  });

  test("IE → EUR, Ireland region, cricket known", () => {
    const c = getLocaleConfig("IE");
    expect(c.currency.code).toBe("EUR");
    expect(c.highlightedRegion).toBe("Ireland");
    expect(c.cricketContext).toBe("known");
  });

  test("DE → EUR, Europe region, cricket needs-qualifier", () => {
    const c = getLocaleConfig("DE");
    expect(c.currency.code).toBe("EUR");
    expect(c.highlightedRegion).toBe("Europe");
    expect(c.cricketContext).toBe("needs-qualifier");
  });

  test("AE → AED, UAE region, cricket known (expat population)", () => {
    const c = getLocaleConfig("AE");
    expect(c.currency.code).toBe("AED");
    expect(c.highlightedRegion).toBe("UAE");
    expect(c.cricketContext).toBe("known");
  });

  test("SA → SAR, Saudi Arabia region, cricket known (expat population)", () => {
    const c = getLocaleConfig("SA");
    expect(c.currency.code).toBe("SAR");
    expect(c.highlightedRegion).toBe("Saudi Arabia");
    expect(c.cricketContext).toBe("known");
  });

  test("SG → SGD, Singapore region, cricket needs-qualifier", () => {
    const c = getLocaleConfig("SG");
    expect(c.currency.code).toBe("SGD");
    expect(c.highlightedRegion).toBe("Singapore");
    expect(c.cricketContext).toBe("needs-qualifier");
  });

  test("IN → INR, no highlighted region, cricket known", () => {
    const c = getLocaleConfig("IN");
    expect(c.currency.code).toBe("INR");
    expect(c.highlightedRegion).toBeNull();
    expect(c.cricketContext).toBe("known");
  });

  test("non-Eurozone EU — SE → USD fallback, Europe region", () => {
    const c = getLocaleConfig("SE");
    expect(c.currency.code).toBe("USD");
    expect(c.highlightedRegion).toBe("Europe");
  });

  test("non-Eurozone EU — NO → USD fallback, Europe region", () => {
    const c = getLocaleConfig("NO");
    expect(c.currency.code).toBe("USD");
    expect(c.highlightedRegion).toBe("Europe");
  });

  test("non-Eurozone EU — DK → USD fallback, Europe region", () => {
    const c = getLocaleConfig("DK");
    expect(c.currency.code).toBe("USD");
    expect(c.highlightedRegion).toBe("Europe");
  });

  test("unknown country XX → USD, no region, needs-qualifier", () => {
    const c = getLocaleConfig("XX");
    expect(c.currency.code).toBe("USD");
    expect(c.highlightedRegion).toBeNull();
    expect(c.cricketContext).toBe("needs-qualifier");
  });

  test("undefined → USD, no region", () => {
    const c = getLocaleConfig(undefined);
    expect(c.currency.code).toBe("USD");
    expect(c.highlightedRegion).toBeNull();
  });

  test("null → USD, no region", () => {
    const c = getLocaleConfig(null);
    expect(c.currency.code).toBe("USD");
    expect(c.highlightedRegion).toBeNull();
  });

  test("empty string → USD, no region", () => {
    const c = getLocaleConfig("");
    expect(c.currency.code).toBe("USD");
    expect(c.highlightedRegion).toBeNull();
  });

  test("lowercase country code is normalised", () => {
    const c = getLocaleConfig("gb");
    expect(c.currency.code).toBe("GBP");
    expect(c.highlightedRegion).toBe("UK");
  });

  test("regions always equals RELOCATION_REGIONS", () => {
    const c = getLocaleConfig("GB");
    expect(c.regions).toBe(RELOCATION_REGIONS);
  });

  test("country field is uppercased", () => {
    const c = getLocaleConfig("gb");
    expect(c.country).toBe("GB");
  });

  test("US → USD, no highlighted region, cricket needs-qualifier", () => {
    const c = getLocaleConfig("US");
    expect(c.currency.code).toBe("USD");
    expect(c.highlightedRegion).toBeNull();
    expect(c.cricketContext).toBe("needs-qualifier");
  });

  test("CA → USD, no highlighted region", () => {
    const c = getLocaleConfig("CA");
    expect(c.currency.code).toBe("USD");
    expect(c.highlightedRegion).toBeNull();
  });
});

describe("resolveText (gh-223)", () => {
  test("picks localeText entry for visitor currency over base text", () => {
    const block = {
      text: "costs {regionPhrase}.",
      localeText: { GBP: "costs ~£5 {regionPhrase}." },
    };
    expect(resolveText(block, getLocaleConfig("GB"))).toBe(
      "costs ~£5 in the UK.",
    );
  });

  test("falls back to block.text when localeText has no entry for the currency", () => {
    const block = {
      text: "costs {regionPhrase}.",
      localeText: { GBP: "costs ~£5 {regionPhrase}." },
    };
    expect(resolveText(block, getLocaleConfig("DE"))).toBe("costs in Europe.");
  });

  test("works when localeText is absent entirely", () => {
    const block = { text: "open to roles {regionPhrase}." };
    expect(resolveText(block, getLocaleConfig("SG"))).toBe(
      "open to roles in Singapore.",
    );
  });

  test("substitutes all {regionPhrase} tokens when multiple appear in one paragraph", () => {
    const block = {
      text: "{regionPhrase} is my focus — hire me {regionPhrase}.",
    };
    expect(resolveText(block, getLocaleConfig("AE"))).toBe(
      "in the UAE is my focus — hire me in the UAE.",
    );
  });

  test("no highlighted region → 'internationally'", () => {
    const block = { text: "available {regionPhrase}." };
    expect(resolveText(block, getLocaleConfig("US"))).toBe(
      "available internationally.",
    );
  });
});

describe("getRegionPhrase", () => {
  test('UK → "in the UK" (article required)', () => {
    const phrase = getRegionPhrase(getLocaleConfig("GB"));
    expect(phrase).toBe("in the UK");
  });

  test('UAE → "in the UAE" (article required)', () => {
    const phrase = getRegionPhrase(getLocaleConfig("AE"));
    expect(phrase).toBe("in the UAE");
  });

  test('Ireland → "in Ireland" (no article)', () => {
    const phrase = getRegionPhrase(getLocaleConfig("IE"));
    expect(phrase).toBe("in Ireland");
  });

  test('Singapore → "in Singapore"', () => {
    const phrase = getRegionPhrase(getLocaleConfig("SG"));
    expect(phrase).toBe("in Singapore");
  });

  test('no region → "internationally"', () => {
    const phrase = getRegionPhrase(getLocaleConfig("XX"));
    expect(phrase).toBe("internationally");
  });
});
