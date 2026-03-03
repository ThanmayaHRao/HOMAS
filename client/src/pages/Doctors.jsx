import { useState, useEffect } from 'react'
import Topbar from '../components/Topbar'
import Table from '../components/Table'
import Badge from '../components/Badge'
import DoctorModal from '../components/modals/DoctorModal'
import ConfirmDelete from '../components/ConfirmDelete'
import { UserPlus, Pencil, Trash2 } from 'lucide-react'
import api from '../api/api'

export default function Doctors() {

  const [doctors, setDoctors] = useState([])
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔥 Fetch from backend
  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors')
      setDoctors(res.data || [])
    } catch (err) {
      console.error('Failed to load doctors', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  // 🔥 CREATE
  const addDoctor = async (data) => {
    try {
      await api.post('/doctors', data)
      fetchDoctors()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  // 🔥 UPDATE
  const updateDoctor = async (id, data) => {
    try {
      await api.put(`/doctors/${id}`, data)
      fetchDoctors()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  // 🔥 DELETE
  const deleteDoctor = async (id) => {
    try {
      await api.delete(`/doctors/${id}`)
      fetchDoctors()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  const columns = [
    {
      key: 'id',
      label: '#',
      render: (r) => (
        <span className="text-gray-400 font-mono text-xs">
          {r.id}
        </span>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      render: (r) => (
        <span className="font-semibold text-black">
          {r.name}
        </span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'specialization',
      label: 'Specialization',
      render: (r) => (
        <Badge variant="outline">
          {r.specialization || '—'}
        </Badge>
      ),
    },
    {
      key: 'departmentName',
      label: 'Department',
      render: (r) => r.departmentName ?? '—',
    },
    {
      key: 'actions',
      label: '',
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModal({ mode: 'edit', item: r })}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-black transition"
          >
            <Pencil size={13} />
          </button>

          <button
            onClick={() => setModal({ mode: 'delete', item: r })}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black transition"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading doctors...
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <Topbar
        title="Doctors"
        subtitle={`${doctors.length} active doctors`}
      />

      <main className="p-8">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Medical Staff
          </h3>

          <button
            onClick={() => setModal({ mode: 'add' })}
            className="flex items-center gap-2 bg-black text-white text-xs px-4 py-2 rounded hover:bg-gray-800 transition shadow-sm"
          >
            <UserPlus size={13} />
            Add Doctor
          </button>
        </div>

        <Table columns={columns} data={doctors} />

      </main>

      {modal?.mode === 'add' && (
        <DoctorModal
          onSave={addDoctor}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.mode === 'edit' && (
        <DoctorModal
          doctor={modal.item}
          onSave={(data) =>
            updateDoctor(modal.item.id, data)
          }
          onClose={() => setModal(null)}
        />
      )}

      {modal?.mode === 'delete' && (
        <ConfirmDelete
          name={modal.item.name}
          onConfirm={() =>
            deleteDoctor(modal.item.id)
          }
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}