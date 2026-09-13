import { t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, r as number, t as array } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/poll-kev-H_nyXXYB.js
/** Bundled snapshot so the dashboard still works if CISA is unreachable. */
var FALLBACK_ENTRIES = [
	{
		cveId: "CVE-2026-87491",
		vendorProject: "Google",
		product: "Chromium V8",
		vulnerabilityName: "Google Chromium V8 Out of Bounds Write Vulnerability",
		dateAdded: "2026-09-09",
		dueDate: "2026-09-23",
		knownRansomwareUse: "Unknown",
		shortDescription: "Google Chromium V8 contains an out of bounds write vulnerability that allows a remote attacker to execute arbitrary code inside the sandbox."
	},
	{
		cveId: "CVE-2026-85046",
		vendorProject: "Google",
		product: "Chromium V8",
		vulnerabilityName: "Google Chromium V8 Type Confusion Vulnerability",
		dateAdded: "2026-09-04",
		dueDate: "2026-09-18",
		knownRansomwareUse: "Unknown",
		shortDescription: "Google Chromium V8 contains a type confusion vulnerability that allows a remote attacker to execute arbitrary code inside the sandbox."
	},
	{
		cveId: "CVE-2026-19490",
		vendorProject: "Citrix",
		product: "NetScaler",
		vulnerabilityName: "Citrix NetScaler Authentication Bypass Using an Alternate Path or Channel Vulnerability",
		dateAdded: "2026-09-09",
		dueDate: "2026-09-12",
		knownRansomwareUse: "Unknown",
		shortDescription: "Citrix NetScaler ADC and NetScaler Gateway contain an authentication-bypass vulnerability involving an alternate path or channel."
	},
	{
		cveId: "CVE-2026-67277",
		vendorProject: "MikroTik",
		product: "RouterOS",
		vulnerabilityName: "MikroTik RouterOS Missing Authentication for Critical Function Vulnerability",
		dateAdded: "2026-09-10",
		dueDate: "2026-09-13",
		knownRansomwareUse: "Unknown",
		shortDescription: "MikroTik RouterOS contains a missing authentication for critical function vulnerability which allows kernel memory disclosure."
	},
	{
		cveId: "CVE-2026-86060",
		vendorProject: "MikroTik",
		product: "RouterOS",
		vulnerabilityName: "MikroTik RouterOS Improper Neutralization of Argument Delimiters in a Command Vulnerability",
		dateAdded: "2026-09-10",
		dueDate: "2026-09-13",
		knownRansomwareUse: "Unknown",
		shortDescription: "MikroTik RouterOS contains an improper neutralization of argument delimiters in a command vulnerability leading to privilege escalation."
	},
	{
		cveId: "CVE-2025-68686",
		vendorProject: "Fortinet",
		product: "FortiOS",
		vulnerabilityName: "Fortinet FortiOS Exposure of Sensitive Information to an Unauthorized Actor Vulnerability",
		dateAdded: "2026-07-27",
		dueDate: "2026-08-10",
		knownRansomwareUse: "Unknown",
		shortDescription: "Fortinet FortiOS contains an exposure of sensitive information to an unauthorized actor vulnerability."
	},
	{
		cveId: "CVE-2026-0257",
		vendorProject: "Palo Alto Networks",
		product: "PAN-OS",
		vulnerabilityName: "Palo Alto Networks PAN-OS Authentication Bypass Vulnerability",
		dateAdded: "2026-05-29",
		dueDate: "2026-06-01",
		knownRansomwareUse: "Known",
		shortDescription: "Palo Alto Networks PAN-OS contains an authentication bypass vulnerability that allows attackers to establish an unauthorized VPN connection."
	},
	{
		cveId: "CVE-2026-15409",
		vendorProject: "SonicWall",
		product: "SMA1000 Appliances",
		vulnerabilityName: "SonicWall SMA1000 Appliances Server-Side Request Forgery Vulnerability",
		dateAdded: "2026-07-14",
		dueDate: "2026-07-17",
		knownRansomwareUse: "Known",
		shortDescription: "SonicWall SMA1000 Appliances contain a server-side request forgery vulnerability."
	},
	{
		cveId: "CVE-2026-15410",
		vendorProject: "SonicWall",
		product: "SMA1000 Appliances",
		vulnerabilityName: "SonicWall SMA1000 Appliances Code Injection Vulnerability",
		dateAdded: "2026-07-14",
		dueDate: "2026-07-17",
		knownRansomwareUse: "Known",
		shortDescription: "SonicWall SMA1000 Appliances contain a code injection vulnerability that could enable OS command execution."
	},
	{
		cveId: "CVE-2025-55182",
		vendorProject: "Meta",
		product: "React Server Components",
		vulnerabilityName: "Meta React Server Components Remote Code Execution Vulnerability",
		dateAdded: "2025-12-05",
		dueDate: "2025-12-12",
		knownRansomwareUse: "Known",
		shortDescription: "Meta React Server Components contains a remote code execution vulnerability."
	},
	{
		cveId: "CVE-2026-45321",
		vendorProject: "TanStack",
		product: "TanStack",
		vulnerabilityName: "TanStack Unspecified Vulnerability",
		dateAdded: "2026-05-27",
		dueDate: "2026-06-10",
		knownRansomwareUse: "Known",
		shortDescription: "TanStack contains an unspecified vulnerability that allowed malicious versions of the product to be published to the npm registry."
	},
	{
		cveId: "CVE-2026-48027",
		vendorProject: "Nx",
		product: "Nx Console",
		vulnerabilityName: "Nx Console Embedded Malicious Code Vulnerability",
		dateAdded: "2026-05-27",
		dueDate: "2026-06-10",
		knownRansomwareUse: "Known",
		shortDescription: "Nx Console contains an embedded malicious code vulnerability that allowed a malicious version to be published."
	},
	{
		cveId: "CVE-2026-60137",
		vendorProject: "WordPress",
		product: "Core",
		vulnerabilityName: "WordPress Core SQL Injection Vulnerability",
		dateAdded: "2026-07-21",
		dueDate: "2026-08-04",
		knownRansomwareUse: "Unknown",
		shortDescription: "WordPress Core contains a SQL injection vulnerability that can be chained for RCE."
	},
	{
		cveId: "CVE-2026-63030",
		vendorProject: "WordPress",
		product: "Core",
		vulnerabilityName: "WordPress Core Interpretation Conflict Vulnerability",
		dateAdded: "2026-07-21",
		dueDate: "2026-07-24",
		knownRansomwareUse: "Unknown",
		shortDescription: "WordPress Core contains an interpretation conflict vulnerability that could allow SQL injection and RCE."
	},
	{
		cveId: "CVE-2026-45659",
		vendorProject: "Microsoft",
		product: "SharePoint Server",
		vulnerabilityName: "Microsoft SharePoint Server Deserialization of Untrusted Data Vulnerability",
		dateAdded: "2026-07-01",
		dueDate: "2026-07-04",
		knownRansomwareUse: "Known",
		shortDescription: "Microsoft SharePoint Server contains a deserialization of untrusted data vulnerability allowing code execution."
	},
	{
		cveId: "CVE-2023-21529",
		vendorProject: "Microsoft",
		product: "Exchange Server",
		vulnerabilityName: "Microsoft Exchange Server Deserialization of Untrusted Data Vulnerability",
		dateAdded: "2026-04-13",
		dueDate: "2026-04-27",
		knownRansomwareUse: "Known",
		shortDescription: "Microsoft Exchange Server contains a deserialization of untrusted data that allows an authenticated attacker to achieve RCE."
	},
	{
		cveId: "CVE-2024-27199",
		vendorProject: "JetBrains",
		product: "TeamCity",
		vulnerabilityName: "JetBrains TeamCity Relative Path Traversal Vulnerability",
		dateAdded: "2026-04-20",
		dueDate: "2026-05-04",
		knownRansomwareUse: "Known",
		shortDescription: "JetBrains TeamCity contains a relative path traversal vulnerability."
	},
	{
		cveId: "CVE-2024-1708",
		vendorProject: "ConnectWise",
		product: "ScreenConnect",
		vulnerabilityName: "ConnectWise ScreenConnect Path Traversal Vulnerability",
		dateAdded: "2026-04-28",
		dueDate: "2026-05-12",
		knownRansomwareUse: "Known",
		shortDescription: "ConnectWise ScreenConnect contains a path traversal vulnerability which could allow remote code execution."
	},
	{
		cveId: "CVE-2025-10035",
		vendorProject: "Fortra",
		product: "GoAnywhere MFT",
		vulnerabilityName: "Fortra GoAnywhere MFT Deserialization of Untrusted Data Vulnerability",
		dateAdded: "2025-09-29",
		dueDate: "2025-10-20",
		knownRansomwareUse: "Known",
		shortDescription: "Fortra GoAnywhere MFT contains a deserialization of untrusted data vulnerability."
	},
	{
		cveId: "CVE-2025-14733",
		vendorProject: "WatchGuard",
		product: "Firebox",
		vulnerabilityName: "WatchGuard Firebox Out of Bounds Write Vulnerability",
		dateAdded: "2025-12-19",
		dueDate: "2025-12-26",
		knownRansomwareUse: "Known",
		shortDescription: "WatchGuard Fireware OS iked process contains an out of bounds write vulnerability."
	},
	{
		cveId: "CVE-2026-20079",
		vendorProject: "Cisco",
		product: "Secure Firewall Management Center (FMC) and Security Cloud Control (SCC) Firewall Management",
		vulnerabilityName: "Cisco Firewall Management Center Authentication Bypass Using an Alternate Path or Channel Vulnerability",
		dateAdded: "2026-09-09",
		dueDate: "2026-09-12",
		knownRansomwareUse: "Unknown",
		shortDescription: "Cisco Secure Firewall Management Center contains an authentication bypass that could allow unauthenticated root access."
	},
	{
		cveId: "CVE-2025-14174",
		vendorProject: "Google",
		product: "Chromium",
		vulnerabilityName: "Google Chromium Out of Bounds Memory Access Vulnerability",
		dateAdded: "2025-12-12",
		dueDate: "2026-01-02",
		knownRansomwareUse: "Unknown",
		shortDescription: "Google Chromium contains an out of bounds memory access vulnerability in ANGLE."
	}
];
function fallbackSnapshot() {
	return {
		catalogVersion: "bundled-fallback",
		dateReleased: "2026-09-10",
		count: FALLBACK_ENTRIES.length,
		entries: FALLBACK_ENTRIES,
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
var CISA_URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";
var GITHUB_URL = "https://raw.githubusercontent.com/cisagov/kev-data/develop/known_exploited_vulnerabilities.json";
var kevEntrySchema = object({
	cveID: string(),
	vendorProject: string().default(""),
	product: string().default(""),
	vulnerabilityName: string().default(""),
	dateAdded: string(),
	shortDescription: string().default(""),
	requiredAction: string().optional(),
	dueDate: string().optional(),
	knownRansomwareCampaignUse: string().optional(),
	notes: string().optional()
});
var kevFeedSchema = object({
	catalogVersion: string().optional(),
	dateReleased: string().optional(),
	count: number().optional(),
	vulnerabilities: array(kevEntrySchema)
});
var cache = null;
var TTL_MS = 9e5;
function toEntry(raw) {
	return {
		cveId: raw.cveID,
		vendorProject: raw.vendorProject,
		product: raw.product,
		vulnerabilityName: raw.vulnerabilityName,
		dateAdded: raw.dateAdded,
		shortDescription: raw.shortDescription,
		requiredAction: raw.requiredAction,
		dueDate: raw.dueDate,
		knownRansomwareUse: raw.knownRansomwareCampaignUse,
		notes: raw.notes
	};
}
async function fetchFeed(url) {
	const res = await fetch(url, { headers: { "User-Agent": "sboim-dashboard/0.1 (+https://github.com/Purplelotusec/SBOIM)" } });
	if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
	const json = await res.json();
	const parsed = kevFeedSchema.safeParse(json);
	if (!parsed.success) throw new Error(`KEV feed schema mismatch: ${parsed.error.issues[0]?.message}`);
	return {
		catalogVersion: parsed.data.catalogVersion,
		dateReleased: parsed.data.dateReleased,
		count: parsed.data.vulnerabilities.length,
		entries: parsed.data.vulnerabilities.map(toEntry),
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
var pollKev_createServerFn_handler = createServerRpc({
	id: "e962c966dfe36461e048fd69e5ab767099c5177d049adaf384c59e44c0258f18",
	name: "pollKev",
	filename: "src/lib/sboim/poll-kev.ts"
}, (opts) => pollKev.__executeServer(opts));
var pollKev = createServerFn({ method: "GET" }).handler(pollKev_createServerFn_handler, async () => {
	if (cache && Date.now() - cache.at < TTL_MS) return cache.result;
	const errors = [];
	try {
		const result = {
			snapshot: await fetchFeed(CISA_URL),
			source: "live"
		};
		cache = {
			result,
			at: Date.now()
		};
		return result;
	} catch (err) {
		errors.push(`CISA: ${err.message}`);
	}
	try {
		const result = {
			snapshot: await fetchFeed(GITHUB_URL),
			source: "github",
			error: errors[0]
		};
		cache = {
			result,
			at: Date.now()
		};
		return result;
	} catch (err) {
		errors.push(`GitHub: ${err.message}`);
	}
	const result = {
		snapshot: fallbackSnapshot(),
		source: "fallback",
		error: errors.join(" · ")
	};
	cache = {
		result,
		at: Date.now()
	};
	return result;
});
//#endregion
export { pollKev_createServerFn_handler };
