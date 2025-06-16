import { Link, Route, Routes } from 'react-router-dom'
import CrewList from './components/CrewList'
import ProfilePage from './pages/ProfilePage'
import RecruitPage from './pages/RecruitPage'
import ParcelsPage from './pages/ParcelsPage'
import TrainPage from './pages/TrainPage'
import DeployPage from './pages/DeployPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import RequireAuth from './RequireAuth'

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/recruit">Recruit</Link></li>
          <li><Link to="/parcels/1">Parcels</Link></li>
          <li><Link to="/train">Train</Link></li>
          <li><Link to="/deploy">Deploy</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CrewList />} />
        <Route
          path="/profile"
          element={(
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/recruit"
          element={(
            <RequireAuth>
              <RecruitPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/parcels/:id"
          element={(
            <RequireAuth>
              <ParcelsPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/train"
          element={(
            <RequireAuth>
              <TrainPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/deploy"
          element={(
            <RequireAuth>
              <DeployPage />
            </RequireAuth>
          )}
        />
      </Routes>
    </>
  )
}

export default App
