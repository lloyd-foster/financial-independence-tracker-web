import { formatUSD } from '@/lib/calculations'

type SummaryCardsProps = {
  monthlyIncome: number
  totalExpenses: number
}

export function SummaryCards({ monthlyIncome, totalExpenses }: SummaryCardsProps) {
  const difference = monthlyIncome - totalExpenses
  const isSurplus = difference >= 0

  return (
    <section aria-labelledby="summary-heading">
      <h3 id="summary-heading" className="sr-only">
        Monthly summary
      </h3>
      <dl className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <dt className="text-sm text-muted-foreground">Monthly income</dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums">{formatUSD(monthlyIncome)}</dd>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <dt className="text-sm text-muted-foreground">Total expenses</dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums">{formatUSD(totalExpenses)}</dd>
        </div>
        <div
          className={
            isSurplus
              ? 'rounded-xl border border-primary/30 bg-primary/10 p-4 shadow-sm'
              : 'rounded-xl border border-destructive/30 bg-destructive/10 p-4 shadow-sm'
          }
        >
          <dt className="text-sm text-muted-foreground">
            {isSurplus ? 'Surplus (left over)' : 'Deficit (short)'}
          </dt>
          <dd
            className={
              isSurplus
                ? 'mt-1 text-2xl font-semibold tabular-nums text-primary'
                : 'mt-1 text-2xl font-semibold tabular-nums text-destructive'
            }
          >
            {isSurplus ? '+' : '−'}
            {formatUSD(Math.abs(difference))}
          </dd>
        </div>
      </dl>
    </section>
  )
}
