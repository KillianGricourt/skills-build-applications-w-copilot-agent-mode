import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'user', label: 'Utilisateur' },
  { key: 'team', label: 'Équipe' },
  { key: 'period', label: 'Période' },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  return <ResourcePage title="Classement" endpoint="/api/leaderboard/" columns={columns} />
}