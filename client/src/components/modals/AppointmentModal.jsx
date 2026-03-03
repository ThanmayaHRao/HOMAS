import { useState, useEffect } from 'react'
import Modal from '../Modal'
import { Field, Select, Textarea, FormActions, Input } from '../FormFields'
import api from '../../api/api'

export default function AppointmentModal({ appointment, onSave, onClose }) {

  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])

  const [form, setForm] = useState({
    patientId: appointment?.patientId ?? '',
    doctorId: appointment?.doctorId ?? '',
    appointmentTime: appointment?.appointmentTime
      ? appointment.appointmentTime.slice(0, 16)
      : '',
    reason: appointment?.reason ?? '',
  })

  const [errors, setErrors] = useState({})

  // 🔥 Fetch patients & doctors from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, dRes] = await Promise.all([
          api.get('/patients'),
          api.get('/doctors')
        ])

        setPatients(pRes.data.content || [])
        setDoctors(dRes.data || [])
      } catch (err) {
        console.error('Failed loading patients/doctors', err)
      }
    }

    fetchData()
  }, [])

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.patientId) e.patientId = 'Patient is required'
    if (!form.doctorId) e.doctorId = 'Doctor is required'
    if (!form.appointmentTime) e.appointmentTime = 'Date & Time is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    // 🔥 Send correct backend DTO
    onSave({
      patientId: Number(form.patientId),
      doctorId: Number(form.doctorId),
      appointmentTime: new Date(form.appointmentTime).toISOString(),
      reason: form.reason
    })
  }

  return (
    <Modal
      title={appointment ? 'Edit Appointment' : 'New Appointment'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <Field label="Patient" error={errors.patientId}>
          <Select value={form.patientId} onChange={set('patientId')}>
            <option value="">Select patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Doctor" error={errors.doctorId}>
          <Select value={form.doctorId} onChange={set('doctorId')}>
            <option value="">Select doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.specialization}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Date & Time" error={errors.appointmentTime}>
          <Input
            type="datetime-local"
            value={form.appointmentTime}
            onChange={set('appointmentTime')}
          />
        </Field>

        <Field label="Reason">
          <Textarea
            placeholder="Describe the reason for visit..."
            value={form.reason}
            onChange={set('reason')}
          />
        </Field>

        <FormActions
          onCancel={onClose}
          submitLabel={
            appointment ? 'Update Appointment' : 'Book Appointment'
          }
        />

      </form>
    </Modal>
  )
}