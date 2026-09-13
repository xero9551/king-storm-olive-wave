import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as Trash2, u as FileJson } from "../_libs/lucide-react.mjs";
import { a as formatDate, f as shortHash, g as useSboimStore, l as matchesForSbom, n as Badge, p as useAnnotatedMatches, r as Button, t as AppShell } from "./app-shell-Djr2oat5.mjs";
import { t as Card } from "./card-CajsSxeX.mjs";
import { t as IngestDialog } from "./ingest-dialog-BcX3erCo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-3GHHBrL-.js
var import_jsx_runtime = require_jsx_runtime();
function InventoryPage() {
	const sboms = useSboimStore((s) => s.sboms);
	const remove = useSboimStore((s) => s.removeSbom);
	const resetDemo = useSboimStore((s) => s.resetDemo);
	const matches = useAnnotatedMatches();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
					children: "Inventory"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-medium tracking-tight",
					children: "SBOMs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted-foreground",
					children: "CycloneDX 1.5 documents generated, uploaded, or signed by cra-guard-sbom-gen."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => resetDemo(),
					children: "Restore demo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IngestDialog, {})]
			})]
		}), sboms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex flex-col items-center gap-3 px-6 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, { className: "size-8 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No SBOMs yet. Ingest a lockfile to start."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IngestDialog, { label: "Ingest first SBOM" })
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 md:grid-cols-2",
			children: sboms.map((s) => {
				const high = matchesForSbom(s, matches).filter((h) => h.confidence === "high").length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex h-full flex-col p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/inventory/$id",
								params: { id: s.id },
								className: "text-lg font-medium tracking-tight hover:underline",
								children: s.record.sbom.subjectName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-muted-foreground",
								children: [
									s.record.sbom.subjectVersion ?? "unversioned",
									" ·",
									" ",
									s.record.sbom.components.length,
									" components"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: s.source === "demo" ? "signal" : "outline",
								children: s.source
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								s.ecosystem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: s.ecosystem }) : null,
								s.record.signatureEnvelope ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "ok",
									children: "signed"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "unsigned" }),
								high > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "high",
									children: [high, " high"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "ok",
									children: "clean"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 font-mono text-[11px] text-muted-foreground",
							children: [
								"sha256 ",
								shortHash(s.record.sha256, 16),
								"… · ingested ",
								formatDate(s.ingestedAt)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/inventory/$id",
									params: { id: s.id },
									children: "Open"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => remove(s.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Remove"]
							})]
						})
					]
				}) }, s.id);
			})
		})]
	}) });
}
//#endregion
export { InventoryPage as component };
