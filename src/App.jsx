import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LogsPage from './pages/LogsPage'
import DashboardPage from './pages/DashboardPage'
import ConfigPage from './pages/ConfigPage'
import SonPage from './pages/SonPage'
import MdtPage from './pages/MdtPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Default redirect to /logs */}
        <Route index element={<Navigate to="/logs" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="config" element={<ConfigPage />} />
        <Route path="son" element={<SonPage />} />
        <Route path="mdt" element={<MdtPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
