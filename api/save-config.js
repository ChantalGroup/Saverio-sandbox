// Vercel Serverless Function: salva la config del Debug Lookdev come commit
// su GitHub (repo/branch/token letti da env var), protetta da SAVE_SECRET.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH, SAVE_SECRET } = process.env;

  if (!SAVE_SECRET) {
    res.status(500).json({ error: 'SAVE_SECRET non configurato sul server' });
    return;
  }
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    res.status(500).json({ error: 'GITHUB_TOKEN o GITHUB_REPO non configurati sul server' });
    return;
  }

  const { secret, config } = req.body || {};

  if (secret !== SAVE_SECRET) {
    res.status(401).json({ error: 'Password non valida' });
    return;
  }
  if (!config || typeof config !== 'object') {
    res.status(400).json({ error: 'Config mancante o non valida' });
    return;
  }

  const branch = GITHUB_BRANCH || 'main';
  const path = 'public/configs/lookdev.json';
  const apiBase = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json'
  };

  try {
    let sha;
    const existing = await fetch(`${apiBase}?ref=${branch}`, { headers });
    if (existing.status === 200) {
      const existingData = await existing.json();
      sha = existingData.sha;
    } else if (existing.status !== 404) {
      const errBody = await existing.text();
      res.status(502).json({ error: `Errore lettura file esistente: ${existing.status} ${errBody}` });
      return;
    }

    const content = Buffer.from(JSON.stringify(config, null, 2)).toString('base64');
    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: 'chore: aggiorna lookdev.json dal Debug Lookdev panel',
        content,
        branch,
        ...(sha ? { sha } : {})
      })
    });

    if (!putRes.ok) {
      const errBody = await putRes.text();
      res.status(502).json({ error: `Errore scrittura su GitHub: ${putRes.status} ${errBody}` });
      return;
    }

    const putData = await putRes.json();
    res.status(200).json({
      ok: true,
      commitUrl: putData.commit && putData.commit.html_url
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
