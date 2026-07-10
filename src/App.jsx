import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LogsPage from './pages/LogsPage'
import DashboardPage from './pages/DashboardPage'
import ConfigPage from './pages/ConfigPage'
import SonPage from './pages/SonPage'
import MdtPage from './pages/MdtPage'
import SettingsPage from './pages/SettingsPage'
import SetupWizard from './pages/SetupWizard'

export default function App() {
  return (
    <Routes>
      {/* ── Onboarding / Setup Wizard (no sidebar/navbar) ── */}
      <Route path="/welcome" element={<SetupWizard />} />

      {/* ── Main application (sidebar + navbar layout) ── */}
      <Route path="/" element={<Layout />}>
        {/* Default: redirect first-time visitors to the wizard */}
        <Route index element={<Navigate to="/welcome" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="logs"      element={<LogsPage />} />
        <Route path="config"    element={<ConfigPage />} />
        {/* Hidden for demo:
        <Route path="son"       element={<SonPage />} />
        <Route path="mdt"       element={<MdtPage />} />
        */}
        <Route path="settings"  element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
