import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { formatDate, isRansomware, relativeDue } from "@/lib/sboim/dates";
import { useKev } from "@/lib/sboim/use-kev";

export const Route = createFileRoute("/kev")({ component: KevPage });

const PAGE = 40;

function KevPage() {
  const { data, isPending, refetch, isFetching } = useKev();
  const [q, setQ] = useState("");
  const [ransomwareOnly, setRansomwareOnly] = useState(false);
  const [page, setPage] = useState(0);

  const entries = data?.snapshot.entries ?? [];
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return entries.filter((e) => {
      if (ransomwareOnly && !isRansomware(e.knownRansomwareUse)) return false;
      if (!query) return true;
      return [e.cveId, e.product, e.vendorProject, e.vulnerabilityName, e.shortDescription]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [entries, q, ransomwareOnly]);

  const slice = filtered.slice(page * PAGE, page * PAGE + PAGE);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Threat intel
            </p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight">CISA KEV catalog</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Polled from the public CISA feed, with GitHub mirror and a bundled snapshot as
              fallback — the poller never silently reports an empty catalog.
            </p>
          </div>
          <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? "Refreshing…" : "Refresh feed"}
          </Button>
        </header>

        <div className="flex flex-wrap gap-2">
          <Badge variant={data?.source === "live" ? "ok" : "low"}>{data?.source ?? "loading"}</Badge>
          {data?.snapshot.catalogVersion ? (
            <Badge variant="outline">v{data.snapshot.catalogVersion}</Badge>
          ) : null}
          <Badge variant="outline">{data?.snapshot.count ?? 0} entries</Badge>
          {data?.snapshot.dateReleased ? (
            <Badge variant="outline">released {formatDate(data.snapshot.dateReleased)}</Badge>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-end">
          <div className="flex-1">
            <Label htmlFor="kev-q">Search catalog</Label>
            <Input
              id="kev-q"
              className="mt-1.5"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(0);
              }}
              placeholder="CVE-2026, FortiOS, ransomware…"
            />
          </div>
          <label className="flex h-10 items-center gap-2 text-sm">
            <Switch
              checked={ransomwareOnly}
              onCheckedChange={(v) => {
                setRansomwareOnly(v);
                setPage(0);
              }}
            />
            Known ransomware use
          </label>
        </div>

        {isPending ? (
          <Skeleton className="h-96 w-full" />
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="border-b border-border bg-secondary/60 text-[11px] uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">CVE</th>
                    <th className="px-4 py-3 font-medium">Vendor / product</th>
                    <th className="px-4 py-3 font-medium">Added</th>
                    <th className="px-4 py-3 font-medium">Due</th>
                    <th className="px-4 py-3 font-medium">Ransomware</th>
                  </tr>
                </thead>
                <tbody>
                  {slice.map((e) => (
                    <tr key={e.cveId + e.product} className="border-b border-border last:border-0 align-top">
                      <td className="px-4 py-3">
                        <a
                          href={`https://nvd.nist.gov/vuln/detail/${e.cveId}`}
                          className="font-mono text-xs text-signal hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {e.cveId}
                        </a>
                        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                          {e.vulnerabilityName}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p>{e.vendorProject}</p>
                        <p className="text-xs text-muted-foreground">{e.product}</p>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs tabular-nums">
                        {formatDate(e.dateAdded)}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs tabular-nums">
                        {relativeDue(e.dueDate)}
                      </td>
                      <td className="px-4 py-3">
                        {isRansomware(e.knownRansomwareUse) ? (
                          <Badge variant="high">known</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">unknown</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>
                {filtered.length} shown · page {page + 1} / {pages}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page + 1 >= pages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
