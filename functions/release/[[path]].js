// Keep large portable downloads out of the Git repository.
// Only the known public release files can be fetched through this route.
export async function onRequestGet(context) {
  const segments = context.params.path;
  const path = Array.isArray(segments) ? segments.join('/') : String(segments || '');
  if (!/^(manifest\.json|part-\d{2}\.bin)$/.test(path)) {
    return new Response('Not found', { status: 404 });
  }
  try {
    const upstream = await fetch(`https://instacourse.gaiqi7564.chatgpt.site/release/${path}`, {
      redirect: 'error',
    });
    if (!upstream.ok) return new Response('Release temporarily unavailable', { status: 502 });
    const type = upstream.headers.get('content-type') || '';
    if (type.includes('text/html')) return new Response('Release source unavailable', { status: 502 });
    const headers = new Headers({
      'Content-Type': path.endsWith('.json') ? 'application/json; charset=utf-8' : 'application/octet-stream',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    });
    return new Response(upstream.body, { headers });
  } catch {
    return new Response('Release temporarily unavailable', { status: 502 });
  }
}
