import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const loadWorkouts = (signal) => fetch('/api/workouts/', signal)

const columns = [
  { key: 'name', label: 'Entraînement' },
  { key: 'category', label: 'Catégorie' },
  { key: 'description', label: 'Description' },
  { key: 'durationMinutes', label: 'Durée (min)' },
  { key: 'difficulty', label: 'Difficulté' },
]

export default function Workouts() {
  return <ResourcePage title="Entraînements" load={loadWorkouts} columns={columns} />
}