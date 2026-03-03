import Modal from './Modal'

export default function ConfirmDelete({ name, onConfirm, onClose }) {
  return (
    <Modal title="Confirm Delete" onClose={onClose}>
      <p className="text-sm text-gray-700 mb-1">
        Are you sure you want to delete <span className="font-semibold text-black">{name}</span>?
      </p>
      <p className="text-xs text-gray-400 mb-6">This action cannot be undone.</p>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => { onConfirm(); onClose() }}
          className="px-5 py-2 text-xs bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}
