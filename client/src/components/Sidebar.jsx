import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Building2,
  CalendarClock,
  ShieldCheck,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/patients', icon: Users, label: 'Patients' },
  { to: '/doctors', icon: Stethoscope, label: 'Doctors' },
  { to: '/departments', icon: Building2, label: 'Departments' },
  { to: '/appointments', icon: CalendarClock, label: 'Appointments' },
  { to: '/insurance', icon: ShieldCheck, label: 'Insurance' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col shadow-md">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-xl font-bold tracking-widest text-black uppercase">HOMAS</h1>
        <p className="text-xs text-gray-500 mt-0.5 tracking-wide">Hospital Management System</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-black'
              }`
            }
          >
            <Icon size={16} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">v1.0.0 &nbsp;·&nbsp; Spring Boot</p>
      </div>
    </aside>
  )
}
