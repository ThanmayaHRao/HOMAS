import { Bell, Search } from 'lucide-react'

export default function Topbar({ title, subtitle }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      <div>
        <h2 className="text-base font-bold text-black tracking-wide">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 bg-gray-50 shadow-sm">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none text-black placeholder-gray-400 w-36"
          />
        </div>
        <button className="relative p-2 hover:bg-gray-100 rounded transition-colors">
          <Bell size={16} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-black rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
          AD
        </div>
      </div>
    </header>
  )
}
