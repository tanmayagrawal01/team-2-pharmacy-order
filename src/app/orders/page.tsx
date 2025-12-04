"use client"

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Mock data - in real app fetch from API
const mockOrders = [
    {
        id: 'ord_123',
        date: '2023-10-25',
        status: 'DELIVERED',
        total: 25.50,
        items: ['Paracetamol', 'Vitamin C']
    },
    {
        id: 'ord_124',
        date: '2023-10-28',
        status: 'PROCESSING',
        total: 12.00,
        items: ['Amoxicillin']
    },
    {
        id: 'ord_125',
        date: '2023-10-29',
        status: 'PENDING',
        total: 0.00,
        items: ['Prescription Upload']
    }
]

export default function OrdersPage() {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user, router])

    if (!user) return null

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                <div className="space-y-4">
                    {mockOrders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                                    <CardDescription>{order.date}</CardDescription>
                                </div>
                                <Badge variant={
                                    order.status === 'DELIVERED' ? 'default' :
                                        order.status === 'PROCESSING' ? 'secondary' : 'outline'
                                }>
                                    {order.status}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="text-sm text-gray-600">
                                        {order.items.join(', ')}
                                    </div>
                                    <div className="font-bold">
                                        ${order.total.toFixed(2)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    )
}
