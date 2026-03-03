import { useState, useEffect } from 'react'
import Modal from '../Modal'
import { Field, Input, Select, FormActions } from '../FormFields'
import api from '../../api/api'

export default function DepartmentModal({ department, onSave, onClose }) {

  const [doctors, setDoctors] = useState([])

  const [form, setForm] = useState({
    name: department?.name ?? '',
    headDoctorId: ''   // ⚠ backend does not give this
  })

  const [errors, setErrors] = useState({})

  // 🔥 Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/doctors')
        setDoctors(res.data || [])
      } catch (err) {
        console.error('Failed loading doctors', err)
      }
    }

    fetchDoctors()
  }, [])

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name.trim()) {
      setErrors({ name: 'Name is required' })
      return
    }

    try {
      // 🔥 Create or Update Department
      const saved = await onSave({ name: form.name,doctorId: form.headDoctorId })
      console.log("object",saved)
      // 🔥 If head doctor selected → call assign API
      if (!!form?.headDoctorId) {
        await api.put(
          `/departments/${saved.id}/head/${form.headDoctorId}`
        )
      }

      onClose()

    } catch (err) {
      console.error(err);
      alert(
        err.response.data.message || 
        "Failed to update department"
      )
    }
  }

  return (
    <Modal
      title={department ? 'Edit Department' : 'Add Department'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <Field label="Department Name" error={errors.name}>
          <Input
            placeholder="e.g. Cardiology"
            value={form.name}
            onChange={set('name')}
          />
        </Field>

        <Field label="Head Doctor">
          <Select
            value={form.headDoctorId}
            onChange={set('headDoctorId')}
          >
            <option value="">None</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </Field>

        <FormActions
          onCancel={onClose}
          submitLabel={
            department ? 'Update Department' : 'Add Department'
          }
        />

      </form>
    </Modal>
  )
}