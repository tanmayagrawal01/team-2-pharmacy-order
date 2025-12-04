"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function LoginPage() {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'CUSTOMER' | 'PHARMACIST' | 'DELIVERY'>('CUSTOMER')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        login(email, password, role)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Pharmacy Login</CardTitle>
                    <CardDescription>Select your role to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={role} onValueChange={(val: any) => setRole(val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                                    <SelectItem value="PHARMACIST">Pharmacist</SelectItem>
                                    <SelectItem value="DELIVERY">Delivery Agent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                    <div className="mt-4 text-sm text-gray-500">
                        <p>Demo Accounts:</p>
                        <ul className="list-disc list-inside">
                            <li>customer@example.com</li>
                            <li>admin@pharmacy.com</li>
                            <li>driver@delivery.com</li>
                        </ul>
                    </div>

                </CardContent>
                <div className="p-6 pt-0 flex justify-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </Card>
        </div >
    )
}
