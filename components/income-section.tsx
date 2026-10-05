'use client'

import { MoneyInput } from './money-input'
import { formatUSD, parseAmount, toMonthlyIncome, type Frequency } from '@/lib/calculations'

const FREQUENCIES: { value: Frequency; label: string; formula: string }[] = [
  { value: 'weekly', label: 'Weekly', formula: 'amount × 52 ÷ 12' },
  { value: 'biweekly', label: 'Biweekly', formula: 'amount × 26 ÷ 12' },
  { value: 'monthly', label: 'Monthly', formula: 'no conversion needed' },
]

type IncomeSectionProps = {
  income: string
  frequency: Frequency
  onIncomeChange: (value: string) => void
  onFrequencyChange: (value: Frequency) => void
}

export function IncomeSection({
  income,
  frequency,
  onIncomeChange,
  onFrequencyChange,
}: IncomeSectionProps) {
  const amount = parseAmount(income).value
  const monthly = toMonthlyIncome(amount, frequency)
  const selected = FREQUENCIES.find((option) => option.value === frequency)

  return (
    <section aria-labelledby="income-heading" className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 id="income-heading" className="mb-4 text-lg font-semibold">
        Income
      </h3>

      <div className="flex flex-col gap-4">
        <MoneyInput label="Income amount (per paycheck)" value={income} onChange={onIncomeChange} />

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1.5 text-sm font-medium">How often are you paid?</legend>
          <div className="grid grid-cols-3 gap-2">
            {FREQUENCIES.map((option) => (
              <label
                key={option.value}
                className="flex h-11 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition-colors has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/40"
              >
                <input
                  type="radio"
                  name="frequency"
                  value={option.value}
                  checked={frequency === option.value}
                  onChange={() => onFrequencyChange(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <p className="rounded-lg bg-muted p-3 text-sm">
          <span className="text-muted-foreground">Monthly income ({selected?.formula}): </span>
          <strong className="tabular-nums">{formatUSD(monthly)}</strong>
        </p>
      </div>
    </section>
  )
}
