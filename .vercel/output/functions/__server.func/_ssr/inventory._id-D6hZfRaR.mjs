import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Download, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-BwySQpKL.mjs";
import { a as formatDate, g as useSboimStore, l as matchesForSbom, n as Badge, p as useAnnotatedMatches, r as Button, t as AppShell } from "./app-shell-Djr2oat5.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CajsSxeX.mjs";
import { t as MatchTable } from "./match-table-8vxNwI9h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory._id-D6hZfRaR.js
var import_jsx_runtime = require_jsx_runtime();
function SbomDetailPage() {
	const { id } = Route.useParams();
	const sbom = useSboimStore((s) => s.sboms.find((x) => x.id === id));
	const matches = useAnnotatedMatches();
	if (!sbom) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "SBOM not found."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "link",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/inventory",
			children: "Back to inventory"
		})
	})] });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					className: "-ml-2 mb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/inventory",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Inventory"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-medium tracking-tight",
						children: rec.sbom.subjectName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-sm text-muted-foreground",
						children: rec.sbom.serialNumber
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: download,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Download CycloneDX"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: sbom.source }),
						sbom.ecosystem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: sbom.ecosystem
						}) : null,
						signed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "ok",
							children: "ed25519 signed"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "unsigned" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: hits.some((h) => h.confidence === "high") ? "high" : "ok",
							children: [hits.length, " KEV hits"]
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Components",
						value: String(rec.sbom.components.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Created",
						value: formatDate(rec.sbom.createdAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Tool",
						value: `${rec.sbom.toolName} ${rec.sbom.toolVersion}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Integrity" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "SHA-256",
						v: rec.sha256,
						mono: true
					}),
					signed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Key id",
							v: signed.keyId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Algorithm",
							v: signed.algorithm
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Signed at",
							v: signed.signedAt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Payload type",
							v: signed.payloadType
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							"No DSSE envelope on this record. The CLI signs with local Ed25519 keys (",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: "cra-sbom --sign"
							}),
							")."
						]
					}),
					sbom.warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-low",
						children: w
					}, w))
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "KEV matches for this SBOM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchTable, {
					matches: hits,
					showSbom: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Components"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[640px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-secondary/60 text-[11px] uppercase tracking-wide text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Version"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Ecosystem"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Scope"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "PURL"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rec.sbom.components.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-2.5",
									children: [c.name, c.vendor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[11px] text-muted-foreground",
										children: c.vendor
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 font-mono text-xs",
									children: c.version ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 text-muted-foreground",
									children: c.ecosystem ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5",
									children: c.isDirect ? "direct" : "transitive"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "max-w-xs truncate px-4 py-2.5 font-mono text-[11px] text-muted-foreground",
									children: c.purl ?? "—"
								})
							]
						}, `${c.purl ?? c.name}-${i}`)) })]
					})
				})]
			})
		]
	}) });
}
function Meta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-mono text-sm",
			children: value
		})]
	});
}
function Row({ k, v, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1 sm:grid-cols-[140px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: mono ? "break-all font-mono text-xs" : "break-all",
			children: v
		})]
	});
}
//#endregion
export { SbomDetailPage as component };
