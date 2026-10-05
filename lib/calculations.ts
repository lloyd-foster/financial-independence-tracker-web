// ---------------------------------------------------------------
// PART 1: Your original Python logic, translated line by line.
// ---------------------------------------------------------------

export type OriginalResult = {
  monthlyIncome: number
  monthlyExpenses: number
  monthlyGap: number
}

export function calculateOriginal(
  rent: number,
  phone: number,
  groceries: number,
  transportation: number,
  biWeeklyIncome: number,
): OriginalResult {
  // Python: monthly_income = bi_weekly_income * 26/12
  const monthlyIncome = (biWeeklyIncome * 26) / 12

  // Python: monthly_expenses = rent + phone + groceries + transportation
  const monthlyExpenses = rent + phone + groceries + transportation

  // Python: monthly_gap = monthly_expenses - monthly_income
  const monthlyGap = monthlyExpenses - monthlyIncome

  return { monthlyIncome, monthlyExpenses, monthlyGap }
}

// Python: f"${value:.2f}"  ->  "$" + value with 2 decimal places
export function formatLikePython(value: number): string {
  return `$${value.toFixed(2)}`
}

// ---------------------------------------------------------------
// PART 2: Helpers for the additional tracker features.
// ---------------------------------------------------------------

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
