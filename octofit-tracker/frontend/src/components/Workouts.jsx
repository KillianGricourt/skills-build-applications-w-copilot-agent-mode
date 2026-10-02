import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'name', label: 'Entraînement' },
  { key: 'category', label: 'Catégorie' },
  { key: 'description', label: 'Description' },
  { key: 'durationMinutes', label: 'Durée (min)' },
  { key: 'difficulty', label: 'Difficulté' },
]

export default function Workouts() {
  return <ResourcePage title="Entraînements" endpoint="/api/workouts/" columns={columns} />
}