import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'name', label: 'Équipe' },
  { key: 'members', label: 'Membres' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return <ResourcePage title="Équipes" endpoint="/api/teams/" columns={columns} />
}