import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn } from "./router-BwySQpKL.mjs";
import { a as formatDate, c as isRansomware, d as relativeDue, i as daysUntil, n as Badge, r as Button } from "./app-shell-Djr2oat5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/match-table-8vxNwI9h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 25;
function MatchTable({ matches, showSbom = true }) {
	const [page, setPage] = (0, import_react.useState)(0);
	const pages = Math.max(1, Math.ceil(matches.length / PAGE));
	const safePage = Math.min(page, pages - 1);
	const slice = matches.slice(safePage * PAGE, safePage * PAGE + PAGE);
	if (matches.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground",
		children: "No KEV matches in the current inventory."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-border bg-secondary/60 text-[11px] uppercase tracking-wide text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Confidence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "CVE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Component"
						}),
						showSbom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "SBOM"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Due"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((m) => {
					const due = daysUntil(m.kevEntry.dueDate);
					const overdue = due !== null && due < 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: m.confidence === "high" ? "high" : "low",
										children: m.confidence
									}), isRansomware(m.kevEntry.knownRansomwareUse) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "high",
										children: "ransomware"
									}) : null]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `https://nvd.nist.gov/vuln/detail/${m.kevEntry.cveId}`,
									target: "_blank",
									rel: "noreferrer",
									className: "font-mono text-xs text-signal hover:underline",
									children: m.kevEntry.cveId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 max-w-xs truncate text-xs text-muted-foreground",
									children: m.kevEntry.vulnerabilityName
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-medium",
									children: [m.component.name, m.component.version ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-xs text-muted-foreground",
										children: ["@", m.component.version]
									}) : null]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: m.matchedOn === "purl_ecosystem_name" ? "purl + product" : "vendor / name"
								})]
							}),
							showSbom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/inventory/$id",
									params: { id: m.sbomId },
									className: "text-sm hover:underline",
									children: m.subjectName
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.kevEntry.vendorProject }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs",
									children: m.kevEntry.product
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("font-mono text-xs tabular-nums", overdue ? "text-high" : due !== null && due <= 7 ? "text-low" : "text-muted-foreground"),
									children: relativeDue(m.kevEntry.dueDate)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: formatDate(m.kevEntry.dueDate)
								})]
							})
						]
					}, `${m.sbomId}-${m.kevEntry.cveId}-${m.component.name}-${m.component.version}-${m.matchedOn}`);
				}) })]
			})
		}), matches.length > PAGE ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				matches.length,
				" matches · page ",
				safePage + 1,
				" / ",
				pages
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					disabled: safePage === 0,
					onClick: () => setPage((p) => Math.max(0, p - 1)),
					children: "Previous"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					disabled: safePage + 1 >= pages,
					onClick: () => setPage((p) => p + 1),
					children: "Next"
				})]
			})]
		}) : null]
	});
}
//#endregion
export { MatchTable as t };
