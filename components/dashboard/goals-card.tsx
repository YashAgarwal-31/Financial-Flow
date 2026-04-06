'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Plane, Laptop, TrendingUp, Home } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { goals, formatCurrency } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  plane: Plane,
  laptop: Laptop,
  'trending-up': TrendingUp,
  home: Home,
}

export function GoalsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Goals</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/goals" className="flex items-center gap-1">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.slice(0, 3).map((goal) => {
            const progress = Math.round(
              (goal.currentAmount / goal.targetAmount) * 100
            )
            const Icon = iconMap[goal.icon || 'shield'] || Shield

            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `color-mix(in oklch, ${goal.color} 20%, transparent)` }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: goal.color }}
                      />
                    </div>
                    <span className="font-medium">{goal.name}</span>
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {progress}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(goal.currentAmount)} /{' '}
                  {formatCurrency(goal.targetAmount)}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
