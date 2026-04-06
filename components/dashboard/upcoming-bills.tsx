'use client'

import Link from 'next/link'
import { ArrowRight, AlertCircle, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { bills, formatCurrency, getDaysUntilDue } from '@/lib/data'

export function UpcomingBills() {
  const sortedBills = [...bills].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )
  
  const overdueBills = sortedBills.filter((bill) => getDaysUntilDue(bill.dueDate) < 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">Upcoming Bills</CardTitle>
          {overdueBills.length > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {overdueBills.length}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/bills" className="flex items-center gap-1">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-[300px]">
          <div className="space-y-1 px-6">
            {sortedBills.slice(0, 5).map((bill) => {
              const daysUntil = getDaysUntilDue(bill.dueDate)
              const isOverdue = daysUntil < 0
              const isDueToday = daysUntil === 0
              const isDueSoon = daysUntil > 0 && daysUntil <= 3

              return (
                <div
                  key={bill.id}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        isOverdue
                          ? 'bg-destructive/10 text-destructive'
                          : isDueToday
                          ? 'bg-warning/10 text-warning'
                          : isDueSoon
                          ? 'bg-warning/10 text-warning'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isOverdue ? (
                        <AlertCircle className="h-5 w-5" />
                      ) : bill.status === 'paid' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{bill.name}</p>
                      <p
                        className={`text-sm ${
                          isOverdue
                            ? 'text-destructive'
                            : isDueToday
                            ? 'text-warning'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {isOverdue
                          ? `${Math.abs(daysUntil)}d overdue`
                          : isDueToday
                          ? 'Due today'
                          : `${daysUntil}d left`}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">{formatCurrency(bill.amount)}</p>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
