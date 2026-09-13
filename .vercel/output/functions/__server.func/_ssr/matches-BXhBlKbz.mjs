import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Check, m as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { o as cn } from "./router-BwySQpKL.mjs";
import { c as isRansomware, h as useKev, p as useAnnotatedMatches, t as AppShell } from "./app-shell-Djr2oat5.mjs";
import { n as Label, t as Input } from "./label-CCE6uFil.mjs";
import { t as Switch } from "./switch-C50p1rC7.mjs";
import { t as MatchTable } from "./match-table-8vxNwI9h.mjs";
import { t as Skeleton } from "./skeleton-6PeH9Gzw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matches-BXhBlKbz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted-foreground" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-72 min-w-32 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md", className),
	position,
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
		className: "p-1",
		children
	})
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex size-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
function MatchesPage() {
	const { isPending } = useKev();
	const matches = useAnnotatedMatches();
	const [q, setQ] = (0, import_react.useState)("");
	const [confidence, setConfidence] = (0, import_react.useState)("all");
	const [ransomwareOnly, setRansomwareOnly] = (0, import_react.useState)(false);
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return matches.filter((m) => {
			if (confidence !== "all" && m.confidence !== confidence) return false;
			if (ransomwareOnly && !isRansomware(m.kevEntry.knownRansomwareUse)) return false;
			if (!query) return true;
			return [
				m.kevEntry.cveId,
				m.kevEntry.product,
				m.kevEntry.vendorProject,
				m.kevEntry.vulnerabilityName,
				m.component.name,
				m.subjectName
			].join(" ").toLowerCase().includes(query);
		});
	}, [
		matches,
		q,
		confidence,
		ransomwareOnly
	]);
	const high = matches.filter((m) => m.confidence === "high").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
					children: "Correlation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-medium tracking-tight",
					children: "Cross-check"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: [
						"Same matcher as ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: "src/correlation/matcher.ts"
						}),
						". High requires a PURL and an exact product-name match. Low is vendor/name only — do not start a regulatory clock on it."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterCard, {
						label: "All matches",
						value: matches.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterCard, {
						label: "High",
						value: high
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterCard, {
						label: "Low",
						value: matches.length - high
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "q",
							children: "Search"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "q",
							className: "mt-1.5",
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "CVE, product, SBOM…"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full md:w-44",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Confidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: confidence,
							onValueChange: setConfidence,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "mt-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "high",
									children: "High"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "low",
									children: "Low"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-10 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: ransomwareOnly,
							onCheckedChange: setRansomwareOnly
						}), "Ransomware known"]
					})
				]
			}),
			isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchTable, { matches: filtered })
		]
	}) });
}
function FilterCard({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-mono text-2xl tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { MatchesPage as component };
