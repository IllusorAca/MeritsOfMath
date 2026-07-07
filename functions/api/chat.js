// Cloudflare Pages Function — serves at /api/chat
//
// Holds the Groq API key server-side so the browser never sees it. The frontend
// (js/aiTutor.js) POSTs the same OpenAI-style { messages, temperature, max_tokens }
// body it would send to Groq directly; this function injects the key and forwards it.
//
// Required env var (set in the Cloudflare Pages dashboard → Settings → Environment variables):
//   GROQ_API_KEY   your Groq secret key (gsk_...)
// Optional env vars:
//   GROQ_MODEL     override the pinned model (default: llama-3.1-8b-instant)
//   ALLOWED_ORIGIN e.g. https://meritsofmath.pages.dev — soft-blocks other origins

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.1-8b-instant';
const MAX_TOKENS_CAP = 300;   // hard ceiling so a leaked endpoint can't run up huge bills
const MAX_MESSAGES = 40;      // cap conversation size per request

export async function onRequestPost({ request, env }) {
    // Soft origin check — cheap abuse deterrent, not real auth.
    const allowed = env.ALLOWED_ORIGIN;
    const origin = request.headers.get('Origin');
    if (allowed && origin && origin !== allowed) {
        return json({ error: { message: 'Origin not allowed' } }, 403);
    }

    if (!env.GROQ_API_KEY) {
        return json({ error: { message: 'Server is missing GROQ_API_KEY' } }, 500);
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return json({ error: { message: 'Invalid JSON body' } }, 400);
    }

    const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : null;
    if (!messages || messages.length === 0) {
        return json({ error: { message: 'messages[] is required' } }, 400);
    }

    // Pin the model and cap tokens server-side; ignore client attempts to override.
    const payload = {
        model: env.GROQ_MODEL || DEFAULT_MODEL,
        messages,
        temperature: typeof body.temperature === 'number' ? body.temperature : 0.1,
        max_tokens: Math.min(Number(body.max_tokens) || 150, MAX_TOKENS_CAP)
    };

    let upstream;
    try {
        upstream = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.GROQ_API_KEY}`
            },
            body: JSON.stringify(payload)
        });
    } catch {
        return json({ error: { message: 'Upstream AI request failed' } }, 502);
    }

    // Pass Groq's response straight through — it's already the shape aiTutor.js expects.
    const text = await upstream.text();
    return new Response(text, {
        status: upstream.status,
        headers: { 'Content-Type': 'application/json' }
    });
}

// Non-POST methods receive Cloudflare's automatic 405 (no handler defined for them).

function json(obj, status = 200) {
    return new Response(JSON.stringify(obj), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}
