import { Transaction, Bill, Goal, Category, BalanceData, SpendingCategory } from './types'

export const categories: Category[] = [
  { id: '1', name: 'Food & Dining', color: 'hsl(var(--chart-1))', icon: 'utensils' },
  { id: '2', name: 'Shopping', color: 'hsl(var(--chart-2))', icon: 'shopping-bag' },
  { id: '3', name: 'Entertainment', color: 'hsl(var(--chart-3))', icon: 'film' },
  { id: '4', name: 'Transportation', color: 'hsl(var(--chart-4))', icon: 'car' },
  { id: '5', name: 'Health', color: 'hsl(var(--chart-5))', icon: 'heart-pulse' },
  { id: '6', name: 'Education', color: 'hsl(195, 80%, 45%)', icon: 'graduation-cap' },
  { id: '7', name: 'Bills & Utilities', color: 'hsl(220, 60%, 50%)', icon: 'receipt' },
  { id: '8', name: 'Investment', color: 'hsl(145, 65%, 45%)', icon: 'trending-up' },
  { id: '9', name: 'Salary', color: 'hsl(165, 70%, 45%)', icon: 'wallet' },
]

export const transactions: Transaction[] = [
  { id: '1', description: 'Vitamins & supplements', amount: 55.00, type: 'expense', category: 'Health', date: '2024-03-15', icon: 'pill' },
  { id: '2', description: 'Conference ticket', amount: 150.00, type: 'expense', category: 'Education', date: '2024-03-14', icon: 'ticket' },
  { id: '3', description: 'Grocery run', amount: 110.00, type: 'expense', category: 'Food & Dining', date: '2024-03-14', icon: 'shopping-cart' },
  { id: '4', description: 'Streaming bundle', amount: 45.00, type: 'expense', category: 'Entertainment', date: '2024-03-13', icon: 'tv' },
  { id: '5', description: 'Portfolio dividends', amount: 300.00, type: 'income', category: 'Investment', date: '2024-03-13', icon: 'trending-up' },
  { id: '6', description: 'Spring wardrobe', amount: 220.00, type: 'expense', category: 'Shopping', date: '2024-03-12', icon: 'shirt' },
  { id: '7', description: 'Monthly salary', amount: 5500.00, type: 'income', category: 'Salary', date: '2024-03-01', icon: 'wallet' },
  { id: '8', description: 'Freelance project', amount: 1200.00, type: 'income', category: 'Salary', date: '2024-03-05', icon: 'laptop' },
  { id: '9', description: 'Restaurant dinner', amount: 85.00, type: 'expense', category: 'Food & Dining', date: '2024-03-10', icon: 'utensils' },
  { id: '10', description: 'Uber rides', amount: 32.00, type: 'expense', category: 'Transportation', date: '2024-03-11', icon: 'car' },
  { id: '11', description: 'Online course', amount: 199.00, type: 'expense', category: 'Education', date: '2024-03-08', icon: 'book-open' },
  { id: '12', description: 'Gym membership', amount: 49.00, type: 'expense', category: 'Health', date: '2024-03-01', icon: 'dumbbell' },
]

export const bills: Bill[] = [
  { id: '1', name: 'Water Bill', amount: 450.00, dueDate: '2024-03-08', status: 'overdue', category: 'Bills & Utilities', recurring: true, frequency: 'monthly' },
  { id: '2', name: 'House Rent', amount: 12000.00, dueDate: '2024-03-12', status: 'overdue', category: 'Bills & Utilities', recurring: true, frequency: 'monthly' },
  { id: '3', name: 'Electricity Bill', amount: 1800.00, dueDate: '2024-03-16', status: 'pending', category: 'Bills & Utilities', recurring: true, frequency: 'monthly' },
  { id: '4', name: 'Internet', amount: 999.00, dueDate: '2024-03-21', status: 'pending', category: 'Bills & Utilities', recurring: true, frequency: 'monthly' },
  { id: '5', name: 'Health Insurance', amount: 3500.00, dueDate: '2024-03-26', status: 'pending', category: 'Health', recurring: true, frequency: 'monthly' },
  { id: '6', name: 'Phone Bill', amount: 599.00, dueDate: '2024-03-25', status: 'pending', category: 'Bills & Utilities', recurring: true, frequency: 'monthly' },
  { id: '7', name: 'Netflix Subscription', amount: 199.00, dueDate: '2024-03-20', status: 'pending', category: 'Entertainment', recurring: true, frequency: 'monthly' },
  { id: '8', name: 'Car Insurance', amount: 4500.00, dueDate: '2024-04-01', status: 'pending', category: 'Transportation', recurring: true, frequency: 'quarterly' },
]

export const goals: Goal[] = [
  { id: '1', name: 'Emergency Fund', targetAmount: 150000, currentAmount: 62000, deadline: '2024-12-31', color: 'var(--chart-1)', icon: 'shield' },
  { id: '2', name: 'Europe Vacation', targetAmount: 80000, currentAmount: 22000, deadline: '2025-06-01', color: 'var(--chart-2)', icon: 'plane' },
  { id: '3', name: 'New Laptop', targetAmount: 90000, currentAmount: 45000, deadline: '2024-08-01', color: 'var(--chart-3)', icon: 'laptop' },
  { id: '4', name: 'Investment Portfolio', targetAmount: 500000, currentAmount: 125000, deadline: '2026-01-01', color: 'var(--chart-4)', icon: 'trending-up' },
  { id: '5', name: 'Home Down Payment', targetAmount: 1000000, currentAmount: 350000, deadline: '2027-01-01', color: 'var(--chart-5)', icon: 'home' },
]

export const balanceData: BalanceData[] = [
  { date: 'Jan', balance: 45000, income: 55000, expenses: 42000 },
  { date: 'Feb', balance: 58000, income: 62000, expenses: 49000 },
  { date: 'Mar', balance: 52000, income: 58000, expenses: 64000 },
  { date: 'Apr', balance: 67000, income: 71000, expenses: 56000 },
  { date: 'May', balance: 74000, income: 68000, expenses: 61000 },
  { date: 'Jun', balance: 81000, income: 75000, expenses: 68000 },
  { date: 'Jul', balance: 88000, income: 82000, expenses: 75000 },
  { date: 'Aug', balance: 95000, income: 89000, expenses: 82000 },
  { date: 'Sep', balance: 102000, income: 96000, expenses: 89000 },
  { date: 'Oct', balance: 109000, income: 103000, expenses: 96000 },
  { date: 'Nov', balance: 116000, income: 110000, expenses: 103000 },
  { date: 'Dec', balance: 125000, income: 118000, expenses: 109000 },
]

export const spendingBreakdown: SpendingCategory[] = [
  { name: 'Food & Dining', value: 12500, color: 'var(--chart-1)', fill: 'var(--chart-1)' },
  { name: 'Shopping', value: 8200, color: 'var(--chart-2)', fill: 'var(--chart-2)' },
  { name: 'Entertainment', value: 4500, color: 'var(--chart-3)', fill: 'var(--chart-3)' },
  { name: 'Transportation', value: 3200, color: 'var(--chart-4)', fill: 'var(--chart-4)' },
  { name: 'Health', value: 5800, color: 'var(--chart-5)', fill: 'var(--chart-5)' },
  { name: 'Bills & Utilities', value: 15000, color: 'hsl(220, 60%, 50%)', fill: 'hsl(220, 60%, 50%)' },
]

export function calculateTotals() {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const totalBalance = totalIncome - totalExpenses
  
  return { totalIncome, totalExpenses, totalBalance }
}

export function getUpcomingBills() {
  const today = new Date()
  return bills.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
}

export function getDaysUntilDue(dueDate: string): number {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
