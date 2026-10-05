'use client'

import { useId } from 'react'
import { parseAmount } from '@/lib/calculations'

type MoneyInputProps = {
  label: string
  value: string
  onChange: (value: string) => void
  showEmptyWarning?: boolean
}

export function MoneyInput({ label, value, onChange, showEmptyWarning = true }: MoneyInputProps) {
  const id = useId()
  const messageId = `${id}-message`
  const { error } = parseAmount(value)
  const isEmpty = value.trim() === ''
  const showMessage = error && (showEmptyWarning || !isEmpty)
  const isInvalid = Boolean(error) && !isEmpty

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground"
        >
          $
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0.00"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={isInvalid}
          aria-describedby={showMessage ? messageId : undefined}
          className="h-11 w-full rounded-lg border border-input bg-background pl-7 pr-3 text-base tabular-nums outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive"
        />
      </div>
      {showMessage && (
        <p
          id={messageId}
          className={isInvalid ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'}
        >
          {error}
        </p>
      )}
    </div>
  )
}
