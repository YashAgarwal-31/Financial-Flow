'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Line,
  LineChart,
  ResponsiveContainer,
} from 'recharts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import { balanceData, spendingBreakdown, formatCurrency, calculateTotals } from '@/lib/data'

const chartConfig = {
  balance: {
    label: 'Balance',
    color: 'var(--chart-1)',
  },
  income: {
    label: 'Income',
    color: 'var(--chart-2)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

const monthlyData = [
  { month: 'Jan', income: 55000, expenses: 42000, savings: 13000 },
  { month: 'Feb', income: 62000, expenses: 49000, savings: 13000 },
  { month: 'Mar', income: 58000, expenses: 64000, savings: -6000 },
  { month: 'Apr', income: 71000, expenses: 56000, savings: 15000 },
  { month: 'May', income: 68000, expenses: 61000, savings: 7000 },
  { month: 'Jun', income: 75000, expenses: 68000, savings: 7000 },
]

const weeklySpending = [
  { day: 'Mon', amount: 2500 },
  { day: 'Tue', amount: 1800 },
  { day: 'Wed', amount: 3200 },
  { day: 'Thu', amount: 2100 },
  { day: 'Fri', amount: 4500 },
  { day: 'Sat', amount: 5800 },
  { day: 'Sun', amount: 3100 },
]

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'hsl(220, 60%, 50%)',
]

export default function AnalyticsPage() {
  const { totalIncome, totalExpenses, totalBalance } = calculateTotals()
  const savingsRate = Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your financial health
          </p>
        </div>
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Average Income</CardDescription>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(65500)}</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Average Expenses</CardDescription>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(56667)}</div>
            <p className="text-xs text-muted-foreground">-5% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Savings Rate</CardDescription>
            <PiggyBank className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsRate > 0 ? savingsRate : 0}%</div>
            <p className="text-xs text-muted-foreground">of total income</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Net Worth Growth</CardDescription>
            <Wallet className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{formatCurrency(49000)}</div>
            <p className="text-xs text-muted-foreground">this period</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Monthly comparison over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={monthlyData}>
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
                <Bar dataKey="income" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Trend</CardTitle>
            <CardDescription>Monthly savings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={monthlyData}>
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
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--chart-1)', r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Spending Pattern</CardTitle>
            <CardDescription>Your spending by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart data={weeklySpending}>
                <defs>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
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
                  dataKey="amount"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fill="url(#colorSpending)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Where your money goes</CardDescription>
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
                  data={spendingBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {spendingBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {spendingBreakdown.slice(0, 4).map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Balance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
          <CardDescription>Your cumulative balance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={balanceData}>
              <defs>
                <linearGradient id="colorBalance2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
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
                dataKey="balance"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#colorBalance2)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
