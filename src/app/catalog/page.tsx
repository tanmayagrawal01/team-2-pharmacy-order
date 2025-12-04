import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { PrismaClient } from '@prisma/client'
import Image from 'next/image'

const prisma = new PrismaClient()

async function getProducts() {
    return await prisma.product.findMany()
}

export default async function CatalogPage() {
    const products = await getProducts()

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Medicine Catalog</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="flex flex-col">
                            <CardHeader className="p-0">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={product.image || 'https://placehold.co/400x400?text=Medicine'}
                                        alt={product.name}
                                        fill
                                        className="object-cover rounded-t-xl"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <CardTitle className="text-lg">{product.name}</CardTitle>
                                    <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
                                </div>
                                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                                {product.requiresPrescription && (
                                    <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                                        Prescription Required
                                    </span>
                                )}
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <AddToCartButton product={product} />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    )
}
