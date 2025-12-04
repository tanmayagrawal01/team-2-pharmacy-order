"use client"

import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'

interface Product {
    id: string
    name: string
    price: number
    image?: string | null
}

export function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart()
    const [isAdded, setIsAdded] = useState(false)

    const handleAdd = () => {
        addItem(product)
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <Button className="w-full" onClick={handleAdd} disabled={isAdded}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAdded ? "Added!" : "Add to Cart"}
        </Button>
    )
}
