'use client'

import { MoneyInput } from './money-input'
import { calculateOriginal, formatLikePython, parseAmount } from '@/lib/calculations'
import type { OriginalInputs } from '@/lib/storage'

type OriginalCalculatorProps = {
  inputs: OriginalInputs
  onChange: (field: keyof OriginalInputs, value: string) => void
}

export function OriginalCalculator({ inputs, onChange }: OriginalCalculatorProps) {
  // Python: rent = float(input(...)), etc.
  const rent = parseAmount(inputs.rent).value
  const phone = parseAmount(inputs.phone).value
  const groceries = parseAmount(inputs.groceries).value
  const transportation = parseAmount(inputs.transportation).value
  const biWeeklyIncome = parseAmount(inputs.biWeeklyIncome).value

  const result = calculateOriginal(rent, phone, groceries, transportation, biWeeklyIncome)

  return (
    <section
      aria-labelledby="original-heading"
      className="rounded-xl border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Part 1 · Original calculator
        </p>
        <h2 id="original-heading" className="text-xl font-semibold text-balance">
          Your Python expense calculator, on the web
        </h2>
        <p className="text-sm text-muted-foreground text-pretty">
          Same five inputs, same math, same three outputs as your script. Results update as you
          type.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <MoneyInput
          label="Enter your monthly rent"
          value={inputs.rent}
          onChange={(value) => onChange('rent', value)}
        />
        <MoneyInput
          label="Enter the cost of your phone bill"
          value={inputs.phone}
          onChange={(value) => onChange('phone', value)}
        />
        <MoneyInput
          label="Enter how much you spend on groceries monthly"
          value={inputs.groceries}
          onChange={(value) => onChange('groceries', value)}
        />
        <MoneyInput
          label="Enter how much you spend on transportation monthly"
          value={inputs.transportation}
          onChange={(value) => onChange('transportation', value)}
        />
        <MoneyInput
          label="Enter your bi-weekly income"
          value={inputs.biWeeklyIncome}
          onChange={(value) => onChange('biWeeklyIncome', value)}
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-sm font-medium">Output</h3>
        <output
          aria-live="polite"
          className="block rounded-lg bg-foreground p-4 font-mono text-sm leading-relaxed text-background"
        >
          <span className="block">Monthly expenses: {formatLikePython(result.monthlyExpenses)}</span>
          <span className="block">
            Average monthly income: {formatLikePython(result.monthlyIncome)}
          </span>
          <span className="block">Monthly income gap: {formatLikePython(result.monthlyGap)}</span>
        </output>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Like your script, the gap is <em>expenses minus income</em>: a positive gap means you
          spend more than you earn; a negative gap means money is left over.
        </p>
      </div>
    </section>
  )
}
