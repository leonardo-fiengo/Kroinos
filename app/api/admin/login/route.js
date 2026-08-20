import { createAdminSession, isAdminConfigured, verifyAdminKey } from "@/lib/admin-auth";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = globalThis.__kroinosAdminAttempts || new Map();
globalThis.__kroinosAdminAttempts = attempts;

function clientIdentifier(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "local";
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request) {
  if (!sameOrigin(request)) {
    return Response.json({ error: "Origine della richiesta non valida." }, { status: 403 });
  }

  if (!isAdminConfigured()) {
    return Response.json(
      { error: "L’accesso amministratore non è configurato sul server." },
      { status: 503 }
    );
  }

  const identifier = clientIdentifier(request);
  const now = Date.now();
  if (attempts.size > 500) {
    for (const [key, value] of attempts) {
      if (value.resetAt <= now) attempts.delete(key);
    }
  }
  const record = attempts.get(identifier);

  if (record && record.resetAt > now && record.count >= MAX_ATTEMPTS) {
    return Response.json(
      { error: "Troppi tentativi. Riprova tra 15 minuti." },
      { status: 429, headers: { "Retry-After": "900" } }
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 4096) {
    return Response.json({ error: "La richiesta di accesso è troppo grande." }, { status: 413 });
  }

  const rawBody = await request.text();
  if (rawBody.length > 4096) {
    return Response.json({ error: "La richiesta di accesso è troppo grande." }, { status: 413 });
  }
  const body = (() => {
    try { return JSON.parse(rawBody); } catch { return {}; }
  })();
  if (!verifyAdminKey(body.key)) {
    const nextRecord = record && record.resetAt > now
      ? { count: record.count + 1, resetAt: record.resetAt }
      : { count: 1, resetAt: now + WINDOW_MS };
    attempts.set(identifier, nextRecord);
    return Response.json({ error: "Chiave di accesso non riconosciuta." }, { status: 401 });
  }

  attempts.delete(identifier);
  createAdminSession();
  return Response.json({ ok: true });
}
