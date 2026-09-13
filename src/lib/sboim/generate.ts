import { buildPurl } from "./purl";
import type { NormalizedComponent, NormalizedSbom } from "./types";

const TOOL_NAME = "cra-guard-sbom-gen";
const TOOL_VERSION = "0.1.0";

export interface GenerateResult {
  sbom: NormalizedSbom;
  warnings: string[];
}

interface PackageLockV2V3 {
  name?: string;
  version?: string;
  lockfileVersion: number;
  packages?: Record<
    string,
    { version?: string; resolved?: string; dev?: boolean; optional?: boolean; peer?: boolean }
  >;
  dependencies?: Record<string, PackageLockV1Dep>;
}

interface PackageLockV1Dep {
  version: string;
  dev?: boolean;
  dependencies?: Record<string, PackageLockV1Dep>;
}

export function generateFromNpmLock(
  lockJson: string,
  packageJson?: string,
): GenerateResult {
  const lock: PackageLockV2V3 = JSON.parse(lockJson);
  let subjectName = lock.name ?? "unknown-npm-project";
  let subjectVersion = lock.version;
  if (packageJson) {
    const pkg = JSON.parse(packageJson) as { name?: string; version?: string };
    subjectName = pkg.name ?? subjectName;
    subjectVersion = pkg.version ?? subjectVersion;
  }

  const components: NormalizedComponent[] =
    lock.lockfileVersion >= 2 && lock.packages ? parseV2V3(lock) : parseV1(lock);

  return { sbom: makeSbom(subjectName, subjectVersion, components), warnings: [] };
}

function parseV2V3(lock: PackageLockV2V3): NormalizedComponent[] {
  const components: NormalizedComponent[] = [];
  for (const [pathKey, entry] of Object.entries(lock.packages ?? {})) {
    if (pathKey === "" || !entry.version) continue;

    const nameMatch = pathKey.match(/node_modules\/((?:@[^/]+\/)?[^/]+)$/);
    if (!nameMatch) continue;
    const fullName = nameMatch[1];
    const isScoped = fullName.startsWith("@");
    const [namespace, name] = isScoped
      ? [fullName.split("/")[0], fullName.split("/")[1]]
      : [undefined, fullName];

    const dedupeKey = `${fullName}@${entry.version}`;
    if (
      components.some(
        (c) => `${c.namespace ? c.namespace + "/" : ""}${c.name}@${c.version}` === dedupeKey,
      )
    ) {
      continue;
    }

    const nodeModulesOccurrences = pathKey.split("node_modules/").length - 1;

    components.push({
      purl: buildPurl({ type: "npm", namespace, name, version: entry.version }),
      ecosystem: "npm",
      namespace,
      name,
      version: entry.version,
      isDirect: nodeModulesOccurrences === 1,
    });
  }
  return components;
}

function parseV1(lock: PackageLockV2V3): NormalizedComponent[] {
  const components: NormalizedComponent[] = [];
  const seen = new Set<string>();

  function walk(deps: Record<string, PackageLockV1Dep> | undefined, isDirect: boolean) {
    if (!deps) return;
    for (const [fullName, dep] of Object.entries(deps)) {
      const isScoped = fullName.startsWith("@");
      const [namespace, name] = isScoped
        ? [fullName.split("/")[0], fullName.split("/")[1]]
        : [undefined, fullName];

      const key = `${fullName}@${dep.version}`;
      if (!seen.has(key)) {
        seen.add(key);
        components.push({
          purl: buildPurl({ type: "npm", namespace, name, version: dep.version }),
          ecosystem: "npm",
          namespace,
          name,
          version: dep.version,
          isDirect,
        });
      }
      if (dep.dependencies) walk(dep.dependencies, false);
    }
  }

  walk(lock.dependencies, true);
  return components;
}

const PINNED_LINE = /^([A-Za-z0-9][A-Za-z0-9._-]*)\s*==\s*([^\s;#]+)/;

export function generateFromRequirementsTxt(
  text: string,
  subjectName = "python-project",
): GenerateResult {
  const lines = text.split("\n");
  const components: NormalizedComponent[] = [];
  const skippedLines: string[] = [];

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
      purl: buildPurl({ type: "pypi", name: normalizedName, version }),
      ecosystem: "pypi",
      name: normalizedName,
      version,
      isDirect: true,
    });
  }

  const warnings: string[] = [];
  if (skippedLines.length > 0) {
    warnings.push(
      `Skipped ${skippedLines.length} requirements.txt line(s) without an exact pin (==): ` +
        skippedLines.slice(0, 5).join(", ") +
        (skippedLines.length > 5 ? ", ..." : ""),
    );
  }

  return { sbom: makeSbom(subjectName, undefined, components), warnings };
}

export function makeSbom(
  subjectName: string,
  subjectVersion: string | undefined,
  components: NormalizedComponent[],
): NormalizedSbom {
  return {
    format: "CYCLONEDX_JSON",
    specVersion: "1.5",
    serialNumber: `urn:uuid:${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    toolName: TOOL_NAME,
    toolVersion: TOOL_VERSION,
    subjectName,
    subjectVersion,
    components,
  };
}

export function toCycloneDxJson(sbom: NormalizedSbom): string {
  const doc = {
    bomFormat: "CycloneDX",
    specVersion: sbom.specVersion,
    serialNumber: sbom.serialNumber,
    version: 1,
    metadata: {
      timestamp: sbom.createdAt,
      tools: [{ name: sbom.toolName, version: sbom.toolVersion }],
      component: {
        type: "application",
        name: sbom.subjectName,
        version: sbom.subjectVersion,
      },
    },
    components: sbom.components.map((c) => ({
      type: "library",
      name: c.name,
      version: c.version,
      purl: c.purl,
      cpe: c.cpe,
      group: c.namespace,
      publisher: c.vendor,
      scope: c.isDirect ? "required" : "optional",
    })),
  };
  return JSON.stringify(doc, null, 2);
}

interface CycloneComponent {
  name?: string;
  version?: string;
  purl?: string;
  cpe?: string;
  group?: string;
  publisher?: string;
  scope?: string;
}

interface CycloneDoc {
  bomFormat?: string;
  specVersion?: string;
  serialNumber?: string;
  metadata?: {
    timestamp?: string;
    tools?: Array<{ name?: string; version?: string } | { components?: Array<{ name?: string; version?: string }> }>;
    component?: { name?: string; version?: string };
  };
  components?: CycloneComponent[];
}

export function parseCycloneDx(raw: string): GenerateResult {
  const doc = JSON.parse(raw) as CycloneDoc;
  if (doc.bomFormat !== "CycloneDX") {
    throw new Error('Not a CycloneDX document (missing bomFormat: "CycloneDX")');
  }

  const tool = doc.metadata?.tools?.[0];
  const toolName =
    tool && "name" in tool && typeof tool.name === "string"
      ? tool.name
      : TOOL_NAME;
  const toolVersion =
    tool && "version" in tool && typeof tool.version === "string"
      ? tool.version
      : TOOL_VERSION;

  const components: NormalizedComponent[] = (doc.components ?? []).map((c) => ({
    purl: c.purl,
    cpe: c.cpe,
    namespace: c.group,
    name: c.name ?? "unknown",
    version: c.version,
    vendor: c.publisher,
    ecosystem: c.purl?.startsWith("pkg:") ? c.purl.slice(4).split("/")[0] : undefined,
    isDirect: c.scope === "required",
  }));

  const sbom: NormalizedSbom = {
    format: "CYCLONEDX_JSON",
    specVersion: "1.5",
    serialNumber: doc.serialNumber ?? `urn:uuid:${crypto.randomUUID()}`,
    createdAt: doc.metadata?.timestamp ?? new Date().toISOString(),
    toolName,
    toolVersion,
    subjectName: doc.metadata?.component?.name ?? "uploaded-sbom",
    subjectVersion: doc.metadata?.component?.version,
    components,
  };

  return { sbom, warnings: [] };
}
