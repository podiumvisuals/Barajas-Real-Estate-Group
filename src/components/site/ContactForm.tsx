'use client'

import { useState } from 'react'

import type { Form } from '@/payload-types'

export default function ContactForm({ form }: { form: Form | null }) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  if (!form) {
    return <p className="form-message error">Contact form is not configured yet.</p>
  }

  const fields = (form.fields ?? []).filter(
    (field): field is Extract<typeof field, { name: string }> => field.blockType !== 'message',
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form!.id,
          submissionData: Object.entries(values).map(([field, value]) => ({ field, value })),
        }),
      })
      if (!res.ok) throw new Error('submission failed')
      setStatus('success')
      setValues({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {status === 'success' && (
        <p className="form-message success">Thanks — Lily will be in touch soon.</p>
      )}
      {status === 'error' && (
        <p className="form-message error">Something went wrong. Please try again.</p>
      )}

      {fields.map((field) => {
        const commonProps = {
          name: field.name,
          placeholder: field.label ?? '',
          required: Boolean(field.required),
          value: values[field.name] ?? '',
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setValues((v) => ({ ...v, [field.name]: e.target.value })),
        }

        if (field.blockType === 'textarea') {
          return <textarea key={field.name} rows={3} {...commonProps} />
        }

        if (field.blockType === 'select') {
          return (
            <select key={field.name} {...commonProps}>
              <option value="">{field.label}</option>
              {(field.options ?? []).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )
        }

        if (field.blockType === 'checkbox') {
          return (
            <input
              key={field.name}
              type="checkbox"
              name={field.name}
              required={Boolean(field.required)}
              checked={values[field.name] === 'true'}
              onChange={(e) => setValues((v) => ({ ...v, [field.name]: String(e.target.checked) }))}
            />
          )
        }

        const inputType = field.blockType === 'email' ? 'email' : field.blockType === 'number' ? 'number' : 'text'
        return <input key={field.name} type={inputType} {...commonProps} />
      })}

      <button type="submit" className="btn" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : form.submitButtonLabel || 'Contact Lily'}
      </button>
    </form>
  )
}
