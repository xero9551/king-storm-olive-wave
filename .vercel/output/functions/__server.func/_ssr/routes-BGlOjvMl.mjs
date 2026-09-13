import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Siren, g as Boxes, p as Clock, r as TriangleAlert, s as ShieldAlert } from "../_libs/lucide-react.mjs";
import { g as useSboimStore, h as useKev, m as useDashboardStats, r as Button, t as AppShell } from "./app-shell-Djr2oat5.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CajsSxeX.mjs";
import { t as IngestDialog } from "./ingest-dialog-BcX3erCo.mjs";
import { t as MatchTable } from "./match-table-8vxNwI9h.mjs";
import { t as Skeleton } from "./skeleton-6PeH9Gzw.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BGlOjvMl.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { isPending } = useKev();
	const stats = useDashboardStats();
	const failOnHigh = useSboimStore((s) => s.failOnHigh);
	const bySbom = stats.sboms.map((s) => {
		const hits = stats.matches.filter((m) => m.sbomId === s.id);
		return {
			name: s.record.sbom.subjectName,
			high: hits.filter((h) => h.confidence === "high").length,
			low: hits.filter((h) => h.confidence === "low").length
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
						children: "Operations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-medium tracking-tight md:text-4xl",
						children: "Known exploited, in your bill of materials."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: [
							"Live CISA KEV cross-check against SBOMs generated the same way as",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: "cra-kev"
							}),
							" — high confidence is a PURL-backed product match; low is a name lead, not a clock start."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/matches",
							children: "Open matches"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IngestDialog, {})]
				})]
			}),
			stats.fetchError && stats.source !== "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-low/40 bg-low/10 px-4 py-3 text-sm text-low",
				children: [
					"Live feed unavailable (",
					stats.fetchError,
					"). Showing ",
					stats.source,
					" catalog."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "KEV catalog",
						value: isPending ? null : stats.catalogCount,
						hint: stats.catalogVersion ? `released ${stats.dateReleased?.slice(0, 10) ?? "—"}` : "polling",
						icon: ShieldAlert
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "High confidence",
						value: isPending ? null : stats.high,
						hint: failOnHigh ? "would fail CI (--fail-on-high)" : "CI gate off",
						icon: TriangleAlert,
						tone: stats.high > 0 ? "high" : "ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Due in 7 days",
						value: isPending ? null : stats.dueSoon,
						hint: `${stats.overdue} already overdue`,
						icon: Clock,
						tone: stats.dueSoon > 0 || stats.overdue > 0 ? "low" : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Ransomware-tagged",
						value: isPending ? null : stats.ransomware,
						hint: `${stats.sbomCount} SBOMs · ${stats.components} components`,
						icon: Siren,
						tone: stats.ransomware > 0 ? "high" : void 0
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Matches by SBOM" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "h-64",
						children: bySbom.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyChart, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: bySbom,
								barGap: 4,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fill: "var(--color-muted-foreground)",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										allowDecimals: false,
										tick: {
											fill: "var(--color-muted-foreground)",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false,
										width: 28
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--color-popover)",
										border: "1px solid var(--color-border)",
										borderRadius: 8,
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "high",
										fill: "var(--color-high)",
										radius: [
											4,
											4,
											0,
											0
										],
										name: "High"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "low",
										fill: "var(--color-low)",
										radius: [
											4,
											4,
											0,
											0
										],
										name: "Low"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "CI gate" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: "cra-kev --fail-on-high"
								}), " exits non-zero when any PURL-backed product match is found."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-secondary/40 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] uppercase tracking-wide text-muted-foreground",
										children: "This run"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-2xl tabular-nums",
										children: stats.high > 0 && failOnHigh ? "fail" : "pass"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											stats.high,
											" high · ",
											stats.low,
											" low · ",
											stats.uniqueCves,
											" unique CVEs"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/alerts",
									children: "Configure webhook"
								})
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Priority queue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/matches",
							children: "View all"
						})
					})]
				}), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 w-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchTable, { matches: stats.matches.slice(0, 8) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "size-3.5" }), "Seeded with three Northstar inventory SBOMs so the matcher has something real to chew on. Ingest your own lockfile to replace them."]
			})
		]
	}) });
}
function Kpi({ label, value, hint, icon: Icon, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-wide text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted-foreground" })]
			}),
			value === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-3 h-8 w-16" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: tone === "high" ? "mt-3 font-mono text-3xl tabular-nums text-high" : tone === "low" ? "mt-3 font-mono text-3xl tabular-nums text-low" : tone === "ok" ? "mt-3 font-mono text-3xl tabular-nums text-ok" : "mt-3 font-mono text-3xl tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function EmptyChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full items-center justify-center text-sm text-muted-foreground",
		children: "Ingest an SBOM to plot matches."
	});
}
//#endregion
export { Home as component };
