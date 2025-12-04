"use client"

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User, LogOut } from 'lucide-react'

export function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    PharmaCare
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/catalog" className="text-gray-600 hover:text-blue-600 transition-colors">
                        Medicines
                    </Link>
                    <Link href="/upload" className="text-gray-600 hover:text-blue-600 transition-colors">
                        Upload Prescription
                    </Link>
                    {user?.role === 'PHARMACIST' && (
                        <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Dashboard
                        </Link>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/cart">
                        <Button variant="ghost" size="icon">
                            <ShoppingCart className="h-5 w-5" />
                        </Button>
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-gray-500" />
                                <span className="text-sm font-medium">{user.name}</span>
                            </div>
                            <Button variant="outline" size="sm" onClick={logout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
