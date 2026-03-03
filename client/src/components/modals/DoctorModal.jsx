import { useState, useEffect } from 'react'
import Modal from '../Modal'
import { Field, Input, Select, FormActions } from '../FormFields'
import api from '../../api/api'

export default function DoctorModal({ doctor, onSave, onClose }) {

  const [departments, setDepartments] = useState([])

  const [form, setForm] = useState({
    name: doctor?.name ?? '',
    email: doctor?.email ?? '',
    specialization: doctor?.specialization ?? '',
    departmentId: ''   // ⚠ backend does not give this
  })

  const [errors, setErrors] = useState({})

  // 🔥 Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get('/departments')
        setDepartments(res.data || [])
      } catch (err) {
        console.error('Failed loading departments', err)
      }
    }

    fetchDepartments()
  }, [])

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    try {
      // 🔥 Create or Update doctor
      const savedDoctor = await onSave({
        name: form.name,
        email: form.email,
        specialization: form.specialization,
        departmentId: form.departmentId || null
      })

      // 🔥 If department selected → assign explicitly
      if (form.departmentId && savedDoctor?.id) {
        await api.put(
          `/doctors/${savedDoctor.id}/department/${form.departmentId}`
        )
      }

      onClose()

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Modal
      title={doctor ? 'Edit Doctor' : 'Add Doctor'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-2 gap-x-4">

          <Field label="Full Name" error={errors.name}>
            <Input
              placeholder="Dr. Arun Mehta"
              value={form.name}
              onChange={set('name')}
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <Input
              type="email"
              placeholder="doctor@homas.in"
              value={form.email}
              onChange={set('email')}
            />
          </Field>

          <Field label="Specialization">
            <Input
              placeholder="e.g. Cardiology"
              value={form.specialization}
              onChange={set('specialization')}
            />
          </Field>

          <Field label="Department">
            <Select
              value={form.departmentId}
              onChange={set('departmentId')}
            >
              <option value="">None</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </Field>

        </div>

        <FormActions
          onCancel={onClose}
          submitLabel={
            doctor ? 'Update Doctor' : 'Add Doctor'
          }
        />

      </form>
    </Modal>
  )
}