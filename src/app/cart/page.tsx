"use client"

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useCart } from '@/lib/cart-context'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CreditCard, Sparkles, Package } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'
import Image from 'next/image'

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart, addItem } = useCart()
    const { user } = useAuth()
    const router = useRouter()
    const [isCheckingOut, setIsCheckingOut] = useState(true)

    const handleCheckout = async () => {
        if (!user) {
            router.push('/login')
            return
        }
        setIsCheckingOut(true)
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500))
        alert('Order placed successfully! Your health is on the way.')
        clearCart()
        setIsCheckingOut(false)
        router.push('/orders')
    }

    const loadDemoData = () => {
        const demoProducts = [
            { id: 'demo_1', name: 'Premium Vitamin C Complex', price: 24.99, image: null },
            { id: 'demo_2', name: 'Advanced Pain Relief Gel', price: 15.50, image: null },
            { id: 'demo_3', name: 'Digital Thermometer Pro', price: 45.00, image: null },
        ]
        demoProducts.forEach(p => addItem(p))
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white font-sans">
            <Navbar />

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Shopping Cart</h1>
                        <p className="text-slate-500">
                            {items.length > 0
                                ? `You have ${items.length} item${items.length === 1 ? '' : 's'} in your cart`
                                : 'Your cart is currently empty'
                            }
                        </p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <Card className="border-dashed border-2 border-slate-200 bg-white/50 backdrop-blur-sm shadow-none">
                        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <ShoppingBag className="h-10 w-10 text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Wellness Kit is Empty</h2>
                            <p className="text-slate-500 max-w-md mb-8">
                                Browse our catalog to find the medicines and health products you need.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/catalog">
                                    <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                                        Browse Medicines
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" onClick={loadDemoData} className="rounded-full px-8">
                                    <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                                    Load Sample Items
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-6"
                                >
                                    {/* Product Image */}
                                    <div className="h-24 w-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <Package className="h-8 w-8 text-slate-400" />
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-4">${item.price.toFixed(2)} each</p>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-md hover:bg-white hover:text-red-500"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-md hover:bg-white hover:text-blue-600"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>

                                            {/* Remove Button */}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="relative">
                            <div className="sticky top-24">
                                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CreditCard className="h-5 w-5 text-blue-600" />
                                            Order Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between text-slate-600">
                                                <span>Subtotal</span>
                                                <span className="font-medium">${total.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-600">
                                                <span>Shipping Estimate</span>
                                                <span className="font-medium text-green-600">Free</span>
                                            </div>
                                            <div className="flex justify-between text-slate-600">
                                                <span>Tax</span>
                                                <span className="font-medium">$0.00</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-dashed border-slate-200 pt-4">
                                            <div className="flex justify-between items-end">
                                                <span className="font-bold text-slate-900">Total</span>
                                                <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">Inclusive of all taxes</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex-col gap-4 bg-slate-50/50 p-6">
                                        <Button
                                            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-200 transition-all hover:scale-[1.02]"
                                            onClick={handleCheckout}
                                            disabled={isCheckingOut}
                                        >
                                            {isCheckingOut ? (
                                                <span className="flex items-center">
                                                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                                                    Processing...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    Checkout Securely <ArrowRight className="ml-2 h-5 w-5" />
                                                </span>
                                            )}
                                        </Button>

                                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                                            <ShieldCheck className="h-3 w-3" />
                                            Secure SSL Encryption
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
