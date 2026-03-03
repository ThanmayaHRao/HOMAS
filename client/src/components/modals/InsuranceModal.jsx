import { useState } from 'react'
import Modal from '../Modal'
import { Field, Input, Select, FormActions } from '../FormFields'

export default function InsuranceModal({
  insurance,
  patients,
  onSave,
  onClose
}) {

  const [form, setForm] = useState({
    policyNumber: insurance?.policyNumber ?? '',
    validUntil: insurance?.validUntil ?? '',
    patientId: insurance?.patientId ?? ''
  })

  const [errors, setErrors] = useState({})

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.policyNumber.trim())
      e.policyNumber = 'Policy number is required'
    if (!form.validUntil)
      e.validUntil = 'Valid until date is required'
    if (!form.patientId)
      e.patientId = 'Please select a patient'
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
      policyNumber: form.policyNumber,
      validUntil: form.validUntil,
      patientId: form.patientId
    })
  }

  return (
    <Modal
      title={insurance ? 'Edit Insurance' : 'Add Insurance'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <Field label="Policy Number" error={errors.policyNumber}>
          <Input
            placeholder="e.g. POL-2026-001"
            value={form.policyNumber}
            onChange={set('policyNumber')}
          />
        </Field>

        <Field label="Valid Until" error={errors.validUntil}>
          <Input
            type="date"
            value={form.validUntil}
            onChange={set('validUntil')}
          />
        </Field>

        <Field label="Assign Patient" error={errors.patientId}>
          <Select
            value={form.patientId}
            onChange={set('patientId')}
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>

        <FormActions
          onCancel={onClose}
          submitLabel={
            insurance ? 'Update Insurance' : 'Add Insurance'
          }
        />

      </form>
    </Modal>
  )
}