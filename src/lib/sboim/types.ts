export interface NormalizedComponent {
  purl?: string;
  cpe?: string;
  ecosystem?: string;
  namespace?: string;
  name: string;
  version?: string;
  vendor?: string;
  /** Direct dependency of the scanned project, vs. transitive. Best-effort. */
  isDirect?: boolean;
}

export interface NormalizedSbom {
  format: "CYCLONEDX_JSON";
  specVersion: "1.5";
  serialNumber: string;
  createdAt: string;
  toolName: string;
  toolVersion: string;
  subjectName: string;
  subjectVersion?: string;
  components: NormalizedComponent[];
}

export interface SignatureEnvelope {
  payloadType: string;
  payloadSha256: string;
  keyId: string;
  algorithm: "ed25519";
  signature: string;
  signedAt: string;
}

export interface SbomRecord {
  sbom: NormalizedSbom;
  raw: string;
  sha256: string;
  storageKey?: string;
  signatureEnvelope?: SignatureEnvelope;
}

export interface KevEntry {
  cveId: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  requiredAction?: string;
  dueDate?: string;
  knownRansomwareUse?: string;
  notes?: string;
}

export interface KevSnapshot {
  catalogVersion?: string;
  dateReleased?: string;
  count: number;
  entries: KevEntry[];
  fetchedAt: string;
}

export type MatchConfidence = "high" | "low";

export interface CrossCheckMatch {
  component: NormalizedComponent;
  kevEntry: KevEntry;
  confidence: MatchConfidence;
  matchedOn: "purl_ecosystem_name" | "vendor_product_name";
}

export type SbomSource = "demo" | "upload" | "generated";

export interface StoredSbom {
  id: string;
  record: SbomRecord;
  source: SbomSource;
  ecosystem?: "npm" | "python" | "cyclonedx" | "inventory";
  warnings: string[];
  ingestedAt: string;
}

export interface AlertLogEntry {
  id: string;
  at: string;
  subjectName: string;
  high: number;
  low: number;
  webhookHost?: string;
  status: "sent" | "preview" | "failed";
  text: string;
  error?: string;
}

export type KevSource = "live" | "github" | "fallback";
