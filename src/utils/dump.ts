import { dataStorage } from "$lib/storage.server";
import { snapshot } from "unstorage";

const data = await snapshot(dataStorage, "");

function sanitize(value: any, key?: string, visited = new WeakSet()): any {
	// primitives
	if (value == null) return value;
	if (typeof value === "string") {
		// data URI with explicit base64
		if (/^data:.*;base64,/.test(value)) return "[BASE64 DATA REMOVED]";

		// plain-looking base64 (no prefix) and very long
		if (/^[A-Za-z0-9+/=\s]+$/.test(value) && value.replace(/\s+/g, "").length > 200) {
			return "[BASE64 DATA REMOVED]";
		}

		// short strings under suspicious keys (like 'base64' or 'data')
		if (key && /(base64|b64|data|image|blob|content|file)/i.test(key) && value.length > 50) {
			return "[POTENTIAL BINARY DATA REMOVED]";
		}

		return value;
	}

	if (typeof value === "number" || typeof value === "boolean") return value;

	// detect Buffer/Uint8Array-like
	if (typeof globalThis !== "undefined") {
		try {
			if (typeof (globalThis as any).Buffer !== "undefined" && value instanceof (globalThis as any).Buffer) {
				return "[BINARY BUFFER REMOVED]";
			}
		} catch (e) {
			// ignore
		}
	}

	if (value instanceof Uint8Array) return "[BINARY DATA REMOVED]";

	if (Array.isArray(value)) {
		return value.map((v, i) => sanitize(v, String(i), visited));
	}

	if (typeof value === "object") {
		if (visited.has(value)) return "[CIRCULAR]";
		visited.add(value);

		// some Buffer serialized shapes: { type: 'Buffer', data: [...] }
		if (
			(value as any).type === "Buffer" && Array.isArray((value as any).data)
		) {
			return "[BINARY BUFFER REMOVED]";
		}

		const out: Record<string, any> = {};
		for (const k of Object.keys(value)) {
			out[k] = sanitize((value as any)[k], k, visited);
		}
		return out;
	}

	return value;
}

console.log(JSON.stringify(sanitize(data), null, 2));
