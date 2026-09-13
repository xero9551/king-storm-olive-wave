import { toCycloneDxJson } from "./generate";
import { buildPurl } from "./purl";
import type { NormalizedComponent, NormalizedSbom, StoredSbom } from "./types";

function c(
  name: string,
  version: string,
  opts: Partial<NormalizedComponent> = {},
): NormalizedComponent {
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
    purl:
      opts.purl ??
      buildPurl({
        type: ecosystem === "npm" ? "npm" : ecosystem === "pypi" ? "pypi" : "generic",
        namespace,
        name: name.toLowerCase().replace(/\s+/g, "-"),
        version,
      }),
    ...opts,
  };
}

function sbom(
  subjectName: string,
  subjectVersion: string,
  createdAt: string,
  serial: string,
  components: NormalizedComponent[],
): NormalizedSbom {
  return {
    format: "CYCLONEDX_JSON",
    specVersion: "1.5",
    serialNumber: serial,
    createdAt,
    toolName: "cra-guard-sbom-gen",
    toolVersion: "0.1.0",
    subjectName,
    subjectVersion,
    components,
  };
}

function stored(
  id: string,
  s: NormalizedSbom,
  ecosystem: StoredSbom["ecosystem"],
  ingestedAt: string,
  sha256: string,
): StoredSbom {
  const raw = toCycloneDxJson(s);
  return {
    id,
    source: "demo",
    ecosystem,
    warnings: [],
    ingestedAt,
    record: {
      sbom: s,
      raw,
      sha256,
      signatureEnvelope: {
        payloadType: "application/vnd.cyclonedx+json",
        payloadSha256: sha256,
        keyId: "northstar-prod",
        algorithm: "ed25519",
        signature: "demo-envelope",
        signedAt: ingestedAt,
      },
    },
  };
}

export function demoSboms(): StoredSbom[] {
  const edge = sbom(
    "northstar-edge",
    "4.2.1",
    "2026-09-08T14:22:00.000Z",
    "urn:uuid:7c2e9a11-4b3f-4d8a-9c01-a12f88e0d441",
    [
      c("FortiOS", "7.4.3", { vendor: "Fortinet" }),
      c("NetScaler", "14.1-12.35", { vendor: "Citrix" }),
      c("RouterOS", "7.15.3", { vendor: "MikroTik" }),
      c("PAN-OS", "11.1.4", { vendor: "Palo Alto Networks" }),
      c("SMA1000 Appliances", "12.4.3", { vendor: "SonicWall" }),
      c("Firebox", "12.11.2", { vendor: "WatchGuard" }),
      c("openssl", "3.3.1", { ecosystem: "generic", vendor: "OpenSSL", isDirect: false }),
      c("busybox", "1.36.1", { isDirect: false }),
    ],
  );

  const api = sbom(
    "ledger-api",
    "2.8.0",
    "2026-09-09T09:05:00.000Z",
    "urn:uuid:b91d4e22-8aa0-4c55-b3e1-0f7c21ab9912",
    [
      c("TanStack", "1.170.0", { ecosystem: "npm", vendor: "TanStack", namespace: undefined }),
      c("React Server Components", "19.0.1", {
        ecosystem: "npm",
        vendor: "Meta",
        namespace: undefined,
      }),
      c("Nx Console", "1.4.2", { ecosystem: "npm", vendor: "Nx", namespace: undefined }),
      c("Chromium V8", "128.0.6613.84", { vendor: "Google" }),
      c("express", "4.21.2", { ecosystem: "npm", namespace: undefined }),
      c("zod", "3.23.8", { ecosystem: "npm", namespace: undefined, isDirect: true }),
      c("pg", "8.13.1", { ecosystem: "npm", namespace: undefined }),
      c("lodash", "4.17.21", { ecosystem: "npm", namespace: undefined, isDirect: false }),
      c("semver", "7.6.3", { ecosystem: "npm", namespace: undefined, isDirect: false }),
    ],
  );

  const intranet = sbom(
    "intranet-core",
    "1.6.4",
    "2026-09-06T18:40:00.000Z",
    "urn:uuid:0e55c3aa-2d14-4f90-8b77-c4d8e19f3301",
    [
      c("Core", "6.6.2", { vendor: "WordPress", ecosystem: "generic" }),
      c("Exchange Server", "15.2.1544", { vendor: "Microsoft" }),
      c("SharePoint Server", "16.0.17928", { vendor: "Microsoft" }),
      c("TeamCity", "2024.12", { vendor: "JetBrains" }),
      c("ScreenConnect", "23.9.8", { vendor: "ConnectWise" }),
      c("GoAnywhere MFT", "7.6.0", { vendor: "Fortra" }),
      c("nginx", "1.27.2", { isDirect: false }),
      c("php", "8.3.11", { isDirect: false }),
    ],
  );

  return [
    stored(
      "demo-edge",
      edge,
      "inventory",
      "2026-09-08T14:22:11.000Z",
      "a3f91c8e6b2d4a71e0c5d9b8f4a1c6e2b7d3f0a9c4e8b1d5f6a2c7e9b0d4f1a8",
    ),
    stored(
      "demo-api",
      api,
      "npm",
      "2026-09-09T09:05:44.000Z",
      "c8b1e4d0a7f3c9e2b6d5a1f0c4e8b7d3a9f2c6e1b5d0a8f4c2e7b9d1a3f6c0e5",
    ),
    stored(
      "demo-intranet",
      intranet,
      "inventory",
      "2026-09-06T18:40:03.000Z",
      "e1d4a8c2f7b0e5d9a3c6f1b8d2e0a7c4f9b5d1a6e3c8f0b2d7a9c5e4f1b6d0a3",
    ),
  ];
}
