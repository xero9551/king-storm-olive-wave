import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as string, i as object } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as createSsrRpc } from "./router-BwySQpKL.mjs";
import { g as useSboimStore, n as Badge, p as useAnnotatedMatches, r as Button, t as AppShell } from "./app-shell-Djr2oat5.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CajsSxeX.mjs";
import { n as Label, t as Input } from "./label-CCE6uFil.mjs";
import { t as Switch } from "./switch-C50p1rC7.mjs";
import { t as Textarea } from "./textarea-Dd4-MC44.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alerts-xPpEWexU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function buildAlertText(matches, subjectName) {
	if (matches.length === 0) return `${subjectName}: no KEV matches found.`;
	const high = matches.filter((m) => m.confidence === "high");
	const low = matches.filter((m) => m.confidence === "low");
	const lines = [`*CRA Guard — KEV cross-check: ${subjectName}*`];
	if (high.length > 0) {
		lines.push("", `:red_circle: *${high.length} high-confidence match(es)* — exact package match, review now`);
		for (const m of high.slice(0, 10)) lines.push(`• \`${m.component.name}${m.component.version ? "@" + m.component.version : ""}\` — ${m.kevEntry.cveId}: ${m.kevEntry.vulnerabilityName}`);
		if (high.length > 10) lines.push(`• …and ${high.length - 10} more`);
	}
	if (low.length > 0) {
		lines.push("", `:large_orange_circle: *${low.length} low-confidence lead(s)* — name match only, verify before acting`);
		for (const m of low.slice(0, 10)) lines.push(`• \`${m.component.name}${m.component.version ? "@" + m.component.version : ""}\` — ${m.kevEntry.cveId}: ${m.kevEntry.vulnerabilityName}`);
		if (low.length > 10) lines.push(`• …and ${low.length - 10} more`);
	}
	return lines.join("\n");
}
function webhookHost(url) {
	try {
		return new URL(url).host;
	} catch {
		return;
	}
}
var inputSchema = object({
	url: string().url(),
	text: string().min(1).max(12e3)
});
var sendWebhook = createServerFn({ method: "POST" }).validator((data) => inputSchema.parse(data)).handler(createSsrRpc("768a2195be0112a6ae56f9633c77dcf914456d1bb9f8e138d1409a813e64132b"));
function AlertsPage() {
	const matches = useAnnotatedMatches();
	const webhookUrl = useSboimStore((s) => s.webhookUrl);
	const setWebhookUrl = useSboimStore((s) => s.setWebhookUrl);
	const failOnHigh = useSboimStore((s) => s.failOnHigh);
	const setFailOnHigh = useSboimStore((s) => s.setFailOnHigh);
	const alerts = useSboimStore((s) => s.alerts);
	const logAlert = useSboimStore((s) => s.logAlert);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const preview = (0, import_react.useMemo)(() => buildAlertText(matches, "all-inventory"), [matches]);
	const high = matches.filter((m) => m.confidence === "high").length;
	const low = matches.length - high;
	async function send(kind) {
		if (kind === "preview") {
			logAlert({
				at: (/* @__PURE__ */ new Date()).toISOString(),
				subjectName: "all-inventory",
				high,
				low,
				status: "preview",
				text: preview
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
			await sendWebhook({ data: {
				url: webhookUrl.trim(),
				text: preview
			} });
			logAlert({
				at: (/* @__PURE__ */ new Date()).toISOString(),
				subjectName: "all-inventory",
				high,
				low,
				webhookHost: webhookHost(webhookUrl),
				status: "sent",
				text: preview
			});
			toast.success("Webhook delivered");
		} catch (err) {
			logAlert({
				at: (/* @__PURE__ */ new Date()).toISOString(),
				subjectName: "all-inventory",
				high,
				low,
				webhookHost: webhookHost(webhookUrl),
				status: "failed",
				text: preview,
				error: err.message
			});
			toast.error(err.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
					children: "Alerting"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-medium tracking-tight",
					children: "Webhooks & CI gate"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: [
						"One Slack-compatible message per run, high and low separated — the same batching as",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: "src/alerting/webhook.ts"
						}),
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Delivery" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "hook",
							children: "Slack-compatible webhook URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "hook",
							className: "mt-1.5",
							type: "url",
							placeholder: "https://hooks.slack.com/services/…",
							value: webhookUrl,
							onChange: (e) => setWebhookUrl(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm",
								children: "Fail CI on high confidence"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: ["Mirrors ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: "--fail-on-high"
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: failOnHigh,
								onCheckedChange: setFailOnHigh
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => send("sent"),
								disabled: busy,
								children: busy ? "Sending…" : "Send now"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => send("preview"),
								children: "Log preview"
							})]
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Message body" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					readOnly: true,
					value: preview,
					className: "min-h-56"
				}) })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Recent deliveries"
				}), alerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Nothing sent yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: alerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-1 rounded-lg border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [
								a.subjectName,
								" · ",
								a.high,
								" high / ",
								a.low,
								" low"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								new Date(a.at).toLocaleString(),
								" ",
								a.webhookHost ? `· ${a.webhookHost}` : "",
								a.error ? ` · ${a.error}` : ""
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: a.status === "sent" ? "ok" : a.status === "failed" ? "high" : "outline",
							children: a.status
						})]
					}, a.id))
				})]
			})
		]
	}) });
}
//#endregion
export { AlertsPage as component };
