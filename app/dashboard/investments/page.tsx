'use client'

import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Cell, Pie, PieChart } from 'recharts'
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

interface Investment {
  id: string
  name: string
  type: 'stocks' | 'mutual_funds' | 'bonds' | 'crypto' | 'real_estate'
  currentValue: number
  investedAmount: number
  change: number
  changePercent: number
}

const chartConfig = {
  value: {
    label: 'Portfolio Value',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const portfolioHistory = [
  { month: 'Jan', value: 280000 },
  { month: 'Feb', value: 295000 },
  { month: 'Mar', value: 310000 },
  { month: 'Apr', value: 305000 },
  { month: 'May', value: 325000 },
  { month: 'Jun', value: 340000 },
  { month: 'Jul', value: 355000 },
  { month: 'Aug', value: 380000 },
  { month: 'Sep', value: 395000 },
  { month: 'Oct', value: 420000 },
  { month: 'Nov', value: 445000 },
  { month: 'Dec', value: 475000 },
]

const initialInvestments: Investment[] = [
  {
    id: '1',
    name: 'Nifty 50 Index Fund',
    type: 'mutual_funds',
    currentValue: 150000,
    investedAmount: 120000,
    change: 30000,
    changePercent: 25,
  },
  {
    id: '2',
    name: 'HDFC Bank Shares',
    type: 'stocks',
    currentValue: 85000,
    investedAmount: 70000,
    change: 15000,
    changePercent: 21.43,
  },
  {
    id: '3',
    name: 'Government Bonds',
    type: 'bonds',
    currentValue: 100000,
    investedAmount: 95000,
    change: 5000,
    changePercent: 5.26,
  },
  {
    id: '4',
    name: 'Bitcoin',
    type: 'crypto',
    currentValue: 45000,
    investedAmount: 50000,
    change: -5000,
    changePercent: -10,
  },
  {
    id: '5',
    name: 'Reliance Industries',
    type: 'stocks',
    currentValue: 95000,
    investedAmount: 80000,
    change: 15000,
    changePercent: 18.75,
  },
]

const typeLabels: Record<string, string> = {
  stocks: 'Stocks',
  mutual_funds: 'Mutual Funds',
  bonds: 'Bonds',
  crypto: 'Cryptocurrency',
  real_estate: 'Real Estate',
}

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: 'stocks' as Investment['type'],
    currentValue: '',
    investedAmount: '',
  })

  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalInvested = investments.reduce((sum, inv) => sum + inv.investedAmount, 0)
  const totalGain = totalValue - totalInvested
  const totalGainPercent = ((totalGain / totalInvested) * 100).toFixed(2)

  // Portfolio allocation data
  const allocationData = Object.entries(
    investments.reduce((acc, inv) => {
      acc[inv.type] = (acc[inv.type] || 0) + inv.currentValue
      return acc
    }, {} as Record<string, number>)
  ).map(([type, value]) => ({
    name: typeLabels[type],
    value,
  }))

  const handleAddInvestment = () => {
    if (!newInvestment.name || !newInvestment.currentValue || !newInvestment.investedAmount) {
      return
    }

    const currentValue = parseFloat(newInvestment.currentValue)
    const investedAmount = parseFloat(newInvestment.investedAmount)
    const change = currentValue - investedAmount
    const changePercent = ((change / investedAmount) * 100)

    const investment: Investment = {
      id: Date.now().toString(),
      name: newInvestment.name,
      type: newInvestment.type,
      currentValue,
      investedAmount,
      change,
      changePercent,
    }

    setInvestments([...investments, investment])
    setNewInvestment({
      name: '',
      type: 'stocks',
      currentValue: '',
      investedAmount: '',
    })
    setIsDialogOpen(false)
  }

  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments.filter((inv) => inv.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Investments</h1>
          <p className="text-muted-foreground">
            Track your investment portfolio
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Investment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Investment</DialogTitle>
              <DialogDescription>
                Add a new investment to your portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Investment Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., HDFC Bank Shares"
                  value={newInvestment.name}
                  onChange={(e) =>
                    setNewInvestment({ ...newInvestment, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Investment Type</Label>
                <Select
                  value={newInvestment.type}
                  onValueChange={(value: Investment['type']) =>
                    setNewInvestment({ ...newInvestment, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stocks">Stocks</SelectItem>
                    <SelectItem value="mutual_funds">Mutual Funds</SelectItem>
                    <SelectItem value="bonds">Bonds</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="real_estate">Real Estate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="investedAmount">Invested Amount</Label>
                  <Input
                    id="investedAmount"
                    type="number"
                    placeholder="0.00"
                    value={newInvestment.investedAmount}
                    onChange={(e) =>
                      setNewInvestment({
                        ...newInvestment,
                        investedAmount: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currentValue">Current Value</Label>
                  <Input
                    id="currentValue"
                    type="number"
                    placeholder="0.00"
                    value={newInvestment.currentValue}
                    onChange={(e) =>
                      setNewInvestment({
                        ...newInvestment,
                        currentValue: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddInvestment}>Add Investment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Portfolio Value</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totalValue)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Invested</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totalInvested)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Gain/Loss</CardDescription>
            <CardTitle
              className={`text-2xl ${totalGain >= 0 ? 'text-success' : 'text-destructive'}`}
            >
              {totalGain >= 0 ? '+' : ''}{formatCurrency(totalGain)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Returns</CardDescription>
            <CardTitle
              className={`flex items-center gap-2 text-2xl ${
                parseFloat(totalGainPercent) >= 0 ? 'text-success' : 'text-destructive'
              }`}
            >
              {parseFloat(totalGainPercent) >= 0 ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
              {parseFloat(totalGainPercent) >= 0 ? '+' : ''}{totalGainPercent}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Growth</CardTitle>
            <CardDescription>Your portfolio value over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={portfolioHistory}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
            <CardDescription>By investment type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px]">
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {allocationData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">
                    {((item.value / totalValue) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investments List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
          <CardDescription>Individual investment performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => {
              const isPositive = investment.change >= 0

              return (
                <div
                  key={investment.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        isPositive ? 'bg-success/10' : 'bg-destructive/10'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="h-5 w-5 text-success" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{investment.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {typeLabels[investment.type]}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Invested: {formatCurrency(investment.investedAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(investment.currentValue)}
                      </p>
                      <p
                        className={`text-sm ${
                          isPositive ? 'text-success' : 'text-destructive'
                        }`}
                      >
                        {isPositive ? '+' : ''}{formatCurrency(investment.change)} (
                        {isPositive ? '+' : ''}{investment.changePercent.toFixed(2)}%)
                      </p>
                    </div>
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
                          onClick={() => handleDeleteInvestment(investment.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
