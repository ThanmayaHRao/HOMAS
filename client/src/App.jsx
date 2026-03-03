import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Doctors from './pages/Doctors'
import Departments from './pages/Departments'
import Appointments from './pages/Appointments'
import Insurance from './pages/Insurance'

export default function App() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/insurance" element={<Insurance />} />
        </Routes>
      </div>
    </div>
  )
}
