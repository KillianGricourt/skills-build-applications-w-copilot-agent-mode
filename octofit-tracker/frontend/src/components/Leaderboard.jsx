import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const loadLeaderboard = (signal) => fetch('/api/leaderboard/', signal)

const columns = [
  { key: 'user', label: 'Utilisateur' },
  { key: 'team', label: 'Équipe' },
  { key: 'period', label: 'Période' },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  return <ResourcePage title="Classement" load={loadLeaderboard} columns={columns} />
}