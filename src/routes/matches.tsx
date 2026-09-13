import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MatchTable } from "@/components/dashboard/match-table";
import { AppShell } from "@/components/layout/app-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { isRansomware } from "@/lib/sboim/dates";
import { useAnnotatedMatches, useKev } from "@/lib/sboim/use-kev";

export const Route = createFileRoute("/matches")({ component: MatchesPage });

function MatchesPage() {
  const { isPending } = useKev();
  const matches = useAnnotatedMatches();
  const [q, setQ] = useState("");
  const [confidence, setConfidence] = useState("all");
  const [ransomwareOnly, setRansomwareOnly] = useState(false);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return matches.filter((m) => {
      if (confidence !== "all" && m.confidence !== confidence) return false;
      if (ransomwareOnly && !isRansomware(m.kevEntry.knownRansomwareUse)) return false;
      if (!query) return true;
      const hay = [
        m.kevEntry.cveId,
        m.kevEntry.product,
        m.kevEntry.vendorProject,
        m.kevEntry.vulnerabilityName,
        m.component.name,
        m.subjectName,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [matches, q, confidence, ransomwareOnly]);

  const high = matches.filter((m) => m.confidence === "high").length;

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <header>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Correlation
          </p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight">Cross-check</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Same matcher as <span className="font-mono">src/correlation/matcher.ts</span>. High
            requires a PURL and an exact product-name match. Low is vendor/name only — do not start
            a regulatory clock on it.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          <FilterCard label="All matches" value={matches.length} />
          <FilterCard label="High" value={high} />
          <FilterCard label="Low" value={matches.length - high} />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-end">
          <div className="flex-1">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              className="mt-1.5"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="CVE, product, SBOM…"
            />
          </div>
          <div className="w-full md:w-44">
            <Label>Confidence</Label>
            <Select value={confidence} onValueChange={setConfidence}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <label className="flex h-10 items-center gap-2 text-sm">
            <Switch checked={ransomwareOnly} onCheckedChange={setRansomwareOnly} />
            Ransomware known
          </label>
        </div>

        {isPending ? <Skeleton className="h-64 w-full" /> : <MatchTable matches={filtered} />}
      </div>
    </AppShell>
  );
}

function FilterCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-2xl tabular-nums">{value}</p>
    </div>
  );
}
