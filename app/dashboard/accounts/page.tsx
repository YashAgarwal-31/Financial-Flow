'use client'

import { useState } from 'react'
import {
  Plus,
  CreditCard,
  Wallet,
  Building2,
  PiggyBank,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency } from '@/lib/data'

interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  accountNumber: string
  institution: string
  color: string
}

const accountTypeIcons = {
  checking: Wallet,
  savings: PiggyBank,
  credit: CreditCard,
  investment: Building2,
}

const accountTypeLabels = {
  checking: 'Checking',
  savings: 'Savings',
  credit: 'Credit Card',
  investment: 'Investment',
}

const initialAccounts: Account[] = [
  {
    id: '1',
    name: 'Primary Checking',
    type: 'checking',
    balance: 45000,
    accountNumber: '****4532',
    institution: 'HDFC Bank',
    color: 'var(--chart-1)',
  },
  {
    id: '2',
    name: 'Emergency Savings',
    type: 'savings',
    balance: 125000,
    accountNumber: '****7891',
    institution: 'SBI',
    color: 'var(--chart-2)',
  },
  {
    id: '3',
    name: 'Credit Card',
    type: 'credit',
    balance: -15000,
    accountNumber: '****2345',
    institution: 'ICICI Bank',
    color: 'var(--chart-5)',
  },
  {
    id: '4',
    name: 'Investment Account',
    type: 'investment',
    balance: 350000,
    accountNumber: '****9012',
    institution: 'Zerodha',
    color: 'var(--chart-3)',
  },
]

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [showBalances, setShowBalances] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: 'checking' as Account['type'],
    balance: '',
    accountNumber: '',
    institution: '',
  })

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
  const totalAssets = accounts.filter((a) => a.balance > 0).reduce((sum, a) => sum + a.balance, 0)
  const totalLiabilities = accounts.filter((a) => a.balance < 0).reduce((sum, a) => sum + Math.abs(a.balance), 0)

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.institution) return

    const account: Account = {
      id: Date.now().toString(),
      name: newAccount.name,
      type: newAccount.type,
      balance: parseFloat(newAccount.balance) || 0,
      accountNumber: `****${Math.floor(1000 + Math.random() * 9000)}`,
      institution: newAccount.institution,
      color: `var(--chart-${Math.floor(Math.random() * 5) + 1})`,
    }

    setAccounts([...accounts, account])
    setNewAccount({
      name: '',
      type: 'checking',
      balance: '',
      accountNumber: '',
      institution: '',
    })
    setIsDialogOpen(false)
  }

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">
            Manage your bank accounts and cards
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowBalances(!showBalances)}
          >
            {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
                <DialogDescription>
                  Link a new bank account or card
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Account Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Primary Checking"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Account Type</Label>
                    <Select
                      value={newAccount.type}
                      onValueChange={(value: Account['type']) =>
                        setNewAccount({ ...newAccount, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="balance">Current Balance</Label>
                    <Input
                      id="balance"
                      type="number"
                      placeholder="0.00"
                      value={newAccount.balance}
                      onChange={(e) =>
                        setNewAccount({ ...newAccount, balance: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="institution">Financial Institution</Label>
                  <Input
                    id="institution"
                    placeholder="e.g., HDFC Bank"
                    value={newAccount.institution}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, institution: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAccount}>Add Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net Worth</CardDescription>
            <CardTitle className="text-2xl">
              {showBalances ? formatCurrency(totalBalance) : '********'}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Assets</CardDescription>
            <CardTitle className="text-2xl text-success">
              {showBalances ? formatCurrency(totalAssets) : '********'}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Liabilities</CardDescription>
            <CardTitle className="text-2xl text-destructive">
              {showBalances ? formatCurrency(totalLiabilities) : '********'}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const Icon = accountTypeIcons[account.type]
          const isNegative = account.balance < 0

          return (
            <Card key={account.id} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${account.color} 20%, transparent)`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: account.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{account.name}</CardTitle>
                    <CardDescription>
                      {account.institution} {account.accountNumber}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p
                    className={`text-2xl font-bold ${
                      isNegative ? 'text-destructive' : ''
                    }`}
                  >
                    {showBalances ? formatCurrency(account.balance) : '********'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {accountTypeLabels[account.type]}
                  </p>
                </div>
              </CardContent>
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: account.color }}
              />
            </Card>
          )
        })}
      </div>
    </div>
  )
}
