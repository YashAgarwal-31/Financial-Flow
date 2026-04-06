import { StatsCards } from '@/components/dashboard/stats-cards'
import { BalanceChart } from '@/components/dashboard/balance-chart'
import { UpcomingBills } from '@/components/dashboard/upcoming-bills'
import { GoalsCard } from '@/components/dashboard/goals-card'
import { SpendingChart } from '@/components/dashboard/spending-chart'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {"Here's your financial summary for today"}
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-3">
        <BalanceChart />
        <UpcomingBills />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GoalsCard />
        <SpendingChart />
        <RecentTransactions />
      </div>
    </div>
  )
}
