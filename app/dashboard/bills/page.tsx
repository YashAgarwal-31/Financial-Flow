'use client'

import { useState } from 'react'
import {
  Plus,
  AlertCircle,
  Clock,
  CheckCircle,
  Calendar,
  Receipt,
  MoreHorizontal,
  Pencil,
  Trash2,
  Bell,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { bills as initialBills, formatCurrency, getDaysUntilDue, categories } from '@/lib/data'
import type { Bill } from '@/lib/types'

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>(initialBills)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newBill, setNewBill] = useState({
    name: '',
    amount: '',
    dueDate: '',
    category: '',
    recurring: true,
    frequency: 'monthly' as const,
  })

  const filteredBills = bills.filter((bill) => {
    if (statusFilter === 'all') return true
    const daysUntil = getDaysUntilDue(bill.dueDate)
    if (statusFilter === 'overdue') return daysUntil < 0
    if (statusFilter === 'pending') return daysUntil >= 0 && bill.status !== 'paid'
    if (statusFilter === 'paid') return bill.status === 'paid'
    return true
  })

  const sortedBills = [...filteredBills].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

  const overdueBills = bills.filter((bill) => getDaysUntilDue(bill.dueDate) < 0)
  const upcomingBills = bills.filter((bill) => {
    const days = getDaysUntilDue(bill.dueDate)
    return days >= 0 && days <= 7 && bill.status !== 'paid'
  })
  const totalMonthly = bills
    .filter((b) => b.recurring && b.frequency === 'monthly')
    .reduce((sum, b) => sum + b.amount, 0)

  const handleAddBill = () => {
    if (!newBill.name || !newBill.amount || !newBill.dueDate || !newBill.category) {
      return
    }

    const bill: Bill = {
      id: Date.now().toString(),
      name: newBill.name,
      amount: parseFloat(newBill.amount),
      dueDate: newBill.dueDate,
      status: 'pending',
      category: newBill.category,
      recurring: newBill.recurring,
      frequency: newBill.frequency,
    }

    setBills([...bills, bill])
    setNewBill({
      name: '',
      amount: '',
      dueDate: '',
      category: '',
      recurring: true,
      frequency: 'monthly',
    })
    setIsDialogOpen(false)
  }

  const handleMarkPaid = (id: string) => {
    setBills(bills.map((bill) => 
      bill.id === id ? { ...bill, status: 'paid' as const } : bill
    ))
  }

  const handleDeleteBill = (id: string) => {
    setBills(bills.filter((bill) => bill.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bills</h1>
          <p className="text-muted-foreground">
            Track and manage your recurring bills and payments
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Bill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bill</DialogTitle>
              <DialogDescription>
                Enter the details of your bill below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Bill Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Electricity Bill"
                  value={newBill.name}
                  onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newBill.amount}
                    onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newBill.category}
                  onValueChange={(value) => setNewBill({ ...newBill, category: value })}
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
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="recurring">Recurring Bill</Label>
                  <p className="text-sm text-muted-foreground">
                    This bill repeats regularly
                  </p>
                </div>
                <Switch
                  id="recurring"
                  checked={newBill.recurring}
                  onCheckedChange={(checked) =>
                    setNewBill({ ...newBill, recurring: checked })
                  }
                />
              </div>
              {newBill.recurring && (
                <div className="grid gap-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={newBill.frequency}
                    onValueChange={(value: 'monthly' | 'weekly' | 'yearly' | 'quarterly') =>
                      setNewBill({ ...newBill, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBill}>Add Bill</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Bills</CardDescription>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bills.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Overdue</CardDescription>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {overdueBills.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Due This Week</CardDescription>
            <Bell className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBills.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Monthly Total</CardDescription>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMonthly)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bills</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bills List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedBills.map((bill) => {
          const daysUntil = getDaysUntilDue(bill.dueDate)
          const isOverdue = daysUntil < 0
          const isDueToday = daysUntil === 0
          const isDueSoon = daysUntil > 0 && daysUntil <= 3
          const isPaid = bill.status === 'paid'

          return (
            <Card
              key={bill.id}
              className={`relative overflow-hidden ${
                isOverdue && !isPaid ? 'border-destructive' : ''
              }`}
            >
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isPaid
                        ? 'bg-success/10 text-success'
                        : isOverdue
                        ? 'bg-destructive/10 text-destructive'
                        : isDueToday || isDueSoon
                        ? 'bg-warning/10 text-warning'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isPaid ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : isOverdue ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{bill.name}</CardTitle>
                    <CardDescription>{bill.category}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!isPaid && (
                      <DropdownMenuItem onClick={() => handleMarkPaid(bill.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Paid
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDeleteBill(bill.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(bill.amount)}</p>
                    <p
                      className={`text-sm ${
                        isPaid
                          ? 'text-success'
                          : isOverdue
                          ? 'text-destructive'
                          : isDueToday
                          ? 'text-warning'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {isPaid
                        ? 'Paid'
                        : isOverdue
                        ? `${Math.abs(daysUntil)} days overdue`
                        : isDueToday
                        ? 'Due today'
                        : `${daysUntil} days left`}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {bill.recurring && (
                      <Badge variant="secondary" className="text-xs">
                        {bill.frequency}
                      </Badge>
                    )}
                    <Badge
                      variant={
                        isPaid
                          ? 'default'
                          : isOverdue
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {isPaid ? 'Paid' : isOverdue ? 'Overdue' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              {!isPaid && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${
                    isOverdue
                      ? 'bg-destructive'
                      : isDueToday || isDueSoon
                      ? 'bg-warning'
                      : 'bg-muted'
                  }`}
                />
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
