import { formatUSD } from '@/lib/calculations'
import { CATEGORIES, type Expense } from '@/lib/storage'

type SpendingChartProps = {
  expenses: Expense[]
  totalExpenses: number
}

export function SpendingChart({ expenses, totalExpenses }: SpendingChartProps) {
  const rows = CATEGORIES.map((category) => {
    let total = 0
    for (const expense of expenses) {
      if (expense.category === category.value) total += expense.amount
    }
    return { ...category, total }
  })

  const largest = Math.max(...rows.map((row) => row.total))

  return (
    <section aria-labelledby="chart-heading" className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 id="chart-heading" className="mb-1 text-lg font-semibold">
        Spending by category
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">Each bar shows that category’s monthly total.</p>

      {totalExpenses === 0 ? (
        <p className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
          Add an expense to see your chart.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((row) => {
            const percentOfTotal = (row.total / totalExpenses) * 100
            const barWidth = largest > 0 ? (row.total / largest) * 100 : 0

            return (
              <li key={row.value}>
                <div className="mb-1.5 flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium">{row.label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {formatUSD(row.total)} · {percentOfTotal.toFixed(0)}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                  <div
                    className="h-full rounded-full transition-[width] duration-500"
                    style={{ width: `${barWidth}%`, backgroundColor: row.color }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
