import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'type', label: 'Activité' },
  { key: 'user', label: 'Utilisateur' },
  { key: 'durationMinutes', label: 'Durée (min)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'points', label: 'Points' },
  { key: 'completedAt', label: 'Terminée le' },
]

export default function Activities() {
  return <ResourcePage title="Activités" endpoint="/api/activities/" columns={columns} />
}