"use client"

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Phone, CheckCircle, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Mock data
const initialDeliveries = [
    {
        id: 'ord_124',
        customer: 'Bob Jones',
        address: '123 Maple Street, Springfield',
        phone: '+1 (555) 123-4567',
        status: 'OUT_FOR_DELIVERY',
        items: 'Amoxicillin (x1)'
    },
    {
        id: 'ord_126',
        customer: 'Carol White',
        address: '456 Oak Avenue, Springfield',
        phone: '+1 (555) 987-6543',
        status: 'PROCESSING',
        items: 'Vitamin C (x2), Ibuprofen (x1)'
    }
]

export default function DeliveryPage() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const [deliveries, setDeliveries] = useState(initialDeliveries)

    useEffect(() => {
        if (!user || user.role !== 'DELIVERY') {
            router.push('/login')
        }
    }, [user, router])

    const handleStatusUpdate = (id: string) => {
        setDeliveries(current =>
            current.map(d =>
                d.id === id ? { ...d, status: 'DELIVERED' } : d
            )
        )
        alert('Order marked as Delivered!')
    }

    if (!user || user.role !== 'DELIVERY') return null

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-blue-600">PharmaDelivery</h1>
                    <Button variant="ghost" onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Assigned Deliveries</h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {deliveries.map((delivery) => (
                        <Card key={delivery.id} className={delivery.status === 'DELIVERED' ? 'opacity-60' : ''}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Order #{delivery.id}</CardTitle>
                                        <CardDescription>{delivery.customer}</CardDescription>
                                    </div>
                                    <Badge variant={delivery.status === 'DELIVERED' ? 'default' : 'secondary'}>
                                        {delivery.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-2">
                                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <p className="text-sm">{delivery.address}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                    <p className="text-sm">{delivery.phone}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-md text-sm">
                                    <span className="font-semibold">Items:</span> {delivery.items}
                                </div>
                            </CardContent>
                            <CardFooter>
                                {delivery.status !== 'DELIVERED' ? (
                                    <Button className="w-full" onClick={() => handleStatusUpdate(delivery.id)}>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Mark as Delivered
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="w-full" disabled>
                                        Completed
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
