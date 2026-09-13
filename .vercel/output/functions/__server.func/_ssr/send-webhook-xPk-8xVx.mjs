import { t as createServerFn } from "./ssr.mjs";
import { a as string, i as object } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/send-webhook-xPk-8xVx.js
var inputSchema = object({
	url: string().url(),
	text: string().min(1).max(12e3)
});
var sendWebhook_createServerFn_handler = createServerRpc({
	id: "768a2195be0112a6ae56f9633c77dcf914456d1bb9f8e138d1409a813e64132b",
	name: "sendWebhook",
	filename: "src/lib/sboim/send-webhook.ts"
}, (opts) => sendWebhook.__executeServer(opts));
var sendWebhook = createServerFn({ method: "POST" }).validator((data) => inputSchema.parse(data)).handler(sendWebhook_createServerFn_handler, async ({ data }) => {
	const parsed = new URL(data.url);
	if (parsed.protocol !== "https:") throw new Error("Webhook URL must be https");
	const res = await fetch(data.url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ text: data.text })
	});
	if (!res.ok) throw new Error(`Webhook alert failed: HTTP ${res.status} ${res.statusText}`);
	return {
		ok: true,
		host: parsed.host
	};
});
//#endregion
export { sendWebhook_createServerFn_handler };
