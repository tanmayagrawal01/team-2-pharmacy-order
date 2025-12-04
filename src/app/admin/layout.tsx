"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, FileCheck, Package, LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { user, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user || user.role !== 'PHARMACIST') {
            router.push('/login')
        }
    }, [user, router])

    if (!user || user.role !== 'PHARMACIST') return null

    const links = [
        { href: '/admin', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/verification', label: 'Verification', icon: FileCheck },
        { href: '/admin/inventory', label: 'Inventory', icon: Package },
    ]

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-blue-600">PharmaAdmin</h1>
                    <p className="text-sm text-gray-500">Pharmacist Portal</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href
                        return (
                            <Link key={link.href} href={link.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {link.label}
                                </Button>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-2">
                            {user.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
