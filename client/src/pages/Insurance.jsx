import { useState, useEffect } from 'react'
import Topbar from '../components/Topbar'
import Table from '../components/Table'
import Badge from '../components/Badge'
import InsuranceModal from '../components/modals/InsuranceModal'
import ConfirmDelete from '../components/ConfirmDelete'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import api from '../api/api'

export default function Insurance() {

  const [insurances, setInsurances] = useState([])
  const [patients, setPatients] = useState([])
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [iRes, pRes] = await Promise.all([
        api.get('/insurance'),
        api.get('/patients')
      ])

      setInsurances(iRes.data || [])
      setPatients(pRes.data.content || [])
    } catch (err) {
      console.error('Failed to load insurance', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  // CREATE
  const addInsurance = async (data) => {
    try {
      await api.post('/insurance', data)
      fetchData()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  // UPDATE
  
 const updateInsurance = async (id, data) => {
  try {
    console.log("before")

    const response = await api.put(
      `/insurance/${id}/assign/${data.patientId}`
    )

    console.log("after")
    console.log(response.data)

    setModal(null)
    fetchData()

  } catch (error) {

    console.error("Full error object:", error)

    if (error.response) {
      console.log("Backend response body:", error.response.data)

      alert(
        error.response.data.message || 
        "Failed to assign insurance"
      )
    } else {
      alert("Server not responding")
    }
  }
}

  // DELETE
  const deleteInsurance = async (id) => {
    try {
      await api.delete(`/insurance/${id}`)
      fetchData()
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
      key: 'policyNumber',
      label: 'Policy No.',
      render: (r) => (
        <span className="font-semibold text-black">
          {r.policyNumber}
        </span>
      ),
    },
    {
      key: 'patient',
      label: 'Patient',
      render: (r) => {
        const patient = patients.find(
          (p) => p.id === r.patientId
        )
        return patient?.name || '—'
      }
    },
    {
      key: 'validUntil',
      label: 'Valid Until',
      render: (r) =>
        r.validUntil
          ? new Date(r.validUntil).toLocaleDateString()
          : '—',
    },
    {
      key: 'status',
      label: 'Status',
      render: (r) => {
        const active =
          r.validUntil &&
          new Date(r.validUntil) >= new Date()

        return active
          ? <Badge variant="black">Active</Badge>
          : <Badge variant="muted">Expired</Badge>
      }
    },
    {
      key: 'actions',
      label: '',
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setModal({ mode: 'edit', item: r })
            }
            className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-black transition"
          >
            <Pencil size={13} />
          </button>

          <button
            onClick={() =>
              setModal({ mode: 'delete', item: r })
            }
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
        Loading insurance...
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <Topbar
        title="Insurance"
        subtitle={`${insurances.length} policies`}
      />

      <main className="p-8">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Insurance Policies
          </h3>

          <button
            onClick={() => setModal({ mode: 'add' })}
            className="flex items-center gap-2 bg-black text-white text-xs px-4 py-2 rounded hover:bg-gray-800 transition shadow-sm"
          >
            <Plus size={13} />
            Add Insurance
          </button>
        </div>

        <Table columns={columns} data={insurances} />

      </main>

      {modal?.mode === 'add' && (
        <InsuranceModal
          patients={patients}
          onSave={addInsurance}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.mode === 'edit' && (
        <InsuranceModal
          insurance={modal.item}
          patients={patients}
          onSave={(data) =>
            updateInsurance(modal.item.id, data)
          }
          onClose={() => setModal(null)}
        />
      )}

      {modal?.mode === 'delete' && (
        <ConfirmDelete
          name={`Policy ${modal.item.policyNumber}`}
          onConfirm={() =>
            deleteInsurance(modal.item.id)
          }
          onClose={() => setModal(null)}
        />
      )}

    </div>
  )
}