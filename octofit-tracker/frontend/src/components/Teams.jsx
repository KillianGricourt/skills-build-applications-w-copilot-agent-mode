import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const loadTeams = (signal) => fetch('/api/teams/', signal)

const columns = [
  { key: 'name', label: 'Équipe' },
  { key: 'members', label: 'Membres' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return <ResourcePage title="Équipes" load={loadTeams} columns={columns} />
}