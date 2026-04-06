'use client'

import { useState } from 'react'
import {
  Plus,
  Target,
  Shield,
  Plane,
  Laptop,
  TrendingUp,
  Home,
  MoreHorizontal,
  Pencil,
  Trash2,
  Wallet,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
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
import { goals as initialGoals, formatCurrency } from '@/lib/data'
import type { Goal } from '@/lib/types'

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  plane: Plane,
  laptop: Laptop,
  'trending-up': TrendingUp,
  home: Home,
  target: Target,
  wallet: Wallet,
}

const iconOptions = [
  { value: 'shield', label: 'Shield', Icon: Shield },
  { value: 'plane', label: 'Plane', Icon: Plane },
  { value: 'laptop', label: 'Laptop', Icon: Laptop },
  { value: 'trending-up', label: 'Investment', Icon: TrendingUp },
  { value: 'home', label: 'Home', Icon: Home },
  { value: 'target', label: 'Target', Icon: Target },
  { value: 'wallet', label: 'Wallet', Icon: Wallet },
]

const colorOptions = [
  { value: 'var(--chart-1)', label: 'Teal' },
  { value: 'var(--chart-2)', label: 'Green' },
  { value: 'var(--chart-3)', label: 'Emerald' },
  { value: 'var(--chart-4)', label: 'Blue' },
  { value: 'var(--chart-5)', label: 'Yellow' },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [fundsToAdd, setFundsToAdd] = useState('')
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    icon: 'target',
    color: 'var(--chart-1)',
  })

  const totalTargetAmount = goals.reduce((sum, g) => sum + g.targetAmount, 0)
  const totalCurrentAmount = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const overallProgress = Math.round((totalCurrentAmount / totalTargetAmount) * 100)

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount) {
      return
    }

    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount) || 0,
      deadline: newGoal.deadline || undefined,
      icon: newGoal.icon,
      color: newGoal.color,
    }

    setGoals([...goals, goal])
    setNewGoal({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      icon: 'target',
      color: 'var(--chart-1)',
    })
    setIsDialogOpen(false)
  }

  const handleAddFunds = () => {
    if (!selectedGoal || !fundsToAdd) return

    setGoals(
      goals.map((g) =>
        g.id === selectedGoal.id
          ? {
              ...g,
              currentAmount: Math.min(
                g.currentAmount + parseFloat(fundsToAdd),
                g.targetAmount
              ),
            }
          : g
      )
    )
    setFundsToAdd('')
    setSelectedGoal(null)
    setIsAddFundsOpen(false)
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financial Goals</h1>
          <p className="text-muted-foreground">
            Set and track your savings goals
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new financial goal to track your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Emergency Fund"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="targetAmount">Target Amount</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="0.00"
                    value={newGoal.targetAmount}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, targetAmount: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currentAmount">Current Amount</Label>
                  <Input
                    id="currentAmount"
                    type="number"
                    placeholder="0.00"
                    value={newGoal.currentAmount}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, currentAmount: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline">Target Date (Optional)</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select
                    value={newGoal.icon}
                    onValueChange={(value) => setNewGoal({ ...newGoal, icon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.Icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <Select
                    value={newGoal.color}
                    onValueChange={(value) => setNewGoal({ ...newGoal, color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: option.value }}
                            />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            Your combined savings towards all goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {formatCurrency(totalCurrentAmount)}
              </span>
              <span className="text-muted-foreground">
                of {formatCurrency(totalTargetAmount)}
              </span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {overallProgress}% complete
              </span>
              <span className="text-muted-foreground">
                {formatCurrency(totalTargetAmount - totalCurrentAmount)} remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100)
          const Icon = iconMap[goal.icon || 'target'] || Target
          const remaining = goal.targetAmount - goal.currentAmount
          const isComplete = progress >= 100

          return (
            <Card key={goal.id} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${goal.color} 20%, transparent)`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: goal.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{goal.name}</CardTitle>
                    {goal.deadline && (
                      <CardDescription>
                        Target: {new Date(goal.deadline).toLocaleDateString('en-IN', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </CardDescription>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedGoal(goal)
                        setIsAddFundsOpen(true)
                      }}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Add Funds
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: goal.color }}
                    >
                      {progress}%
                    </span>
                    {isComplete && (
                      <span className="text-sm font-medium text-success">
                        Complete!
                      </span>
                    )}
                  </div>
                  <Progress
                    value={progress}
                    className="h-2"
                    style={
                      {
                        '--progress-color': goal.color,
                      } as React.CSSProperties
                    }
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Saved</p>
                    <p className="font-medium">{formatCurrency(goal.currentAmount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-medium">{formatCurrency(goal.targetAmount)}</p>
                  </div>
                </div>
                {!isComplete && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedGoal(goal)
                      setIsAddFundsOpen(true)
                    }}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Add Funds
                  </Button>
                )}
              </CardContent>
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: goal.color }}
              />
            </Card>
          )
        })}
      </div>

      {/* Add Funds Dialog */}
      <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to {selectedGoal?.name}</DialogTitle>
            <DialogDescription>
              Enter the amount you want to add to this goal.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-2">
              <Label htmlFor="funds">Amount</Label>
              <Input
                id="funds"
                type="number"
                placeholder="0.00"
                value={fundsToAdd}
                onChange={(e) => setFundsToAdd(e.target.value)}
              />
            </div>
            {selectedGoal && (
              <p className="mt-2 text-sm text-muted-foreground">
                Current: {formatCurrency(selectedGoal.currentAmount)} /{' '}
                {formatCurrency(selectedGoal.targetAmount)}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFundsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFunds}>Add Funds</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
