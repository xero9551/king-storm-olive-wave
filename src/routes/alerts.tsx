import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { buildAlertText, webhookHost } from "@/lib/sboim/alert-text";
import { sendWebhook } from "@/lib/sboim/send-webhook";
import { useAnnotatedMatches } from "@/lib/sboim/use-kev";
import { useSboimStore } from "@/lib/store";

export const Route = createFileRoute("/alerts")({ component: AlertsPage });

function AlertsPage() {
  const matches = useAnnotatedMatches();
  const webhookUrl = useSboimStore((s) => s.webhookUrl);
  const setWebhookUrl = useSboimStore((s) => s.setWebhookUrl);
  const failOnHigh = useSboimStore((s) => s.failOnHigh);
  const setFailOnHigh = useSboimStore((s) => s.setFailOnHigh);
  const alerts = useSboimStore((s) => s.alerts);
  const logAlert = useSboimStore((s) => s.logAlert);
  const [busy, setBusy] = useState(false);

  const preview = useMemo(
    () => buildAlertText(matches, "all-inventory"),
    [matches],
  );

  const high = matches.filter((m) => m.confidence === "high").length;
  const low = matches.length - high;

  async function send(kind: "sent" | "preview") {
    if (kind === "preview") {
      logAlert({
        at: new Date().toISOString(),
        subjectName: "all-inventory",
        high,
        low,
        status: "preview",
        text: preview,
      });
      toast.success("Alert captured locally");
      return;
    }
    if (!webhookUrl.trim()) {
      toast.error("Set a Slack-compatible webhook URL first");
      return;
    }
    setBusy(true);
    try {
      await sendWebhook({ data: { url: webhookUrl.trim(), text: preview } });
      logAlert({
        at: new Date().toISOString(),
        subjectName: "all-inventory",
        high,
        low,
        webhookHost: webhookHost(webhookUrl),
        status: "sent",
        text: preview,
      });
      toast.success("Webhook delivered");
    } catch (err) {
      logAlert({
        at: new Date().toISOString(),
        subjectName: "all-inventory",
        high,
        low,
        webhookHost: webhookHost(webhookUrl),
        status: "failed",
        text: preview,
        error: (err as Error).message,
      });
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <header>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Alerting</p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight">Webhooks & CI gate</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            One Slack-compatible message per run, high and low separated — the same batching as{" "}
            <span className="font-mono">src/alerting/webhook.ts</span>.
          </p>
        </header>

        <div className="grid gap-3 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Delivery</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <Label htmlFor="hook">Slack-compatible webhook URL</Label>
                <Input
                  id="hook"
                  className="mt-1.5"
                  type="url"
                  placeholder="https://hooks.slack.com/services/…"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
              </div>
              <label className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-3">
                <span>
                  <span className="block text-sm">Fail CI on high confidence</span>
                  <span className="text-xs text-muted-foreground">
                    Mirrors <span className="font-mono">--fail-on-high</span>
                  </span>
                </span>
                <Switch checked={failOnHigh} onCheckedChange={setFailOnHigh} />
              </label>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => send("sent")} disabled={busy}>
                  {busy ? "Sending…" : "Send now"}
                </Button>
                <Button variant="secondary" onClick={() => send("preview")}>
                  Log preview
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message body</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea readOnly value={preview} className="min-h-56" />
            </CardContent>
          </Card>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Recent deliveries</h2>
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing sent yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {alerts.map((a) => (
                <li
                  key={a.id}
                  className="flex flex-col gap-1 rounded-lg border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm">
                      {a.subjectName} · {a.high} high / {a.low} low
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(a.at).toLocaleString()} {a.webhookHost ? `· ${a.webhookHost}` : ""}
                      {a.error ? ` · ${a.error}` : ""}
                    </p>
                  </div>
                  <Badge
                    variant={a.status === "sent" ? "ok" : a.status === "failed" ? "high" : "outline"}
                  >
                    {a.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
