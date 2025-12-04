"use client"

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/lib/cart-context'
import { Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart()
    const { user } = useAuth()
    const router = useRouter()

    const handleCheckout = () => {
        if (!user) {
            router.push('/login')
            return
        }
        // In a real app, this would create an order
        alert('Order placed successfully!')
        clearCart()
        router.push('/orders')
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
                        <Link href="/catalog">
                            <Button>Browse Medicines</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-4">
                            {items.map((item) => (
                                <Card key={item.id}>
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                                                Img
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-blue-600">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center border rounded-md">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                                        Checkout
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
