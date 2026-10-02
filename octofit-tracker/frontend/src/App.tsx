import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const sections = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Teams', path: '/teams' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]

type ApiStatus = 'checking' | 'online' | 'offline'

function Overview() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking')

  useEffect(() => {
    let isCurrent = true

    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      })
      .then(() => {
        if (isCurrent) setApiStatus('online')
      })
      .catch(() => {
        if (isCurrent) setApiStatus('offline')
      })

    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <section className="overview-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT / TRACKER</p>
          <h1>Overview</h1>
        </div>
        <span className={`api-status api-status--${apiStatus}`}>
          <span className="status-indicator" />
          API {apiStatus}
        </span>
      </div>
      <div className="overview-content">
        <section className="activity-summary" aria-labelledby="activity-title">
          <p className="eyebrow">TODAY</p>
          <h2 id="activity-title">A fresh start</h2>
          <p>Your activity summary will appear here once you log a workout.</p>
          <div className="summary-stats">
            <div><strong>0</strong><span>Activities</span></div>
            <div><strong>0 <small>min</small></strong><span>Active time</span></div>
            <div><strong>0</strong><span>Points</span></div>
          </div>
        </section>
        <aside className="setup-note">
          <span className="note-mark" aria-hidden="true">+</span>
          <div>
            <p className="eyebrow">NEXT UP</p>
            <h2>Build your routine</h2>
            <p>Activity tracking, teams, and personalized workouts are ready to take shape.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

function SectionView({ title }: { title: string }) {
  return (
    <section className="section-view">
      <p className="eyebrow">OCTOFIT / TRACKER</p>
      <h1>{title}</h1>
      <div className="empty-state">
        <span className="empty-state-mark" aria-hidden="true">—</span>
        <p>No {title.toLowerCase()} to show yet.</p>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="tracker-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="OctoFit Tracker overview">
          <img src="/octofitapp-small.png" alt="" />
          <span>OctoFit <b>Tracker</b></span>
        </Link>
        <nav className="primary-nav" aria-label="Main navigation">
          {sections.map(({ label, path }) => (
            <NavLink key={path} to={path} end={path === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <span className="profile-mark" aria-label="Profile">OF</span>
      </header>
      <main className="container-fluid tracker-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<SectionView title="Activities" />} />
          <Route path="/teams" element={<SectionView title="Teams" />} />
          <Route path="/leaderboard" element={<SectionView title="Leaderboard" />} />
          <Route path="/workouts" element={<SectionView title="Workouts" />} />
          <Route path="*" element={<SectionView title="Overview" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
