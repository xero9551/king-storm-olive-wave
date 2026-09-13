import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { daysUntil, formatDate, relativeDue, isRansomware } from "@/lib/sboim/dates";
import type { AnnotatedMatch } from "@/lib/sboim/use-kev";
import { cn } from "@/lib/utils";

const PAGE = 25;

export function MatchTable({
  matches,
  showSbom = true,
}: {
  matches: AnnotatedMatch[];
  showSbom?: boolean;
}) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(matches.length / PAGE));
  const safePage = Math.min(page, pages - 1);
  const slice = matches.slice(safePage * PAGE, safePage * PAGE + PAGE);

  if (matches.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
        No KEV matches in the current inventory.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-secondary/60 text-[11px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Confidence</th>
              <th className="px-4 py-3 font-medium">CVE</th>
              <th className="px-4 py-3 font-medium">Component</th>
              {showSbom ? <th className="px-4 py-3 font-medium">SBOM</th> : null}
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Due</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((m) => {
              const due = daysUntil(m.kevEntry.dueDate);
              const overdue = due !== null && due < 0;
              return (
                <tr
                  key={`${m.sbomId}-${m.kevEntry.cveId}-${m.component.name}-${m.component.version}-${m.matchedOn}`}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant={m.confidence === "high" ? "high" : "low"}>{m.confidence}</Badge>
                      {isRansomware(m.kevEntry.knownRansomwareUse) ? (
                        <Badge variant="high">ransomware</Badge>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://nvd.nist.gov/vuln/detail/${m.kevEntry.cveId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-signal hover:underline"
                    >
                      {m.kevEntry.cveId}
                    </a>
                    <p className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">
                      {m.kevEntry.vulnerabilityName}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">
                      {m.component.name}
                      {m.component.version ? (
                        <span className="font-mono text-xs text-muted-foreground">
                          @{m.component.version}
                        </span>
                      ) : null}
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {m.matchedOn === "purl_ecosystem_name" ? "purl + product" : "vendor / name"}
                    </p>
                  </td>
                  {showSbom ? (
                    <td className="px-4 py-3">
                      <Link
                        to="/inventory/$id"
                        params={{ id: m.sbomId }}
                        className="text-sm hover:underline"
                      >
                        {m.subjectName}
                      </Link>
                    </td>
                  ) : null}
                  <td className="px-4 py-3 text-muted-foreground">
                    <p>{m.kevEntry.vendorProject}</p>
                    <p className="text-xs">{m.kevEntry.product}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p
                      className={cn(
                        "font-mono text-xs tabular-nums",
                        overdue
                          ? "text-high"
                          : due !== null && due <= 7
                            ? "text-low"
                            : "text-muted-foreground",
                      )}
                    >
                      {relativeDue(m.kevEntry.dueDate)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{formatDate(m.kevEntry.dueDate)}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {matches.length > PAGE ? (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <p>
            {matches.length} matches · page {safePage + 1} / {pages}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={safePage + 1 >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
