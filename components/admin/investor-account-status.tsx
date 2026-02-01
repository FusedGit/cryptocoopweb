'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { UserPlus, UserCheck, UserX, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface InvestorAccountStatusProps {
  investorId: string
  investorEmail: string
  isSuperAdmin: boolean
}

export function InvestorAccountStatus({ investorId, investorEmail, isSuperAdmin }: InvestorAccountStatusProps) {
  const router = useRouter()
  const [hasAccount, setHasAccount] = useState<boolean | null>(null)
  const [authUser, setAuthUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [creating, setCreating] = useState(false)
  const [impersonating, setImpersonating] = useState(false)

  useEffect(() => {
    checkAccountStatus()
  }, [investorId])

  const checkAccountStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/investors/${investorId}/auth`)
      const data = await response.json()
      
      setHasAccount(data.hasAccount)
      setAuthUser(data.user || null)
    } catch (error) {
      console.error('Error checking account status:', error)
    } finally {
      setLoading(false)
    }
  }

  const createAccount = async () => {
    setCreating(true)
    try {
      const response = await fetch(`/api/admin/investors/${investorId}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      alert('Account created! Confirmation email sent to ' + investorEmail)
      setCreateDialogOpen(false)
      setPassword('')
      await checkAccountStatus()
      router.refresh()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setCreating(false)
    }
  }

  const impersonateUser = async () => {
    if (!authUser) return

    setImpersonating(true)
    try {
      const response = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: authUser.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate impersonation link')
      }

      // Open the magic link in new tab
      window.open(data.link, '_blank')
      alert('Impersonation link opened in new tab. You will be logged in as ' + data.email)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setImpersonating(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Checking...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Account Status
          {hasAccount ? (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <UserCheck className="h-3 w-3 mr-1" />
              Active
            </Badge>
          ) : (
            <Badge variant="secondary">
              <UserX className="h-3 w-3 mr-1" />
              No Account
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {hasAccount 
            ? 'Investor has a registered account and can access the portal'
            : 'Investor profile exists but no login account yet'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasAccount && authUser ? (
          <div className="space-y-3">
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Account Active</AlertTitle>
              <AlertDescription>
                <div className="space-y-1 mt-2">
                  <p className="text-xs">
                    <span className="font-medium">Email:</span> {authUser.email}
                  </p>
                  <p className="text-xs">
                    <span className="font-medium">Confirmed:</span> {authUser.email_confirmed_at ? 'Yes' : 'No'}
                  </p>
                  <p className="text-xs">
                    <span className="font-medium">Last sign in:</span> {authUser.last_sign_in_at 
                      ? new Date(authUser.last_sign_in_at).toLocaleString()
                      : 'Never'}
                  </p>
                </div>
              </AlertDescription>
            </Alert>

            {isSuperAdmin && (
              <Button
                onClick={impersonateUser}
                disabled={impersonating}
                variant="outline"
                className="w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                {impersonating ? 'Generating link...' : 'Impersonate User (Debug)'}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>No Login Account</AlertTitle>
              <AlertDescription>
                Investor cannot access the portal yet. Create an account to send them login credentials.
              </AlertDescription>
            </Alert>

            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account & Send Invite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Investor Account</DialogTitle>
                  <DialogDescription>
                    Create a login account for {investorEmail}. They will receive an email to confirm and set their password.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Temporary Password (Optional)</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Leave empty for random password"
                    />
                    <p className="text-xs text-muted-foreground">
                      If empty, a secure random password will be generated
                    </p>
                  </div>

                  <Alert>
                    <AlertTitle>What happens next:</AlertTitle>
                    <AlertDescription>
                      <ol className="list-decimal list-inside text-xs space-y-1 mt-2">
                        <li>Account created with email: {investorEmail}</li>
                        <li>Confirmation email sent to investor</li>
                        <li>Investor clicks link to verify email</li>
                        <li>Investor can access dashboard at /dashboard</li>
                      </ol>
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createAccount} disabled={creating}>
                    {creating ? 'Creating...' : 'Create Account & Send Email'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
