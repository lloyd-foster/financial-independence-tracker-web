import type { Frequency } from './calculations'

export type Category = 'rent' | 'groceries' | 'transportation' | 'phone' | 'other'

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'rent', label: 'Rent', color: 'var(--chart-1)' },
  { value: 'groceries', label: 'Groceries', color: 'var(--chart-2)' },
  { value: 'transportation', label: 'Transportation', color: 'var(--chart-3)' },
  { value: 'phone', label: 'Phone', color: 'var(--chart-4)' },
  { value: 'other', label: 'Other', color: 'var(--chart-5)' },
]

export type Expense = {
  id: string
  name: string
  category: Category
  amount: number
}

export type SavedData = {
  isSample: boolean
  income: string
  frequency: Frequency
  expenses: Expense[]
}

const STORAGE_KEY = 'fi-tracker-data-v1'

// All sample amounts below are fictional.
export function getSampleData(): SavedData {
  return {
    isSample: true,
    income: '1450',
    frequency: 'biweekly',
    expenses: [
      { id: 'sample-1', name: 'Apartment rent', category: 'rent', amount: 1200 },
      { id: 'sample-2', name: 'Weekly grocery runs', category: 'groceries', amount: 380 },
      { id: 'sample-3', name: 'Monthly bus pass', category: 'transportation', amount: 95 },
      { id: 'sample-4', name: 'Phone plan', category: 'phone', amount: 45 },
      { id: 'sample-5', name: 'Streaming service', category: 'other', amount: 15.99 },
      { id: 'sample-6', name: 'Gym membership', category: 'other', amount: 30 },
    ],
  }
}

export function getEmptyData(): SavedData {
  return {
    isSample: false,
    income: '',
    frequency: 'monthly',
    expenses: [],
  }
}

export function loadData(): SavedData {
  try {
    const text = window.localStorage.getItem(STORAGE_KEY)
    if (!text) return getSampleData()

    const data = JSON.parse(text) as SavedData
    if (typeof data.income !== 'string' || !Array.isArray(data.expenses)) return getSampleData()
    return {
      isSample: Boolean(data.isSample),
      income: data.income,
      frequency: data.frequency,
      expenses: data.expenses,
    }
  } catch {
    return getSampleData()
  }
}

export function saveData(data: SavedData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage can be full or blocked (e.g. private browsing); the app still works without saving.
  }
}

export function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
