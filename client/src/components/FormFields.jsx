export function Field({ label, error, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-1">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}

const base =
  'w-full border border-gray-200 rounded px-3 py-2 text-sm text-black bg-white outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400'

export function Input({ ...props }) {
  return <input className={base} {...props} />
}

export function Select({ children, ...props }) {
  return (
    <select className={base} {...props}>
      {children}
    </select>
  )
}

export function Textarea({ ...props }) {
  return <textarea className={`${base} resize-none`} rows={3} {...props} />
}

export function FormActions({ onCancel, submitLabel = 'Save' }) {
  return (
    <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-5 py-2 text-xs bg-black text-white rounded hover:bg-gray-800 transition-colors shadow-sm"
      >
        {submitLabel}
      </button>
    </div>
  )
}
