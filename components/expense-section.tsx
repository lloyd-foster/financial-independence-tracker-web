'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { ExpenseForm, type ExpenseValues } from './expense-form'
import { formatUSD } from '@/lib/calculations'
import { CATEGORIES, type Expense } from '@/lib/storage'

type ExpenseSectionProps = {
  expenses: Expense[]
  onAdd: (values: ExpenseValues) => void
  onUpdate: (id: string, values: ExpenseValues) => void
  onDelete: (id: string) => void
}

export function ExpenseSection({ expenses, onAdd, onUpdate, onDelete }: ExpenseSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <section aria-labelledby="expenses-heading" className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 id="expenses-heading" className="mb-4 text-lg font-semibold">
        Monthly expenses
      </h3>

      <div className="rounded-lg border border-dashed p-4">
        <h4 className="mb-3 text-sm font-semibold">Add an expense</h4>
        <ExpenseForm submitLabel="Add expense" onSubmit={onAdd} />
      </div>

      {expenses.length === 0 ? (
        <p className="mt-4 rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
          No expenses yet. Add your first one above.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col divide-y" aria-label="Expense list">
          {expenses.map((expense) => {
            const category = CATEGORIES.find((option) => option.value === expense.category)

            if (editingId === expense.id) {
              return (
                <li key={expense.id} className="py-4">
                  <h4 className="mb-3 text-sm font-semibold">Editing “{expense.name}”</h4>
                  <ExpenseForm
                    initial={expense}
                    submitLabel="Save changes"
                    onSubmit={(values) => {
                      onUpdate(expense.id, values)
                      setEditingId(null)
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                </li>
              )
            }

            return (
              <li key={expense.id} className="flex items-center gap-3 py-3">
                <span
                  aria-hidden="true"
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: category?.color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{expense.name}</p>
                  <p className="text-sm text-muted-foreground">{category?.label}</p>
                </div>
                <p className="font-medium tabular-nums">{formatUSD(expense.amount)}</p>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    onClick={() => setEditingId(expense.id)}
                    aria-label={`Edit ${expense.name}`}
                  >
                    <Pencil aria-hidden="true" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(expense.id)}
                    aria-label={`Delete ${expense.name}`}
                  >
                    <Trash2 aria-hidden="true" />
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
