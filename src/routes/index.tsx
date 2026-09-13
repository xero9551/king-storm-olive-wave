import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Boxes, Clock, ShieldAlert, Siren } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IngestDialog } from "@/components/dashboard/ingest-dialog";
import { MatchTable } from "@/components/dashboard/match-table";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats, useKev } from "@/lib/sboim/use-kev";
import { useSboimStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { isPending } = useKev();
  const stats = useDashboardStats();
  const failOnHigh = useSboimStore((s) => s.failOnHigh);

  const bySbom = stats.sboms.map((s) => {
    const hits = stats.matches.filter((m) => m.sbomId === s.id);
    return {
      name: s.record.sbom.subjectName,
      high: hits.filter((h) => h.confidence === "high").length,
      low: hits.filter((h) => h.confidence === "low").length,
    };
  });

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Operations
            </p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight md:text-4xl">
              Known exploited, in your bill of materials.
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Live CISA KEV cross-check against SBOMs generated the same way as{" "}
              <span className="font-mono">cra-kev</span> — high confidence is a PURL-backed
              product match; low is a name lead, not a clock start.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" asChild>
              <Link to="/matches">Open matches</Link>
            </Button>
            <IngestDialog />
          </div>
        </header>

        {stats.fetchError && stats.source !== "live" ? (
          <div className="rounded-lg border border-low/40 bg-low/10 px-4 py-3 text-sm text-low">
            Live feed unavailable ({stats.fetchError}). Showing {stats.source} catalog.
          </div>
        ) : null}

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi
            label="KEV catalog"
            value={isPending ? null : stats.catalogCount}
            hint={stats.catalogVersion ? `released ${stats.dateReleased?.slice(0, 10) ?? "—"}` : "polling"}
            icon={ShieldAlert}
          />
          <Kpi
            label="High confidence"
            value={isPending ? null : stats.high}
            hint={failOnHigh ? "would fail CI (--fail-on-high)" : "CI gate off"}
            icon={AlertTriangle}
            tone={stats.high > 0 ? "high" : "ok"}
          />
          <Kpi
            label="Due in 7 days"
            value={isPending ? null : stats.dueSoon}
            hint={`${stats.overdue} already overdue`}
            icon={Clock}
            tone={stats.dueSoon > 0 || stats.overdue > 0 ? "low" : undefined}
          />
          <Kpi
            label="Ransomware-tagged"
            value={isPending ? null : stats.ransomware}
            hint={`${stats.sbomCount} SBOMs · ${stats.components} components`}
            icon={Siren}
            tone={stats.ransomware > 0 ? "high" : undefined}
          />
        </section>

        <section className="grid gap-3 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Matches by SBOM</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              {bySbom.length === 0 ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bySbom} barGap={4}>
                    <CartesianGrid stroke="var(--color-border)" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={28}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="high" fill="var(--color-high)" radius={[4, 4, 0, 0]} name="High" />
                    <Bar dataKey="low" fill="var(--color-low)" radius={[4, 4, 0, 0]} name="Low" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>CI gate</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-mono">cra-kev --fail-on-high</span> exits non-zero when any
                PURL-backed product match is found.
              </p>
              <div className="rounded-lg border border-border bg-secondary/40 p-4">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  This run
                </p>
                <p className="mt-1 font-mono text-2xl tabular-nums">
                  {stats.high > 0 && failOnHigh ? "fail" : "pass"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stats.high} high · {stats.low} low · {stats.uniqueCves} unique CVEs
                </p>
              </div>
              <Button variant="secondary" asChild>
                <Link to="/alerts">Configure webhook</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium">Priority queue</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/matches">View all</Link>
            </Button>
          </div>
          {isPending ? (
            <Skeleton className="h-48 w-full" />
          ) : (
            <MatchTable matches={stats.matches.slice(0, 8)} />
          )}
        </section>

        <section className="flex items-center gap-2 text-xs text-muted-foreground">
          <Boxes className="size-3.5" />
          Seeded with three Northstar inventory SBOMs so the matcher has something real to chew on.
          Ingest your own lockfile to replace them.
        </section>
      </div>
    </AppShell>
  );
}

function Kpi({
  label,
  value,
  hint,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number | null;
  hint: string;
  icon: typeof ShieldAlert;
  tone?: "high" | "low" | "ok";
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      {value === null ? (
        <Skeleton className="mt-3 h-8 w-16" />
      ) : (
        <p
          className={
            tone === "high"
              ? "mt-3 font-mono text-3xl tabular-nums text-high"
              : tone === "low"
                ? "mt-3 font-mono text-3xl tabular-nums text-low"
                : tone === "ok"
                  ? "mt-3 font-mono text-3xl tabular-nums text-ok"
                  : "mt-3 font-mono text-3xl tabular-nums"
          }
        >
          {value}
        </p>
      )}
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </Card>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
      Ingest an SBOM to plot matches.
    </div>
  );
}
