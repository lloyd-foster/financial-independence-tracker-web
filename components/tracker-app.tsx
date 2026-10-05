'use client'

import { useEffect, useState } from 'react'
import { RotateCcw, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { IncomeSection } from './income-section'
import { ExpenseSection } from './expense-section'
import { SummaryCards } from './summary-cards'
import { SpendingChart } from './spending-chart'
import type { ExpenseValues } from './expense-form'
import { parseAmount, toMonthlyIncome, type Frequency } from '@/lib/calculations'
import {
  createId,
  getEmptyData,
  getSampleData,
  loadData,
  saveData,
  type SavedData,
} from '@/lib/storage'

export function TrackerApp() {
  const [data, setData] = useState<SavedData>(getSampleData)
  const [hasLoaded, setHasLoaded] = useState(false)

  // localStorage only exists in the browser, so read it after the page loads.
  useEffect(() => {
    setData(loadData())
    setHasLoaded(true)
  }, [])

  // Save every time the data changes (after the first load).
  useEffect(() => {
    if (hasLoaded) saveData(data)
  }, [data, hasLoaded])

  // Any edit means the user is now working with their own numbers.
  function update(changes: Partial<SavedData>) {
    setData((previous) => ({ ...previous, ...changes, isSample: false }))
  }

  function addExpense(values: ExpenseValues) {
    update({ expenses: [...data.expenses, { id: createId(), ...values }] })
  }

  function updateExpense(id: string, values: ExpenseValues) {
    update({
      expenses: data.expenses.map((expense) =>
        expense.id === id ? { ...expense, ...values } : expense,
      ),
    })
  }

  function deleteExpense(id: string) {
    update({ expenses: data.expenses.filter((expense) => expense.id !== id) })
  }

  function resetToSample() {
    if (window.confirm('Replace everything with the fictional sample data?')) {
      setData(getSampleData())
    }
  }

  function clearAll() {
    if (window.confirm('Clear all entries? This cannot be undone.')) {
      setData(getEmptyData())
    }
  }

  const monthlyIncome = toMonthlyIncome(parseAmount(data.income).value, data.frequency)
  let totalExpenses = 0
  for (const expense of data.expenses) totalExpenses += expense.amount

  if (!hasLoaded) {
    return <p className="py-20 text-center text-muted-foreground">Loading your saved entries…</p>
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div role="status" className="text-sm">
          {data.isSample ? (
            <p>
              <span className="mr-2 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                Sample data
              </span>
              These amounts are fictional. Edit anything to start using your own.
            </p>
          ) : (
            <p className="text-muted-foreground">Your entries are saved in this browser.</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="lg" className="h-10 flex-1" onClick={resetToSample}>
            <RotateCcw aria-hidden="true" />
            Reset to sample
          </Button>
          <Button variant="destructive" size="lg" className="h-10 flex-1" onClick={clearAll}>
            <Trash aria-hidden="true" />
            Clear all
          </Button>
        </div>
      </div>

      <section aria-label="Budget overview" className="flex flex-col gap-4">
        <SummaryCards monthlyIncome={monthlyIncome} totalExpenses={totalExpenses} />

        <div className="grid gap-4 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <IncomeSection
              income={data.income}
              frequency={data.frequency}
              onIncomeChange={(value) => update({ income: value })}
              onFrequencyChange={(value: Frequency) => update({ frequency: value })}
            />
            <SpendingChart expenses={data.expenses} totalExpenses={totalExpenses} />
          </div>
          <div className="lg:col-span-3">
            <ExpenseSection
              expenses={data.expenses}
              onAdd={addExpense}
              onUpdate={updateExpense}
              onDelete={deleteExpense}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
