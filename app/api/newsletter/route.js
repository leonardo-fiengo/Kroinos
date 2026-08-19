const requests = new Map();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const recent = (requests.get(ip) || []).filter((timestamp) => now - timestamp < windowMs);
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 4096) {
    return Response.json({ message: "Richiesta non valida." }, { status: 413 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json({ message: "Troppi tentativi. Riprova più tardi." }, { status: 429 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Richiesta non valida." }, { status: 400 });
  }

  const email = String(payload.email || "").trim().toLowerCase();
  const consent = payload.consent === true;
  const honeypot = String(payload.company || "").trim();

  if (honeypot) {
    return Response.json({ ok: true });
  }

  if (!emailPattern.test(email) || email.length > 254 || !consent) {
    return Response.json({ message: "Controlla l’indirizzo email e il consenso privacy." }, { status: 400 });
  }

  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint) {
    return Response.json(
      { message: "Le iscrizioni sono in preparazione. Riprova presto." },
      { status: 503 }
    );
  }

  const headers = { "Content-Type": "application/json" };
  if (process.env.NEWSLETTER_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${process.env.NEWSLETTER_WEBHOOK_TOKEN}`;
  }

  try {
    const providerResponse = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        source: "kroinos.newsletter",
        consentAt: new Date().toISOString()
      }),
      cache: "no-store"
    });

    if (!providerResponse.ok && providerResponse.status !== 409) {
      throw new Error(`Newsletter provider returned ${providerResponse.status}`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Newsletter signup failed", error);
    return Response.json(
      { message: "Non siamo riusciti a completare l’iscrizione. Riprova tra poco." },
      { status: 502 }
    );
  }
}
