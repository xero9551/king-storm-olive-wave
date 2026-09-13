import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { pollKev } from "./poll-kev";
import { useKevSeed } from "./kev-seed";
import { crossCheck } from "./matcher";
import { daysUntil, isRansomware } from "./dates";
import { useSboimStore } from "../store";
import type { CrossCheckMatch, StoredSbom } from "./types";

export type AnnotatedMatch = CrossCheckMatch & {
  sbomId: string;
  subjectName: string;
};

export function useKev() {
  const seed = useKevSeed();
  return useQuery({
    queryKey: ["kev-catalog"],
    queryFn: () => pollKev(),
    initialData: seed,
    staleTime: 15 * 60 * 1000,
    retry: 1,
  });
}

export function useAnnotatedMatches(): AnnotatedMatch[] {
  const sboms = useSboimStore((s) => s.sboms);
  const { data } = useKev();
  const entries = data?.snapshot.entries;

  return useMemo(() => {
    if (!entries) return [];
    const out: AnnotatedMatch[] = [];
    for (const s of sboms) {
      const matches = crossCheck(s.record.sbom.components, entries);
      for (const m of matches) {
        out.push({
          ...m,
          sbomId: s.id,
          subjectName: s.record.sbom.subjectName,
        });
      }
    }
    return out.sort((a, b) => {
      if (a.confidence !== b.confidence) return a.confidence === "high" ? -1 : 1;
      return (b.kevEntry.dateAdded ?? "").localeCompare(a.kevEntry.dateAdded ?? "");
    });
  }, [sboms, entries]);
}

export function useDashboardStats() {
  const sboms = useSboimStore((s) => s.sboms);
  const matches = useAnnotatedMatches();
  const { data } = useKev();

  return useMemo(() => {
    const components = sboms.reduce((n, s) => n + s.record.sbom.components.length, 0);
    const high = matches.filter((m) => m.confidence === "high");
    const low = matches.filter((m) => m.confidence === "low");
    const ransomware = matches.filter((m) => isRansomware(m.kevEntry.knownRansomwareUse));
    const overdue = matches.filter((m) => {
      const d = daysUntil(m.kevEntry.dueDate);
      return d !== null && d < 0;
    });
    const dueSoon = matches.filter((m) => {
      const d = daysUntil(m.kevEntry.dueDate);
      return d !== null && d >= 0 && d <= 7;
    });
    const uniqueCves = new Set(matches.map((m) => m.kevEntry.cveId));
    return {
      sbomCount: sboms.length,
      components,
      catalogCount: data?.snapshot.count ?? 0,
      catalogVersion: data?.snapshot.catalogVersion,
      dateReleased: data?.snapshot.dateReleased,
      fetchedAt: data?.snapshot.fetchedAt,
      source: data?.source,
      fetchError: data?.error,
      high: high.length,
      low: low.length,
      ransomware: ransomware.length,
      overdue: overdue.length,
      dueSoon: dueSoon.length,
      uniqueCves: uniqueCves.size,
      matches,
      sboms,
    };
  }, [sboms, matches, data]);
}

export function matchesForSbom(sbom: StoredSbom, matches: AnnotatedMatch[]): AnnotatedMatch[] {
  return matches.filter((m) => m.sbomId === sbom.id);
}
