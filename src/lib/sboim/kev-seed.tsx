import { createContext, useContext, type ReactNode } from "react";
import type { PollKevResult } from "./poll-kev";

const KevSeedContext = createContext<PollKevResult | undefined>(undefined);

export function KevSeedProvider({
  value,
  children,
}: {
  value: PollKevResult | undefined;
  children: ReactNode;
}) {
  return <KevSeedContext.Provider value={value}>{children}</KevSeedContext.Provider>;
}

export function useKevSeed(): PollKevResult | undefined {
  return useContext(KevSeedContext);
}
