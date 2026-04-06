'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Monitor, Bell, Lock, User, CreditCard, Palette, Globe } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    billReminders: true,
    goalUpdates: true,
    weeklyReport: false,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Profile</CardTitle>
            </div>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize how the app looks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="h-5 w-5" />
                  <span>Light</span>
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="h-5 w-5" />
                  <span>Dark</span>
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => setTheme('system')}
                >
                  <Monitor className="h-5 w-5" />
                  <span>System</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications in browser
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Bill Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminded before bills are due
                </p>
              </div>
              <Switch
                checked={notifications.billReminders}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, billReminders: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Goal Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about goal progress
                </p>
              </div>
              <Switch
                checked={notifications.goalUpdates}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, goalUpdates: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Report</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly financial summary
                </p>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weeklyReport: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Currency & Region */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle>Currency & Region</CardTitle>
            </div>
            <CardDescription>
              Set your preferred currency and regional settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Currency</Label>
                <Select defaultValue="inr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">Indian Rupee (INR)</SelectItem>
                    <SelectItem value="usd">US Dollar (USD)</SelectItem>
                    <SelectItem value="eur">Euro (EUR)</SelectItem>
                    <SelectItem value="gbp">British Pound (GBP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Date Format</Label>
                <Select defaultValue="dd/mm/yyyy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Manage your security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div></div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <Button>Update Password</Button>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Export Data</Label>
                <p className="text-sm text-muted-foreground">
                  Download all your financial data
                </p>
              </div>
              <Button variant="outline">Export</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-destructive">Delete Account</Label>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and data
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
