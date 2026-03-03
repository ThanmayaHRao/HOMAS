import { useState } from 'react'
import Modal from '../Modal'
import { Field, Input, Select, FormActions } from '../FormFields'

const bloodGroups = [
  'A_POSITIVE',
  'A_NEGATIVE',
  'B_POSITIVE',
  'B_NEGATIVE',
  'O_POSITIVE',
  'O_NEGATIVE',
  'AB_POSITIVE',
  'AB_NEGATIVE'
]

export default function PatientModal({ patient, onSave, onClose }) {

  const [form, setForm] = useState({
    name: patient?.name ?? '',
    email: patient?.email ?? '',
    gender: patient?.gender ?? '',
    birthDate: patient?.birthDate ?? '',
    bloodGroup: patient?.bloodGroup ?? '',
  })

  const [errors, setErrors] = useState({})

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    if (!form.gender) e.gender = 'Gender is required'
    if (!form.bloodGroup) e.bloodGroup = 'Blood group is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    onSave({
      name: form.name,
      email: form.email,
      gender: form.gender,
      birthDate: form.birthDate,
      bloodGroup: form.bloodGroup
    })
  }

  return (
    <Modal
      title={patient ? 'Edit Patient' : 'Add Patient'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-2 gap-x-4">

          <Field label="Full Name" error={errors.name}>
            <Input
              placeholder="e.g. Ramesh Patel"
              value={form.name}
              onChange={set('name')}
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <Input
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={set('email')}
            />
          </Field>

          <Field label="Gender" error={errors.gender}>
            <Select value={form.gender} onChange={set('gender')}>
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </Select>
          </Field>

          <Field label="Date of Birth">
            <Input
              type="date"
              value={form.birthDate}
              onChange={set('birthDate')}
            />
          </Field>

          <Field label="Blood Group" error={errors.bloodGroup}>
            <Select
              value={form.bloodGroup}
              onChange={set('bloodGroup')}
            >
              <option value="">Select</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg.replace('_', ' ')}
                </option>
              ))}
            </Select>
          </Field>

        </div>

        <FormActions
          onCancel={onClose}
          submitLabel={
            patient ? 'Update Patient' : 'Add Patient'
          }
        />

      </form>
    </Modal>
  )
}