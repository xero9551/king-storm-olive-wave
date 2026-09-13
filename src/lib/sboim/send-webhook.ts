import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  url: z.string().url(),
  text: z.string().min(1).max(12_000),
});

export const sendWebhook = createServerFn({ method: "POST" })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const parsed = new URL(data.url);
    if (parsed.protocol !== "https:") {
      throw new Error("Webhook URL must be https");
    }

    const res = await fetch(data.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: data.text }),
    });

    if (!res.ok) {
      throw new Error(`Webhook alert failed: HTTP ${res.status} ${res.statusText}`);
    }

    return { ok: true as const, host: parsed.host };
  });
