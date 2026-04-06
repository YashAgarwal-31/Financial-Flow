'use client'

import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, calculateTotals } from '@/lib/data'

export function StatsCards() {
  const { totalIncome, totalExpenses, totalBalance } = calculateTotals()

  const stats = [
    {
      title: 'Total Balance',
      value: formatCurrency(totalBalance),
      change: '+60.4%',
      changeType: 'positive' as const,
      icon: Wallet,
      description: 'vs last month',
    },
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      change: '+16.8%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'vs last month',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      change: '-33.6%',
      changeType: 'negative' as const,
      icon: TrendingDown,
      description: 'vs last month',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 text-sm">
              {stat.changeType === 'positive' ? (
                <ArrowUpRight className="h-4 w-4 text-success" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-destructive" />
              )}
              <span
                className={
                  stat.changeType === 'positive'
                    ? 'text-success'
                    : 'text-destructive'
                }
              >
                {stat.change}
              </span>
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 ${
              stat.changeType === 'positive' ? 'bg-success' : 'bg-destructive'
            }`}
          />
        </Card>
      ))}
    </div>
  )
}
