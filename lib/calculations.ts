export type Frequency = 'weekly' | 'biweekly' | 'monthly'

export function toMonthlyIncome(amount: number, frequency: Frequency): number {
  if (frequency === 'weekly') return (amount * 52) / 12
  if (frequency === 'biweekly') return (amount * 26) / 12
  return amount
}

export function formatUSD(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

// Python's float(input(...)) crashes on bad input. Here we check the text
// first and return a friendly message instead. Empty or invalid entries
// are counted as $0 so the totals still work.
export type ParsedAmount = { value: number; error: string | null }

export function parseAmount(text: string): ParsedAmount {
  const cleaned = text.replace(/[$,\s]/g, '')

  if (cleaned === '') {
    return { value: 0, error: 'Empty — counted as $0.' }
  }

  const value = Number(cleaned)

  if (!Number.isFinite(value)) {
    return { value: 0, error: 'Please enter a number, like 45.99. Counted as $0.' }
  }
  if (value < 0) {
    return { value: 0, error: 'Amounts can’t be negative. Counted as $0.' }
  }

  return { value, error: null }
}
