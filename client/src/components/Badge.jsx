export default function Badge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-gray-100 text-gray-700',
    black: 'bg-black text-white',
    outline: 'border border-gray-300 text-gray-600',
    success: 'bg-gray-800 text-white',
    muted: 'bg-gray-50 text-gray-500 border border-gray-200',
  }
  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}
