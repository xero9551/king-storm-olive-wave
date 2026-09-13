import { createFileRoute, Link } from "@tanstack/react-router";
import { FileJson, Trash2 } from "lucide-react";
import { IngestDialog } from "@/components/dashboard/ingest-dialog";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/sboim/dates";
import { shortHash } from "@/lib/sboim/hash";
import { matchesForSbom, useAnnotatedMatches } from "@/lib/sboim/use-kev";
import { useSboimStore } from "@/lib/store";

export const Route = createFileRoute("/inventory")({ component: InventoryPage });

function InventoryPage() {
  const sboms = useSboimStore((s) => s.sboms);
  const remove = useSboimStore((s) => s.removeSbom);
  const resetDemo = useSboimStore((s) => s.resetDemo);
  const matches = useAnnotatedMatches();

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Inventory
            </p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight">SBOMs</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              CycloneDX 1.5 documents generated, uploaded, or signed by cra-guard-sbom-gen.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => resetDemo()}>
              Restore demo
            </Button>
            <IngestDialog />
          </div>
        </header>

        {sboms.length === 0 ? (
          <Card className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <FileJson className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No SBOMs yet. Ingest a lockfile to start.</p>
            <IngestDialog label="Ingest first SBOM" />
          </Card>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {sboms.map((s) => {
              const hits = matchesForSbom(s, matches);
              const high = hits.filter((h) => h.confidence === "high").length;
              return (
                <li key={s.id}>
                  <Card className="flex h-full flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          to="/inventory/$id"
                          params={{ id: s.id }}
                          className="text-lg font-medium tracking-tight hover:underline"
                        >
                          {s.record.sbom.subjectName}
                        </Link>
                        <p className="font-mono text-xs text-muted-foreground">
                          {s.record.sbom.subjectVersion ?? "unversioned"} ·{" "}
                          {s.record.sbom.components.length} components
                        </p>
                      </div>
                      <Badge variant={s.source === "demo" ? "signal" : "outline"}>{s.source}</Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.ecosystem ? <Badge>{s.ecosystem}</Badge> : null}
                      {s.record.signatureEnvelope ? <Badge variant="ok">signed</Badge> : <Badge>unsigned</Badge>}
                      {high > 0 ? <Badge variant="high">{high} high</Badge> : <Badge variant="ok">clean</Badge>}
                    </div>
                    <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                      sha256 {shortHash(s.record.sha256, 16)}… · ingested {formatDate(s.ingestedAt)}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" asChild>
                        <Link to="/inventory/$id" params={{ id: s.id }}>
                          Open
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => remove(s.id)}>
                        <Trash2 className="size-4" />
                        Remove
                      </Button>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
