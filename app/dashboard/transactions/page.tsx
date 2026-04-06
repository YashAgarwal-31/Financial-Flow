'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  Pill,
  Ticket,
  ShoppingCart,
  Tv,
  TrendingUp,
  Shirt,
  Wallet,
  Laptop,
  Utensils,
  Car,
  BookOpen,
  Dumbbell,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { transactions as initialTransactions, formatCurrency, formatDate, categories } from '@/lib/data'
import type { Transaction } from '@/lib/types'

const iconMap: Record<string, React.ElementType> = {
  pill: Pill,
  ticket: Ticket,
  'shopping-cart': ShoppingCart,
  tv: Tv,
  'trending-up': TrendingUp,
  shirt: Shirt,
  wallet: Wallet,
  laptop: Laptop,
  utensils: Utensils,
  car: Car,
  'book-open': BookOpen,
  dumbbell: Dumbbell,
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
  })

  const filteredTransactions = transactions
    .filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || t.type === typeFilter
      const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter
      return matchesSearch && matchesType && matchesCategory
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) {
      return
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      type: newTransaction.type,
      category: newTransaction.category,
      date: newTransaction.date,
      icon: 'wallet',
    }

    setTransactions([transaction, ...transactions])
    setNewTransaction({
      description: '',
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
    })
    setIsDialogOpen(false)
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const uniqueCategories = Array.from(new Set(transactions.map((t) => t.category)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and track all your financial transactions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Enter the details of your transaction below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="e.g., Grocery shopping"
                  value={newTransaction.description}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newTransaction.amount}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, amount: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newTransaction.type}
                    onValueChange={(value: 'income' | 'expense') =>
                      setNewTransaction({ ...newTransaction, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) =>
                      setNewTransaction({ ...newTransaction, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, date: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTransaction}>Add Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle className="text-2xl">{filteredTransactions.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Income</CardDescription>
            <CardTitle className="text-2xl text-success">{formatCurrency(totalIncome)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses</CardDescription>
            <CardTitle className="text-2xl text-destructive">{formatCurrency(totalExpenses)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => {
                const Icon = iconMap[transaction.icon || 'wallet'] || Wallet

                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{transaction.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-semibold ${
                          transaction.type === 'income' ? 'text-success' : ''
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}{' '}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteTransaction(transaction.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
