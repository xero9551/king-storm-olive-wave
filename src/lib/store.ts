import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoSboms } from "./sboim/demo-data";
import { toCycloneDxJson } from "./sboim/generate";
import { sha256Hex } from "./sboim/hash";
import type { AlertLogEntry, NormalizedSbom, SbomSource, StoredSbom } from "./sboim/types";

interface SboimState {
  sboms: StoredSbom[];
  webhookUrl: string;
  failOnHigh: boolean;
  alerts: AlertLogEntry[];
  hydrated: boolean;
  ingestSbom: (opts: {
    sbom: NormalizedSbom;
    source: SbomSource;
    ecosystem?: StoredSbom["ecosystem"];
    warnings?: string[];
    raw?: string;
  }) => Promise<string>;
  removeSbom: (id: string) => void;
  setWebhookUrl: (url: string) => void;
  setFailOnHigh: (v: boolean) => void;
  logAlert: (entry: Omit<AlertLogEntry, "id">) => void;
  resetDemo: () => void;
}

export const useSboimStore = create<SboimState>()(
  persist(
    (set, get) => ({
      sboms: demoSboms(),
      webhookUrl: "",
      failOnHigh: true,
      alerts: [],
      hydrated: false,
      ingestSbom: async ({ sbom, source, ecosystem, warnings = [], raw }) => {
        const json = raw ?? toCycloneDxJson(sbom);
        const sha256 = await sha256Hex(json);
        const id = crypto.randomUUID();
        const stored: StoredSbom = {
          id,
          source,
          ecosystem,
          warnings,
          ingestedAt: new Date().toISOString(),
          record: { sbom, raw: json, sha256 },
        };
        set({ sboms: [stored, ...get().sboms] });
        return id;
      },
      removeSbom: (id) => set({ sboms: get().sboms.filter((s) => s.id !== id) }),
      setWebhookUrl: (url) => set({ webhookUrl: url }),
      setFailOnHigh: (v) => set({ failOnHigh: v }),
      logAlert: (entry) =>
        set({
          alerts: [{ ...entry, id: crypto.randomUUID() }, ...get().alerts].slice(0, 50),
        }),
      resetDemo: () => set({ sboms: demoSboms(), alerts: [] }),
    }),
    {
      name: "sboim-dashboard",
      partialize: (s) => ({
        sboms: s.sboms,
        webhookUrl: s.webhookUrl,
        failOnHigh: s.failOnHigh,
        alerts: s.alerts,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
