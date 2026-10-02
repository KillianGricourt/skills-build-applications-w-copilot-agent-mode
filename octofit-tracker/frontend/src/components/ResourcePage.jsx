import { useEffect, useState } from 'react'

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) {
    return value.length ? value.map(formatValue).join(', ') : '—'
  }
  if (typeof value === 'object') {
    return formatValue(value.name ?? value.username ?? value.email ?? value._id)
  }
  return String(value)
}

export default function ResourcePage({ title, load, columns }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    load(controller.signal)
      .then((results) => {
        setItems(results)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return
        setError(requestError.message || 'Impossible de charger les données.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [load])

  return (
    <section className="section-view" aria-labelledby="resource-title">
      <p className="eyebrow">OCTOFIT / TRACKER</p>
      <h1 id="resource-title">{title}</h1>
      {status === 'loading' && <p className="mt-4" role="status">Chargement…</p>}
      {status === 'error' && <div className="alert alert-danger mt-4" role="alert">{error}</div>}
      {status === 'ready' && items.length === 0 && (
        <div className="empty-state">
          <span className="empty-state-mark" aria-hidden="true">—</span>
          <p>Aucun élément à afficher pour le moment.</p>
        </div>
      )}
      {status === 'ready' && items.length > 0 && (
        <div className="table-responsive mt-4">
          <table className="table table-hover align-middle bg-white">
            <thead>
              <tr>{columns.map(({ key, label }) => <th key={key} scope="col">{label}</th>)}</tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map(({ key }) => <td key={key}>{formatValue(item[key])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}