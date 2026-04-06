export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  icon?: string
}

export interface Bill {
  id: string
  name: string
  amount: number
  dueDate: string
  status: 'paid' | 'pending' | 'overdue'
  category: string
  recurring: boolean
  frequency?: 'monthly' | 'weekly' | 'yearly' | 'quarterly'
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline?: string
  color: string
  icon?: string
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  budget?: number
}

export interface BalanceData {
  date: string
  balance: number
  income: number
  expenses: number
}

export interface SpendingCategory {
  name: string
  value: number
  color: string
  fill: string
}
