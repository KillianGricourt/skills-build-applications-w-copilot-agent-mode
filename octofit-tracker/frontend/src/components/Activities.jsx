import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const loadActivities = (signal) => fetch('/api/activities/', signal)

const columns = [
  { key: 'type', label: 'Activité' },
  { key: 'user', label: 'Utilisateur' },
  { key: 'durationMinutes', label: 'Durée (min)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'points', label: 'Points' },
  { key: 'completedAt', label: 'Terminée le' },
]

export default function Activities() {
  return <ResourcePage title="Activités" load={loadActivities} columns={columns} />
}