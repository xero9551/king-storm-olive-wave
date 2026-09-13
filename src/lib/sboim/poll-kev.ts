import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fallbackSnapshot } from "./fallback-kev";
import type { KevEntry, KevSnapshot, KevSource } from "./types";

const CISA_URL =
  "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";
const GITHUB_URL =
  "https://raw.githubusercontent.com/cisagov/kev-data/develop/known_exploited_vulnerabilities.json";

const kevEntrySchema = z.object({
  cveID: z.string(),
  vendorProject: z.string().default(""),
  product: z.string().default(""),
  vulnerabilityName: z.string().default(""),
  dateAdded: z.string(),
  shortDescription: z.string().default(""),
  requiredAction: z.string().optional(),
  dueDate: z.string().optional(),
  knownRansomwareCampaignUse: z.string().optional(),
  notes: z.string().optional(),
});

const kevFeedSchema = z.object({
  catalogVersion: z.string().optional(),
  dateReleased: z.string().optional(),
  count: z.number().optional(),
  vulnerabilities: z.array(kevEntrySchema),
});

export interface PollKevResult {
  snapshot: KevSnapshot;
  source: KevSource;
  error?: string;
}

let cache: { result: PollKevResult; at: number } | null = null;
const TTL_MS = 15 * 60 * 1000;

function toEntry(raw: z.infer<typeof kevEntrySchema>): KevEntry {
  return {
    cveId: raw.cveID,
    vendorProject: raw.vendorProject,
    product: raw.product,
    vulnerabilityName: raw.vulnerabilityName,
    dateAdded: raw.dateAdded,
    shortDescription: raw.shortDescription,
    requiredAction: raw.requiredAction,
    dueDate: raw.dueDate,
    knownRansomwareUse: raw.knownRansomwareCampaignUse,
    notes: raw.notes,
  };
}

async function fetchFeed(url: string): Promise<KevSnapshot> {
  const res = await fetch(url, {
    headers: { "User-Agent": "sboim-dashboard/0.1 (+https://github.com/Purplelotusec/SBOIM)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const json: unknown = await res.json();
  const parsed = kevFeedSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error(`KEV feed schema mismatch: ${parsed.error.issues[0]?.message}`);
  }
  return {
    catalogVersion: parsed.data.catalogVersion,
    dateReleased: parsed.data.dateReleased,
    count: parsed.data.vulnerabilities.length,
    entries: parsed.data.vulnerabilities.map(toEntry),
    fetchedAt: new Date().toISOString(),
  };
}

export const pollKev = createServerFn({ method: "GET" }).handler(async (): Promise<PollKevResult> => {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.result;

  const errors: string[] = [];

  try {
    const snapshot = await fetchFeed(CISA_URL);
    const result: PollKevResult = { snapshot, source: "live" };
    cache = { result, at: Date.now() };
    return result;
  } catch (err) {
    errors.push(`CISA: ${(err as Error).message}`);
  }

  try {
    const snapshot = await fetchFeed(GITHUB_URL);
    const result: PollKevResult = {
      snapshot,
      source: "github",
      error: errors[0],
    };
    cache = { result, at: Date.now() };
    return result;
  } catch (err) {
    errors.push(`GitHub: ${(err as Error).message}`);
  }

  const result: PollKevResult = {
    snapshot: fallbackSnapshot(),
    source: "fallback",
    error: errors.join(" · "),
  };
  cache = { result, at: Date.now() };
  return result;
});
