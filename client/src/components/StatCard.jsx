export default function StatCard({ label, value, icon: Icon, sub }) {
  return (
    <div className="bg-white border border-gray-200 rounded p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">{label}</p>
          <p className="text-3xl font-bold text-black mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        {Icon && (
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center shadow-inner">
            <Icon size={18} className="text-gray-600" />
          </div>
        )}
      </div>
    </div>
  )
}
