import { useState, useEffect } from 'react'
import Topbar from '../components/Topbar'
import Badge from '../components/Badge'
import DepartmentModal from '../components/modals/DepartmentModal'
import ConfirmDelete from '../components/ConfirmDelete'
import { Building2, Pencil, Trash2 } from 'lucide-react'
import api from '../api/api'

export default function Departments() {

  const [departments, setDepartments] = useState([])
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await api.get('/departments')
      setDepartments(res.data || [])
    } catch (err) {
      console.error("Failed to load departments", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addDepartment = async (data) => {
    try {
      await api.post('/departments', data)
      fetchData()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  const updateDepartment = async (id, data) => {
    try {
      await api.put(`/departments/${id}`, data)
      fetchData()
      setModal(null);
      return { id, ...data }
    } catch (err) {
      console.error(err);
    }
  }

  const deleteDepartment = async (id) => {
    try {
      await api.delete(`/departments/${id}`)
      fetchData()
      setModal(null)
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading departments...
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <Topbar
        title="Departments"
        subtitle={`${departments.length} departments`}
      />

      <main className="p-8">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Hospital Departments
          </h3>

          <button
            onClick={() => setModal({ mode: 'add' })}
            className="flex items-center gap-2 bg-black text-white text-xs px-4 py-2 rounded hover:bg-gray-800 transition shadow-sm"
          >
            <Building2 size={13} />
            Add Department
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 bg-white"
            >

              {/* Header */}
              <div className="flex items-start justify-between mb-4">

                <div>
                  <h4 className="text-lg font-bold text-black">
                    {dept.name}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    Head Doctor:
                    <span className="font-medium text-gray-800 ml-1">
                      {dept.headDoctor || 'Not Assigned'}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="black">
                    {dept.doctors?.length || 0} Doctors
                  </Badge>

                  <button
                    onClick={() =>
                      setModal({ mode: 'edit', item: dept })
                    }
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-black transition"
                  >
                    <Pencil size={13} />
                  </button>

                  <button
                    onClick={() =>
                      setModal({ mode: 'delete', item: dept })
                    }
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black transition"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Doctors List */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-semibold">
                  Staff
                </p>

                <div className="flex flex-wrap gap-2">
                  {dept.doctors && dept.doctors.length > 0 ? (
                    dept.doctors.map((docName, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200"
                      >
                        {docName}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      No doctors assigned
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>

      {modal?.mode === 'add' &&
        <DepartmentModal
          onSave={addDepartment}
          onClose={() => setModal(null)}
        />
      }

      {modal?.mode === 'edit' &&
        <DepartmentModal
          department={modal.item}
          onSave={(d) =>
            updateDepartment(modal.item.id, d)
          }
          onClose={() => setModal(null)}
        />
      }

      {modal?.mode === 'delete' &&
        <ConfirmDelete
          name={modal.item.name}
          onConfirm={() =>
            deleteDepartment(modal.item.id)
          }
          onClose={() => setModal(null)}
        />
      }

    </div>
  )
}