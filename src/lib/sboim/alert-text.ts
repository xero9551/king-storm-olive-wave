import type { CrossCheckMatch } from "./types";

export function buildAlertText(matches: CrossCheckMatch[], subjectName: string): string {
  if (matches.length === 0) return `${subjectName}: no KEV matches found.`;

  const high = matches.filter((m) => m.confidence === "high");
  const low = matches.filter((m) => m.confidence === "low");

  const lines: string[] = [`*CRA Guard — KEV cross-check: ${subjectName}*`];

  if (high.length > 0) {
    lines.push("", `:red_circle: *${high.length} high-confidence match(es)* — exact package match, review now`);
    for (const m of high.slice(0, 10)) {
      lines.push(
        `• \`${m.component.name}${m.component.version ? "@" + m.component.version : ""}\` — ${m.kevEntry.cveId}: ${m.kevEntry.vulnerabilityName}`,
      );
    }
    if (high.length > 10) lines.push(`• …and ${high.length - 10} more`);
  }

  if (low.length > 0) {
    lines.push("", `:large_orange_circle: *${low.length} low-confidence lead(s)* — name match only, verify before acting`);
    for (const m of low.slice(0, 10)) {
      lines.push(
        `• \`${m.component.name}${m.component.version ? "@" + m.component.version : ""}\` — ${m.kevEntry.cveId}: ${m.kevEntry.vulnerabilityName}`,
      );
    }
    if (low.length > 10) lines.push(`• …and ${low.length - 10} more`);
  }

  return lines.join("\n");
}

export function webhookHost(url: string): string | undefined {
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}
