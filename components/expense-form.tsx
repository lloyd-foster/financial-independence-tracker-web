'use client'

import { useId, useState } from 'react'
import { Button } from './ui/button'
import { CATEGORIES, type Category } from '@/lib/storage'

export type ExpenseValues = { name: string; category: Category; amount: number }

type ExpenseFormProps = {
  initial?: ExpenseValues
  submitLabel: string
  onSubmit: (values: ExpenseValues) => void
  onCancel?: () => void
}

const fieldClass =
  'h-11 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive'

export function ExpenseForm({ initial, submitLabel, onSubmit, onCancel }: ExpenseFormProps) {
  const id = useId()
  const [name, setName] = useState(initial?.name ?? '')
  const [category, setCategory] = useState<Category>(initial?.category ?? 'rent')
  const [amountText, setAmountText] = useState(initial ? String(initial.amount) : '')
  const [nameError, setNameError] = useState<string | null>(null)
  const [amountError, setAmountError] = useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()
    const amount = Number(amountText.replace(/[$,\s]/g, ''))

    const newNameError = trimmedName === '' ? 'Please enter a name for this expense.' : null
    let newAmountError: string | null = null
    if (amountText.trim() === '') newAmountError = 'Please enter an amount.'
    else if (!Number.isFinite(amount)) newAmountError = 'Please enter a number, like 45.99.'
    else if (amount <= 0) newAmountError = 'The amount must be greater than $0.'

    setNameError(newNameError)
    setAmountError(newAmountError)
    if (newNameError || newAmountError) return

    onSubmit({ name: trimmedName, category, amount: Math.round(amount * 100) / 100 })

    if (!initial) {
      setName('')
      setAmountText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-3 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor={`${id}-name`} className="text-sm font-medium">
          Expense name
        </label>
        <input
          id={`${id}-name`}
          type="text"
          placeholder="e.g. Phone plan"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? `${id}-name-error` : undefined}
          className={fieldClass}
        />
        {nameError && (
          <p id={`${id}-name-error`} className="text-sm text-destructive">
            {nameError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-category`} className="text-sm font-medium">
          Category
        </label>
        <select
          id={`${id}-category`}
          value={category}
          onChange={(event) => setCategory(event.target.value as Category)}
          className={fieldClass}
        >
          {CATEGORIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-amount`} className="text-sm font-medium">
          Monthly amount ($)
        </label>
        <input
          id={`${id}-amount`}
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amountText}
          onChange={(event) => setAmountText(event.target.value)}
          aria-invalid={Boolean(amountError)}
          aria-describedby={amountError ? `${id}-amount-error` : undefined}
          className={`${fieldClass} tabular-nums`}
        />
        {amountError && (
          <p id={`${id}-amount-error`} className="text-sm text-destructive">
            {amountError}
          </p>
        )}
      </div>

      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit" size="lg" className="h-11 flex-1 sm:flex-none sm:px-5">
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" size="lg" className="h-11" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
