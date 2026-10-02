import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const sections = [
  { label: 'Vue d’ensemble', path: '/' },
  { label: 'Activités', path: '/activities' },
  { label: 'Équipes', path: '/teams' },
  { label: 'Classement', path: '/leaderboard' },
  { label: 'Utilisateurs', path: '/users' },
  { label: 'Entraînements', path: '/workouts' },
]

function Overview() {
  return (
    <section className="overview-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT / TRACKER</p>
          <h1>Vue d’ensemble</h1>
        </div>
      </div>
      <div className="overview-content">
        <section className="activity-summary" aria-labelledby="activity-title">
          <p className="eyebrow">BIENVENUE</p>
          <h2 id="activity-title">Votre progression commence ici</h2>
          <p>Consultez vos activités, les équipes et les entraînements disponibles.</p>
          <div className="summary-stats">
            <div><strong>05</strong><span>Ressources suivies</span></div>
            <div><strong>01</strong><span>Tableau de classement</span></div>
            <div><strong>24/7</strong><span>À votre rythme</span></div>
          </div>
        </section>
        <aside className="setup-note">
          <span className="note-mark" aria-hidden="true">+</span>
          <div>
            <p className="eyebrow">À EXPLORER</p>
            <h2>Choisissez votre prochaine étape</h2>
            <p>Suivez les résultats et trouvez un entraînement adapté à votre routine.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="section-view">
      <p className="eyebrow">OCTOFIT / TRACKER</p>
      <h1>Page introuvable</h1>
      <Link className="btn btn-outline-success mt-4" to="/">Retour à l’accueil</Link>
    </section>
  )
}

export default function App() {
  return (
    <div className="tracker-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="OctoFit Tracker, accueil">
          <img src="/octofitapp-small.png" alt="" />
          <span>OctoFit <b>Tracker</b></span>
        </Link>
        <nav className="primary-nav" aria-label="Navigation principale">
          {sections.map(({ label, path }) => (
            <NavLink key={path} to={path} end={path === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <span className="profile-mark" aria-label="Profil">OF</span>
      </header>
      <main className="container-fluid tracker-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}