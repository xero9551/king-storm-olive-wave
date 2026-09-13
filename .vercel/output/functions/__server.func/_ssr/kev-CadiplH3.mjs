import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as formatDate, c as isRansomware, d as relativeDue, h as useKev, n as Badge, r as Button, t as AppShell } from "./app-shell-Djr2oat5.mjs";
import { n as Label, t as Input } from "./label-CCE6uFil.mjs";
import { t as Switch } from "./switch-C50p1rC7.mjs";
import { t as Skeleton } from "./skeleton-6PeH9Gzw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kev-CadiplH3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 40;
function KevPage() {
	const { data, isPending, refetch, isFetching } = useKev();
	const [q, setQ] = (0, import_react.useState)("");
	const [ransomwareOnly, setRansomwareOnly] = (0, import_react.useState)(false);
	const [page, setPage] = (0, import_react.useState)(0);
	const entries = data?.snapshot.entries ?? [];
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return entries.filter((e) => {
			if (ransomwareOnly && !isRansomware(e.knownRansomwareUse)) return false;
			if (!query) return true;
			return [
				e.cveId,
				e.product,
				e.vendorProject,
				e.vulnerabilityName,
				e.shortDescription
			].join(" ").toLowerCase().includes(query);
		});
	}, [
		entries,
		q,
		ransomwareOnly
	]);
	const slice = filtered.slice(page * PAGE, page * PAGE + PAGE);
	const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
						children: "Threat intel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-medium tracking-tight",
						children: "CISA KEV catalog"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted-foreground",
						children: "Polled from the public CISA feed, with GitHub mirror and a bundled snapshot as fallback — the poller never silently reports an empty catalog."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => refetch(),
					disabled: isFetching,
					children: isFetching ? "Refreshing…" : "Refresh feed"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: data?.source === "live" ? "ok" : "low",
						children: data?.source ?? "loading"
					}),
					data?.snapshot.catalogVersion ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						children: ["v", data.snapshot.catalogVersion]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						children: [data?.snapshot.count ?? 0, " entries"]
					}),
					data?.snapshot.dateReleased ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						children: ["released ", formatDate(data.snapshot.dateReleased)]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "kev-q",
						children: "Search catalog"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "kev-q",
						className: "mt-1.5",
						value: q,
						onChange: (e) => {
							setQ(e.target.value);
							setPage(0);
						},
						placeholder: "CVE-2026, FortiOS, ransomware…"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-10 items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: ransomwareOnly,
						onCheckedChange: (v) => {
							setRansomwareOnly(v);
							setPage(0);
						}
					}), "Known ransomware use"]
				})]
			}),
			isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96 w-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[800px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border bg-secondary/60 text-[11px] uppercase tracking-wide text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "CVE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Vendor / product"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Added"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Due"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Ransomware"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border last:border-0 align-top",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `https://nvd.nist.gov/vuln/detail/${e.cveId}`,
									className: "font-mono text-xs text-signal hover:underline",
									target: "_blank",
									rel: "noreferrer",
									children: e.cveId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 max-w-sm text-xs text-muted-foreground",
									children: e.vulnerabilityName
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: e.vendorProject }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: e.product
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-xs tabular-nums",
								children: formatDate(e.dateAdded)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-xs tabular-nums",
								children: relativeDue(e.dueDate)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: isRansomware(e.knownRansomwareUse) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "high",
									children: "known"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "unknown"
								})
							})
						]
					}, e.cveId + e.product)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					filtered.length,
					" shown · page ",
					page + 1,
					" / ",
					pages
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						disabled: page === 0,
						onClick: () => setPage((p) => Math.max(0, p - 1)),
						children: "Previous"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						disabled: page + 1 >= pages,
						onClick: () => setPage((p) => p + 1),
						children: "Next"
					})]
				})]
			})] })
		]
	}) });
}
//#endregion
export { KevPage as component };
