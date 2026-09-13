import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { MatchTable } from "@/components/dashboard/match-table";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/sboim/dates";
import { matchesForSbom, useAnnotatedMatches } from "@/lib/sboim/use-kev";
import { useSboimStore } from "@/lib/store";

export const Route = createFileRoute("/inventory/$id")({ component: SbomDetailPage });

function SbomDetailPage() {
  const { id } = Route.useParams();
  const sbom = useSboimStore((s) => s.sboms.find((x) => x.id === id));
  const matches = useAnnotatedMatches();

  if (!sbom) {
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">SBOM not found.</p>
        <Button variant="link" asChild>
          <Link to="/inventory">Back to inventory</Link>
        </Button>
      </AppShell>
    );
  }

  const hits = matchesForSbom(sbom, matches);
  const rec = sbom.record;
  const signed = rec.signatureEnvelope;

  function download() {
    const blob = new Blob([rec.raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rec.sbom.subjectName}.cdx.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <Button variant="ghost" size="sm" asChild className="-ml-2 mb-2">
            <Link to="/inventory">
              <ArrowLeft className="size-4" />
              Inventory
            </Link>
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-medium tracking-tight">{rec.sbom.subjectName}</h1>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                {rec.sbom.serialNumber}
              </p>
            </div>
            <Button variant="secondary" onClick={download}>
              <Download className="size-4" />
              Download CycloneDX
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>{sbom.source}</Badge>
            {sbom.ecosystem ? <Badge variant="outline">{sbom.ecosystem}</Badge> : null}
            {signed ? <Badge variant="ok">ed25519 signed</Badge> : <Badge>unsigned</Badge>}
            <Badge variant={hits.some((h) => h.confidence === "high") ? "high" : "ok"}>
              {hits.length} KEV hits
            </Badge>
          </div>
        </div>

        <section className="grid gap-3 sm:grid-cols-3">
          <Meta label="Components" value={String(rec.sbom.components.length)} />
          <Meta label="Created" value={formatDate(rec.sbom.createdAt)} />
          <Meta label="Tool" value={`${rec.sbom.toolName} ${rec.sbom.toolVersion}`} />
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Integrity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <Row k="SHA-256" v={rec.sha256} mono />
            {signed ? (
              <>
                <Row k="Key id" v={signed.keyId} />
                <Row k="Algorithm" v={signed.algorithm} />
                <Row k="Signed at" v={signed.signedAt} />
                <Row k="Payload type" v={signed.payloadType} />
              </>
            ) : (
              <p className="text-muted-foreground">
                No DSSE envelope on this record. The CLI signs with local Ed25519 keys (
                <span className="font-mono">cra-sbom --sign</span>).
              </p>
            )}
            {sbom.warnings.map((w) => (
              <p key={w} className="text-low">
                {w}
              </p>
            ))}
          </CardContent>
        </Card>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">KEV matches for this SBOM</h2>
          <MatchTable matches={hits} showSbom={false} />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Components</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-secondary/60 text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Version</th>
                  <th className="px-4 py-3 font-medium">Ecosystem</th>
                  <th className="px-4 py-3 font-medium">Scope</th>
                  <th className="px-4 py-3 font-medium">PURL</th>
                </tr>
              </thead>
              <tbody>
                {rec.sbom.components.map((c, i) => (
                  <tr key={`${c.purl ?? c.name}-${i}`} className="border-b border-border last:border-0">
                    <td className="px-4 py-2.5">
                      {c.name}
                      {c.vendor ? (
                        <span className="block text-[11px] text-muted-foreground">{c.vendor}</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs">{c.version ?? "—"}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{c.ecosystem ?? "—"}</td>
                    <td className="px-4 py-2.5">{c.isDirect ? "direct" : "transitive"}</td>
                    <td className="max-w-xs truncate px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
                      {c.purl ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-sm">{value}</p>
    </Card>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
      <p className="text-muted-foreground">{k}</p>
      <p className={mono ? "break-all font-mono text-xs" : "break-all"}>{v}</p>
    </div>
  );
}
