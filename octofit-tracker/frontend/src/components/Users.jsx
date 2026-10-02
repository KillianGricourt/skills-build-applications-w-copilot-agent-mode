import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const loadUsers = (signal) => fetch('/api/users/', signal)

const columns = [
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'E-mail' },
  { key: 'team', label: 'Équipe' },
]

export default function Users() {
  return <ResourcePage title="Utilisateurs" load={loadUsers} columns={columns} />
}