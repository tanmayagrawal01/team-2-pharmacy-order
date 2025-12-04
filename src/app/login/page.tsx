"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Lock, Mail, UserCircle, Shield, Truck, ChevronRight, Info, User } from 'lucide-react'

export default function LoginPage() {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'CUSTOMER' | 'PHARMACIST' | 'DELIVERY'>('CUSTOMER')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 800))
        login(email, password, role)
        setIsLoading(false)
    }

    // Auto-fill demo credentials
    const fillDemo = (r: typeof role) => {
        setRole(r)
        if (r === 'CUSTOMER') setCredentials('customer@example.com', 'password123')
        if (r === 'PHARMACIST') setCredentials('admin@pharmacy.com', 'admin123')
        if (r === 'DELIVERY') setCredentials('driver@delivery.com', 'driver123')
    }

    const setCredentials = (e: string, p: string) => {
        setEmail(e)
        setPassword(p)
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -ml-20 -mt-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -mr-20 -mb-20 animate-pulse animation-delay-2000"></div>

            <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 backdrop-blur-xl relative z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                <CardHeader className="space-y-1 pb-6">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <User className="h-6 w-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center tracking-tight text-slate-900">Welcome Back</CardTitle>
                    <CardDescription className="text-center text-slate-500">
                        Sign in to access your pharmacy account
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-600 font-medium">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-slate-600 font-medium">Password</Label>
                                <Link href="#" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-slate-600 font-medium">Account Type</Label>
                            <Select value={role} onValueChange={(val: any) => setRole(val)}>
                                <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:bg-white">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CUSTOMER">
                                        <div className="flex items-center">
                                            <UserCircle className="mr-2 h-4 w-4 text-blue-500" />
                                            Customer
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="PHARMACIST">
                                        <div className="flex items-center">
                                            <Shield className="mr-2 h-4 w-4 text-purple-500" />
                                            Pharmacist
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="DELIVERY">
                                        <div className="flex items-center">
                                            <Truck className="mr-2 h-4 w-4 text-green-500" />
                                            Delivery Agent
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-200 transition-all hover:scale-[1.01]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                                    Signing in...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    Sign In <ChevronRight className="ml-2 h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    {/* Quick Demo Login Buttons */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-3 text-slate-500 text-xs uppercase font-bold tracking-wider">
                            <Info className="h-3 w-3" />
                            Quick Demo Login
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => fillDemo('CUSTOMER')}
                                className="text-xs p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-sm transition-all text-slate-600 font-medium"
                            >
                                Customer
                            </button>
                            <button
                                onClick={() => fillDemo('PHARMACIST')}
                                className="text-xs p-2 rounded-lg bg-white border border-slate-200 hover:border-purple-400 hover:text-purple-600 hover:shadow-sm transition-all text-slate-600 font-medium"
                            >
                                Pharmacist
                            </button>
                            <button
                                onClick={() => fillDemo('DELIVERY')}
                                className="text-xs p-2 rounded-lg bg-white border border-slate-200 hover:border-green-400 hover:text-green-600 hover:shadow-sm transition-all text-slate-600 font-medium"
                            >
                                Delivery
                            </button>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center pb-6">
                    <p className="text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
                            Create Account
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div >
    )
}
