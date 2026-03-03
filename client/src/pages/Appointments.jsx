import { useState, useEffect } from 'react'
import Topbar from '../components/Topbar'
import Table from '../components/Table'
import Badge from '../components/Badge'
import AppointmentModal from '../components/modals/AppointmentModal'
import ConfirmDelete from '../components/ConfirmDelete'
import { CalendarPlus, Pencil, Trash2 } from 'lucide-react'
import api from '../api/api'

export default function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔥 FETCH FROM BACKEND
  const fetchAppointments = async () => {
    try {
      const res = await api.get('/appointments')
      setAppointments(res.data.content || [])
    } catch (err) {
      console.error('Failed to load appointments', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  // 🔥 CREATE
  const addAppointment = async (data) => {
    try {
      await api.post('/appointments', data)
      fetchAppointments()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  // 🔥 UPDATE
  const updateAppointment = async (id, data) => {
    try {
      await api.put(`/appointments/${id}`, data)
      fetchAppointments()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  // 🔥 DELETE
  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`)
      fetchAppointments()
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
      key: 'appointmentTime',
      label: 'Date & Time',
      render: (r) => (
        <span className="font-medium text-black">
          {new Date(r.appointmentTime).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'patientName',
      label: 'Patient',
      render: (r) => r.patientName ?? '—',
    },
    {
      key: 'doctorName',
      label: 'Doctor',
      render: (r) => (
        <div>
          <p className="font-medium text-black">
            {r.doctorName ?? '—'}
          </p>
          <Badge variant="muted">
            ID: {r.doctorId}
          </Badge>
        </div>
      ),
    },
    {
      key: 'reason',
      label: 'Reason',
      render: (r) => (
        <span className="text-gray-600 text-xs">
          {r.reason || '—'}
        </span>
      ),
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
        Loading appointments...
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <Topbar
        title="Appointments"
        subtitle={`${appointments.length} scheduled`}
      />

      <main className="p-8">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Appointment Records
          </h3>

          <button
            onClick={() => setModal({ mode: 'add' })}
            className="flex items-center gap-2 bg-black text-white text-xs px-4 py-2 rounded hover:bg-gray-800 transition shadow-sm"
          >
            <CalendarPlus size={13} />
            New Appointment
          </button>
        </div>

        <Table columns={columns} data={appointments} />

      </main>

      {modal?.mode === 'add' && (
        <AppointmentModal
          onSave={addAppointment}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.mode === 'edit' && (
        <AppointmentModal
          appointment={modal.item}
          onSave={(data) =>
            updateAppointment(modal.item.id, data)
          }
          onClose={() => setModal(null)}
        />
      )}

      {modal?.mode === 'delete' && (
        <ConfirmDelete
          name={`Appointment #${modal.item.id}`}
          onConfirm={() =>
            deleteAppointment(modal.item.id)
          }
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}