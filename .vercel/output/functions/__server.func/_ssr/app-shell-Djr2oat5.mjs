import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Bell, c as Menu, f as Crosshair, g as Boxes, l as LayoutDashboard, o as Shield, s as ShieldAlert, t as X } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as useKevSeed, o as cn, r as pollKev } from "./router-BwySQpKL.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-Djr2oat5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", {
	variants: { variant: {
		default: "border-border bg-secondary text-muted-foreground",
		high: "border-high/30 bg-high/15 text-high",
		low: "border-low/30 bg-low/15 text-low",
		ok: "border-ok/30 bg-ok/15 text-ok",
		signal: "border-signal/30 bg-signal/15 text-signal",
		outline: "border-border text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
			outline: "border border-border bg-transparent hover:bg-accent text-foreground",
			ghost: "hover:bg-accent text-foreground",
			destructive: "bg-destructive text-foreground hover:bg-destructive/90",
			link: "text-signal underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-8 rounded-sm px-3 text-xs",
			lg: "h-11 rounded-lg px-6",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-background/80", className),
	...props
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var SheetContent = import_react.forwardRef(({ className, children, side = "right", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 flex flex-col gap-4 bg-card p-6 shadow-lg border-border", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md border-l", side === "left" && "inset-y-0 left-0 h-full w-full max-w-xs border-r", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm text-muted-foreground hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = DialogContent.displayName;
/**
* Confidence tiers matter downstream:
*
* - "high": the component's PURL-backed identity AND exact product-name match.
* - "low": only a loose vendor/product name match — a lead, not a confirmed hit.
*
* CISA KEV entries carry a CVE plus free-text vendor/product names, not a
* machine-precise CPE/version range. Ported from SBOIM src/correlation/matcher.ts.
*/
function crossCheck(components, kevEntries) {
	const matches = [];
	for (const component of components) for (const entry of kevEntries) {
		const match = evaluateMatch(component, entry);
		if (match) matches.push(match);
	}
	return matches;
}
function evaluateMatch(component, entry) {
	const componentName = component.name.toLowerCase();
	const productName = entry.product.toLowerCase();
	const vendorName = entry.vendorProject.toLowerCase();
	const nameMatchesProduct = componentName === productName;
	const nameMatchesVendor = component.vendor?.toLowerCase() === vendorName;
	if (!nameMatchesProduct && !nameMatchesVendor) return null;
	return {
		component,
		kevEntry: entry,
		confidence: component.purl && nameMatchesProduct ? "high" : "low",
		matchedOn: component.purl && nameMatchesProduct ? "purl_ecosystem_name" : "vendor_product_name"
	};
}
function daysUntil(isoDate, now = /* @__PURE__ */ new Date()) {
	if (!isoDate) return null;
	const due = /* @__PURE__ */ new Date(`${isoDate}T23:59:59Z`);
	if (Number.isNaN(due.getTime())) return null;
	return Math.ceil((due.getTime() - now.getTime()) / 864e5);
}
function formatDate(iso) {
	if (!iso) return "—";
	return iso.slice(0, 10);
}
function relativeDue(isoDate, now = /* @__PURE__ */ new Date()) {
	const days = daysUntil(isoDate, now);
	if (days === null) return "no due date";
	if (days < 0) return `${Math.abs(days)}d overdue`;
	if (days === 0) return "due today";
	if (days === 1) return "due tomorrow";
	return `${days}d remaining`;
}
function isRansomware(value) {
	return (value ?? "").toLowerCase() === "known";
}
function buildPurl(p) {
	const ns = p.namespace ? `${encodeURIComponent(p.namespace)}/` : "";
	const version = p.version ? `@${encodeURIComponent(p.version)}` : "";
	return `pkg:${p.type}/${ns}${encodeURIComponent(p.name)}${version}`;
}
var TOOL_NAME = "cra-guard-sbom-gen";
var TOOL_VERSION = "0.1.0";
function generateFromNpmLock(lockJson, packageJson) {
	const lock = JSON.parse(lockJson);
	let subjectName = lock.name ?? "unknown-npm-project";
	let subjectVersion = lock.version;
	if (packageJson) {
		const pkg = JSON.parse(packageJson);
		subjectName = pkg.name ?? subjectName;
		subjectVersion = pkg.version ?? subjectVersion;
	}
	const components = lock.lockfileVersion >= 2 && lock.packages ? parseV2V3(lock) : parseV1(lock);
	return {
		sbom: makeSbom(subjectName, subjectVersion, components),
		warnings: []
	};
}
function parseV2V3(lock) {
	const components = [];
	for (const [pathKey, entry] of Object.entries(lock.packages ?? {})) {
		if (pathKey === "" || !entry.version) continue;
		const nameMatch = pathKey.match(/node_modules\/((?:@[^/]+\/)?[^/]+)$/);
		if (!nameMatch) continue;
		const fullName = nameMatch[1];
		const [namespace, name] = fullName.startsWith("@") ? [fullName.split("/")[0], fullName.split("/")[1]] : [void 0, fullName];
		const dedupeKey = `${fullName}@${entry.version}`;
		if (components.some((c) => `${c.namespace ? c.namespace + "/" : ""}${c.name}@${c.version}` === dedupeKey)) continue;
		const nodeModulesOccurrences = pathKey.split("node_modules/").length - 1;
		components.push({
			purl: buildPurl({
				type: "npm",
				namespace,
				name,
				version: entry.version
			}),
			ecosystem: "npm",
			namespace,
			name,
			version: entry.version,
			isDirect: nodeModulesOccurrences === 1
		});
	}
	return components;
}
function parseV1(lock) {
	const components = [];
	const seen = /* @__PURE__ */ new Set();
	function walk(deps, isDirect) {
		if (!deps) return;
		for (const [fullName, dep] of Object.entries(deps)) {
			const [namespace, name] = fullName.startsWith("@") ? [fullName.split("/")[0], fullName.split("/")[1]] : [void 0, fullName];
			const key = `${fullName}@${dep.version}`;
			if (!seen.has(key)) {
				seen.add(key);
				components.push({
					purl: buildPurl({
						type: "npm",
						namespace,
						name,
						version: dep.version
					}),
					ecosystem: "npm",
					namespace,
					name,
					version: dep.version,
					isDirect
				});
			}
			if (dep.dependencies) walk(dep.dependencies, false);
		}
	}
	walk(lock.dependencies, true);
	return components;
}
var PINNED_LINE = /^([A-Za-z0-9][A-Za-z0-9._-]*)\s*==\s*([^\s;#]+)/;
function generateFromRequirementsTxt(text, subjectName = "python-project") {
	const lines = text.split("\n");
	const components = [];
	const skippedLines = [];
	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#") || line.startsWith("-")) continue;
		const match = line.match(PINNED_LINE);
		if (!match) {
			skippedLines.push(rawLine);
			continue;
		}
		const [, name, version] = match;
		const normalizedName = name.toLowerCase().replace(/_/g, "-");
		components.push({
			purl: buildPurl({
				type: "pypi",
				name: normalizedName,
				version
			}),
			ecosystem: "pypi",
			name: normalizedName,
			version,
			isDirect: true
		});
	}
	const warnings = [];
	if (skippedLines.length > 0) warnings.push(`Skipped ${skippedLines.length} requirements.txt line(s) without an exact pin (==): ` + skippedLines.slice(0, 5).join(", ") + (skippedLines.length > 5 ? ", ..." : ""));
	return {
		sbom: makeSbom(subjectName, void 0, components),
		warnings
	};
}
function makeSbom(subjectName, subjectVersion, components) {
	return {
		format: "CYCLONEDX_JSON",
		specVersion: "1.5",
		serialNumber: `urn:uuid:${crypto.randomUUID()}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		toolName: TOOL_NAME,
		toolVersion: TOOL_VERSION,
		subjectName,
		subjectVersion,
		components
	};
}
function toCycloneDxJson(sbom) {
	const doc = {
		bomFormat: "CycloneDX",
		specVersion: sbom.specVersion,
		serialNumber: sbom.serialNumber,
		version: 1,
		metadata: {
			timestamp: sbom.createdAt,
			tools: [{
				name: sbom.toolName,
				version: sbom.toolVersion
			}],
			component: {
				type: "application",
				name: sbom.subjectName,
				version: sbom.subjectVersion
			}
		},
		components: sbom.components.map((c) => ({
			type: "library",
			name: c.name,
			version: c.version,
			purl: c.purl,
			cpe: c.cpe,
			group: c.namespace,
			publisher: c.vendor,
			scope: c.isDirect ? "required" : "optional"
		}))
	};
	return JSON.stringify(doc, null, 2);
}
function parseCycloneDx(raw) {
	const doc = JSON.parse(raw);
	if (doc.bomFormat !== "CycloneDX") throw new Error("Not a CycloneDX document (missing bomFormat: \"CycloneDX\")");
	const tool = doc.metadata?.tools?.[0];
	const toolName = tool && "name" in tool && typeof tool.name === "string" ? tool.name : TOOL_NAME;
	const toolVersion = tool && "version" in tool && typeof tool.version === "string" ? tool.version : TOOL_VERSION;
	const components = (doc.components ?? []).map((c) => ({
		purl: c.purl,
		cpe: c.cpe,
		namespace: c.group,
		name: c.name ?? "unknown",
		version: c.version,
		vendor: c.publisher,
		ecosystem: c.purl?.startsWith("pkg:") ? c.purl.slice(4).split("/")[0] : void 0,
		isDirect: c.scope === "required"
	}));
	return {
		sbom: {
			format: "CYCLONEDX_JSON",
			specVersion: "1.5",
			serialNumber: doc.serialNumber ?? `urn:uuid:${crypto.randomUUID()}`,
			createdAt: doc.metadata?.timestamp ?? (/* @__PURE__ */ new Date()).toISOString(),
			toolName,
			toolVersion,
			subjectName: doc.metadata?.component?.name ?? "uploaded-sbom",
			subjectVersion: doc.metadata?.component?.version,
			components
		},
		warnings: []
	};
}
function c(name, version, opts = {}) {
	const ecosystem = opts.ecosystem ?? "generic";
	const vendor = opts.vendor;
	const namespace = opts.namespace ?? vendor?.toLowerCase().replace(/\s+/g, "-");
	return {
		name,
		version,
		vendor,
		namespace,
		ecosystem,
		isDirect: opts.isDirect ?? true,
		purl: opts.purl ?? buildPurl({
			type: ecosystem === "npm" ? "npm" : ecosystem === "pypi" ? "pypi" : "generic",
			namespace,
			name: name.toLowerCase().replace(/\s+/g, "-"),
			version
		}),
		...opts
	};
}
function sbom(subjectName, subjectVersion, createdAt, serial, components) {
	return {
		format: "CYCLONEDX_JSON",
		specVersion: "1.5",
		serialNumber: serial,
		createdAt,
		toolName: "cra-guard-sbom-gen",
		toolVersion: "0.1.0",
		subjectName,
		subjectVersion,
		components
	};
}
function stored(id, s, ecosystem, ingestedAt, sha256) {
	return {
		id,
		source: "demo",
		ecosystem,
		warnings: [],
		ingestedAt,
		record: {
			sbom: s,
			raw: toCycloneDxJson(s),
			sha256,
			signatureEnvelope: {
				payloadType: "application/vnd.cyclonedx+json",
				payloadSha256: sha256,
				keyId: "northstar-prod",
				algorithm: "ed25519",
				signature: "demo-envelope",
				signedAt: ingestedAt
			}
		}
	};
}
function demoSboms() {
	const edge = sbom("northstar-edge", "4.2.1", "2026-09-08T14:22:00.000Z", "urn:uuid:7c2e9a11-4b3f-4d8a-9c01-a12f88e0d441", [
		c("FortiOS", "7.4.3", { vendor: "Fortinet" }),
		c("NetScaler", "14.1-12.35", { vendor: "Citrix" }),
		c("RouterOS", "7.15.3", { vendor: "MikroTik" }),
		c("PAN-OS", "11.1.4", { vendor: "Palo Alto Networks" }),
		c("SMA1000 Appliances", "12.4.3", { vendor: "SonicWall" }),
		c("Firebox", "12.11.2", { vendor: "WatchGuard" }),
		c("openssl", "3.3.1", {
			ecosystem: "generic",
			vendor: "OpenSSL",
			isDirect: false
		}),
		c("busybox", "1.36.1", { isDirect: false })
	]);
	const api = sbom("ledger-api", "2.8.0", "2026-09-09T09:05:00.000Z", "urn:uuid:b91d4e22-8aa0-4c55-b3e1-0f7c21ab9912", [
		c("TanStack", "1.170.0", {
			ecosystem: "npm",
			vendor: "TanStack",
			namespace: void 0
		}),
		c("React Server Components", "19.0.1", {
			ecosystem: "npm",
			vendor: "Meta",
			namespace: void 0
		}),
		c("Nx Console", "1.4.2", {
			ecosystem: "npm",
			vendor: "Nx",
			namespace: void 0
		}),
		c("Chromium V8", "128.0.6613.84", { vendor: "Google" }),
		c("express", "4.21.2", {
			ecosystem: "npm",
			namespace: void 0
		}),
		c("zod", "3.23.8", {
			ecosystem: "npm",
			namespace: void 0,
			isDirect: true
		}),
		c("pg", "8.13.1", {
			ecosystem: "npm",
			namespace: void 0
		}),
		c("lodash", "4.17.21", {
			ecosystem: "npm",
			namespace: void 0,
			isDirect: false
		}),
		c("semver", "7.6.3", {
			ecosystem: "npm",
			namespace: void 0,
			isDirect: false
		})
	]);
	const intranet = sbom("intranet-core", "1.6.4", "2026-09-06T18:40:00.000Z", "urn:uuid:0e55c3aa-2d14-4f90-8b77-c4d8e19f3301", [
		c("Core", "6.6.2", {
			vendor: "WordPress",
			ecosystem: "generic"
		}),
		c("Exchange Server", "15.2.1544", { vendor: "Microsoft" }),
		c("SharePoint Server", "16.0.17928", { vendor: "Microsoft" }),
		c("TeamCity", "2024.12", { vendor: "JetBrains" }),
		c("ScreenConnect", "23.9.8", { vendor: "ConnectWise" }),
		c("GoAnywhere MFT", "7.6.0", { vendor: "Fortra" }),
		c("nginx", "1.27.2", { isDirect: false }),
		c("php", "8.3.11", { isDirect: false })
	]);
	return [
		stored("demo-edge", edge, "inventory", "2026-09-08T14:22:11.000Z", "a3f91c8e6b2d4a71e0c5d9b8f4a1c6e2b7d3f0a9c4e8b1d5f6a2c7e9b0d4f1a8"),
		stored("demo-api", api, "npm", "2026-09-09T09:05:44.000Z", "c8b1e4d0a7f3c9e2b6d5a1f0c4e8b7d3a9f2c6e1b5d0a8f4c2e7b9d1a3f6c0e5"),
		stored("demo-intranet", intranet, "inventory", "2026-09-06T18:40:03.000Z", "e1d4a8c2f7b0e5d9a3c6f1b8d2e0a7c4f9b5d1a6e3c8f0b2d7a9c5e4f1b6d0a3")
	];
}
async function sha256Hex(text) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function shortHash(hex, n = 12) {
	return hex.slice(0, n);
}
var useSboimStore = create()(persist((set, get) => ({
	sboms: demoSboms(),
	webhookUrl: "",
	failOnHigh: true,
	alerts: [],
	hydrated: false,
	ingestSbom: async ({ sbom, source, ecosystem, warnings = [], raw }) => {
		const json = raw ?? toCycloneDxJson(sbom);
		const sha256 = await sha256Hex(json);
		const id = crypto.randomUUID();
		set({ sboms: [{
			id,
			source,
			ecosystem,
			warnings,
			ingestedAt: (/* @__PURE__ */ new Date()).toISOString(),
			record: {
				sbom,
				raw: json,
				sha256
			}
		}, ...get().sboms] });
		return id;
	},
	removeSbom: (id) => set({ sboms: get().sboms.filter((s) => s.id !== id) }),
	setWebhookUrl: (url) => set({ webhookUrl: url }),
	setFailOnHigh: (v) => set({ failOnHigh: v }),
	logAlert: (entry) => set({ alerts: [{
		...entry,
		id: crypto.randomUUID()
	}, ...get().alerts].slice(0, 50) }),
	resetDemo: () => set({
		sboms: demoSboms(),
		alerts: []
	})
}), {
	name: "sboim-dashboard",
	partialize: (s) => ({
		sboms: s.sboms,
		webhookUrl: s.webhookUrl,
		failOnHigh: s.failOnHigh,
		alerts: s.alerts
	}),
	onRehydrateStorage: () => (state) => {
		if (state) state.hydrated = true;
	}
}));
function useKev() {
	const seed = useKevSeed();
	return useQuery({
		queryKey: ["kev-catalog"],
		queryFn: () => pollKev(),
		initialData: seed,
		staleTime: 9e5,
		retry: 1
	});
}
function useAnnotatedMatches() {
	const sboms = useSboimStore((s) => s.sboms);
	const { data } = useKev();
	const entries = data?.snapshot.entries;
	return (0, import_react.useMemo)(() => {
		if (!entries) return [];
		const out = [];
		for (const s of sboms) {
			const matches = crossCheck(s.record.sbom.components, entries);
			for (const m of matches) out.push({
				...m,
				sbomId: s.id,
				subjectName: s.record.sbom.subjectName
			});
		}
		return out.sort((a, b) => {
			if (a.confidence !== b.confidence) return a.confidence === "high" ? -1 : 1;
			return (b.kevEntry.dateAdded ?? "").localeCompare(a.kevEntry.dateAdded ?? "");
		});
	}, [sboms, entries]);
}
function useDashboardStats() {
	const sboms = useSboimStore((s) => s.sboms);
	const matches = useAnnotatedMatches();
	const { data } = useKev();
	return (0, import_react.useMemo)(() => {
		const components = sboms.reduce((n, s) => n + s.record.sbom.components.length, 0);
		const high = matches.filter((m) => m.confidence === "high");
		const low = matches.filter((m) => m.confidence === "low");
		const ransomware = matches.filter((m) => isRansomware(m.kevEntry.knownRansomwareUse));
		const overdue = matches.filter((m) => {
			const d = daysUntil(m.kevEntry.dueDate);
			return d !== null && d < 0;
		});
		const dueSoon = matches.filter((m) => {
			const d = daysUntil(m.kevEntry.dueDate);
			return d !== null && d >= 0 && d <= 7;
		});
		const uniqueCves = new Set(matches.map((m) => m.kevEntry.cveId));
		return {
			sbomCount: sboms.length,
			components,
			catalogCount: data?.snapshot.count ?? 0,
			catalogVersion: data?.snapshot.catalogVersion,
			dateReleased: data?.snapshot.dateReleased,
			fetchedAt: data?.snapshot.fetchedAt,
			source: data?.source,
			fetchError: data?.error,
			high: high.length,
			low: low.length,
			ransomware: ransomware.length,
			overdue: overdue.length,
			dueSoon: dueSoon.length,
			uniqueCves: uniqueCves.size,
			matches,
			sboms
		};
	}, [
		sboms,
		matches,
		data
	]);
}
function matchesForSbom(sbom, matches) {
	return matches.filter((m) => m.sbomId === sbom.id);
}
var NAV = [
	{
		to: "/",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		to: "/inventory",
		label: "Inventory",
		icon: Boxes
	},
	{
		to: "/matches",
		label: "Cross-check",
		icon: Crosshair
	},
	{
		to: "/kev",
		label: "KEV catalog",
		icon: ShieldAlert
	},
	{
		to: "/alerts",
		label: "Alerts",
		icon: Bell
	}
];
function NavLinks({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const stats = useDashboardStats();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: NAV.map((item) => {
			const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
			const count = item.to === "/matches" ? stats.high : item.to === "/inventory" ? stats.sbomCount : null;
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors", active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: item.label
					}),
					count !== null && count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tabular-nums text-muted-foreground",
						children: count
					}) : null
				]
			}, item.to);
		})
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-3 px-1 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-9 items-center justify-center rounded-lg border border-border bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-signal" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium tracking-tight",
				children: "SBOIM"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] text-muted-foreground",
				children: "SBOM intelligence"
			})]
		})]
	});
}
function CatalogMeta() {
	const stats = useDashboardStats();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-secondary/50 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-wide text-muted-foreground",
					children: "CISA KEV"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: stats.source === "live" ? "ok" : stats.source === "fallback" ? "low" : "signal",
					children: stats.source ?? "…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-lg tabular-nums leading-none",
				children: stats.catalogCount || "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: stats.catalogVersion ? `v${stats.catalogVersion}` : "polling feed"
			})
		]
	});
}
function SidebarBody({ onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { onNavigate }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogMeta, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 px-1 text-[11px] leading-relaxed text-muted-foreground",
					children: "Ported from Purplelotusec/SBOIM — generate, sign, cross-check, alert."
				})]
			})
		]
	});
}
function AppShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-svh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-border bg-sidebar p-4 md:flex md:flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:pl-60",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setOpen(true),
						"aria-label": "Open menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
					open,
					onOpenChange: setOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
						side: "left",
						className: "bg-sidebar p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, { onNavigate: () => setOpen(false) })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8",
					children
				})
			]
		})]
	});
}
//#endregion
export { formatDate as a, isRansomware as c, relativeDue as d, shortHash as f, useSboimStore as g, useKev as h, daysUntil as i, matchesForSbom as l, useDashboardStats as m, Badge as n, generateFromNpmLock as o, useAnnotatedMatches as p, Button as r, generateFromRequirementsTxt as s, AppShell as t, parseCycloneDx as u };
