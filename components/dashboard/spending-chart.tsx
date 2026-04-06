'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from 'recharts'
import { spendingBreakdown, formatCurrency } from '@/lib/data'

const chartConfig = {
  value: {
    label: 'Amount',
  },
  'Food & Dining': {
    label: 'Food & Dining',
    color: 'var(--chart-1)',
  },
  Shopping: {
    label: 'Shopping',
    color: 'var(--chart-2)',
  },
  Entertainment: {
    label: 'Entertainment',
    color: 'var(--chart-3)',
  },
  Transportation: {
    label: 'Transportation',
    color: 'var(--chart-4)',
  },
  Health: {
    label: 'Health',
    color: 'var(--chart-5)',
  },
  'Bills & Utilities': {
    label: 'Bills & Utilities',
    color: 'hsl(220, 60%, 50%)',
  },
} satisfies ChartConfig

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'hsl(220, 60%, 50%)',
]

export function SpendingChart() {
  const total = spendingBreakdown.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Click a slice to filter transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[280px]">
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
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {spendingBreakdown.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 space-y-2">
          {spendingBreakdown.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
