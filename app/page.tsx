import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, PieChart, Target, Zap, LineChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: LineChart,
    title: 'Track Spending',
    description: 'Monitor your expenses with detailed breakdowns and visualizations.',
  },
  {
    icon: Target,
    title: 'Set Goals',
    description: 'Create financial goals and track your progress towards achieving them.',
  },
  {
    icon: PieChart,
    title: 'Budget Analysis',
    description: 'Get insights into your spending patterns across different categories.',
  },
  {
    icon: Shield,
    title: 'Bill Reminders',
    description: 'Never miss a payment with smart bill tracking and notifications.',
  },
  {
    icon: Zap,
    title: 'Quick Overview',
    description: 'See your complete financial health at a glance on your dashboard.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Tracking',
    description: 'Monitor your investments and portfolio growth over time.',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="font-bold text-lg">FinanceFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/dashboard">Open Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border bg-muted px-4 py-1.5 text-sm">
              <Zap className="mr-2 h-4 w-4 text-primary" />
              Smart Financial Management
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Take Control of Your{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground text-pretty">
              Track your income, expenses, bills, and financial goals all in one place.
              Make informed decisions with powerful insights and beautiful visualizations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard" className="gap-2">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24 border-t">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Everything You Need to Manage Your Finances
            </h2>
            <p className="text-muted-foreground">
              Powerful tools designed to help you understand and improve your financial health.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="relative overflow-hidden group">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24">
          <div className="rounded-2xl bg-primary p-8 md:p-16 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to Start Your Financial Journey?
            </h2>
            <p className="mb-8 text-primary-foreground/80 max-w-xl mx-auto">
              Join thousands of users who have taken control of their finances with FinanceFlow.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard" className="gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <TrendingUp className="h-3 w-3" />
            </div>
            <span className="text-sm font-medium">FinanceFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
