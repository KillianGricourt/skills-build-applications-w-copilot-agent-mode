import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'E-mail' },
  { key: 'team', label: 'Équipe' },
]

export default function Users() {
  return <ResourcePage title="Utilisateurs" endpoint="/api/users/" columns={columns} />
}