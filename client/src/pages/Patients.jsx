import { useState, useEffect } from 'react'
import Topbar from '../components/Topbar'
import Table from '../components/Table'
import Badge from '../components/Badge'
import PatientModal from '../components/modals/PatientModal'
import ConfirmDelete from '../components/ConfirmDelete'
import { UserPlus, Pencil, Trash2 } from 'lucide-react'
import api from '../api/api'

export default function Patients() {

  const [patients, setPatients] = useState([])
  const [insurances, setInsurances] = useState([])
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchPatients = async () => {
    try {
      const [pRes, iRes] = await Promise.all([
        api.get('/patients'),
        api.get('/insurance')
      ])

      setPatients(pRes.data.content?.sort((a, b) => a.id - b.id) || [])
      setInsurances(iRes.data || [])

    } catch (err) {
      console.error('Failed to load data', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients();
  }, [])

  const addPatient = async (data) => {
    try {
      await api.post('/patients', data)
      fetchPatients()
      setModal(null)
    } catch (err) {
      console.error(err);
      console.log(err.error)
    }
  }

  const updatePatient = async (id, data) => {
    try {
      await api.put(`/patients/${id}`, data)
      fetchPatients()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  const deletePatient = async (id) => {
    try {
      await api.delete(`/patients/${id}`)
      fetchPatients()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  const columns = [
    {
      key: 'id',
      label: '#',
      render: (r,index) => (
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
      key: 'gender',
      label: 'Gender',
    },
    {
      key: 'bloodGroup',
      label: 'Blood Group',
      render: (r) => (
        <Badge variant="black">
          {r.bloodGroup || '—'}
        </Badge>
      ),
    },

    // 🔥 INSURANCE COLUMN (OPTION B LOGIC)
    {
      key: 'insurance',
      label: 'Insurance',
      render: (r) => {
        const insurance = insurances.find(
          (i) => i.patientId === r.id
        )

        return insurance
          ? insurance.policyNumber
          : '—'
      },
    },

    {
      key: 'createdAt',
      label: 'Registered',
      render: (r) =>
        r.createdAt
          ? new Date(r.createdAt).toLocaleDateString()
          : '—',
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
        Loading patients...
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <Topbar
        title="Patients"
        subtitle={`${patients.length} registered patients`}
      />

      <main className="p-8">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Patient Registry
          </h3>

          <button
            onClick={() => setModal({ mode: 'add' })}
            className="flex items-center gap-2 bg-black text-white text-xs px-4 py-2 rounded hover:bg-gray-800 transition shadow-sm"
          >
            <UserPlus size={13} />
            Add Patient
          </button>
        </div>

        <Table columns={columns} data={patients} />

      </main>

      {modal?.mode === 'add' && (
        <PatientModal
          onSave={addPatient}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.mode === 'edit' && (
        <PatientModal
          patient={modal.item}
          onSave={(data) =>
            updatePatient(modal.item.id, data)
          }
          onClose={() => setModal(null)}
        />
      )}

      {modal?.mode === 'delete' && (
        <ConfirmDelete
          name={modal.item.name}
          onConfirm={() =>
            deletePatient(modal.item.id)
          }
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}