const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(`${apiBase}${endpoint}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`La requête a échoué (${response.status}).`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data

  throw new Error('Le format de réponse de l’API est invalide.')
}