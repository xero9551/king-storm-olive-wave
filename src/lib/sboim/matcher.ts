import type { CrossCheckMatch, KevEntry, MatchConfidence, NormalizedComponent } from "./types";

/**
 * Confidence tiers matter downstream:
 *
 * - "high": the component's PURL-backed identity AND exact product-name match.
 * - "low": only a loose vendor/product name match — a lead, not a confirmed hit.
 *
 * CISA KEV entries carry a CVE plus free-text vendor/product names, not a
 * machine-precise CPE/version range. Ported from SBOIM src/correlation/matcher.ts.
 */
export function crossCheck(
  components: NormalizedComponent[],
  kevEntries: KevEntry[],
): CrossCheckMatch[] {
  const matches: CrossCheckMatch[] = [];

  for (const component of components) {
    for (const entry of kevEntries) {
      const match = evaluateMatch(component, entry);
      if (match) matches.push(match);
    }
  }

  return matches;
}

function evaluateMatch(component: NormalizedComponent, entry: KevEntry): CrossCheckMatch | null {
  const componentName = component.name.toLowerCase();
  const productName = entry.product.toLowerCase();
  const vendorName = entry.vendorProject.toLowerCase();

  const nameMatchesProduct = componentName === productName;
  const nameMatchesVendor = component.vendor?.toLowerCase() === vendorName;

  if (!nameMatchesProduct && !nameMatchesVendor) return null;

  const confidence: MatchConfidence = component.purl && nameMatchesProduct ? "high" : "low";

  return {
    component,
    kevEntry: entry,
    confidence,
    matchedOn: component.purl && nameMatchesProduct ? "purl_ecosystem_name" : "vendor_product_name",
  };
}

export function matchKey(match: CrossCheckMatch): string {
  return [
    match.kevEntry.cveId,
    match.component.purl ?? match.component.name,
    match.component.version ?? "",
  ].join("|");
}
