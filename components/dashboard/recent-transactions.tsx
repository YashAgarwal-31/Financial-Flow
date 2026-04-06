'use client'

import Link from 'next/link'
import {
  ArrowRight,
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
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { transactions, formatCurrency } from '@/lib/data'

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

const categoryColors: Record<string, string> = {
  'Food & Dining': 'bg-chart-1/10 text-chart-1',
  Shopping: 'bg-chart-2/10 text-chart-2',
  Entertainment: 'bg-chart-3/10 text-chart-3',
  Transportation: 'bg-chart-4/10 text-chart-4',
  Health: 'bg-chart-5/10 text-chart-5',
  Education: 'bg-primary/10 text-primary',
  Investment: 'bg-success/10 text-success',
  Salary: 'bg-accent/10 text-accent',
}

export function RecentTransactions() {
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/transactions" className="flex items-center gap-1">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-[350px]">
          <div className="space-y-1 px-6">
            {sortedTransactions.map((transaction) => {
              const Icon = iconMap[transaction.icon || 'wallet'] || Wallet
              const colorClass = categoryColors[transaction.category] || 'bg-muted text-muted-foreground'

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-semibold ${
                      transaction.type === 'income'
                        ? 'text-success'
                        : 'text-foreground'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{' '}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
