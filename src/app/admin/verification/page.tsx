"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Eye } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

// Mock data
const initialVerifications = [
    {
        id: 'ver_1',
        customer: 'Alice Smith',
        date: '2023-10-30',
        status: 'PENDING',
        image: 'https://placehold.co/600x800?text=Prescription+1',
        notes: 'Please verify dosage for Amoxicillin'
    },
    {
        id: 'ver_2',
        customer: 'Bob Jones',
        date: '2023-10-30',
        status: 'PENDING',
        image: 'https://placehold.co/600x800?text=Prescription+2',
        notes: ''
    }
]

export default function VerificationPage() {
    const [verifications, setVerifications] = useState(initialVerifications)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const handleAction = (id: string, action: 'APPROVE' | 'REJECT') => {
        // In real app, call API
        setVerifications(current => current.filter(v => v.id !== id))
        alert(`Prescription ${action === 'APPROVE' ? 'Approved' : 'Rejected'}`)
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Prescription Verification</h2>

            {verifications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                    <p className="text-gray-500">No pending verifications</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {verifications.map((item) => (
                        <Card key={item.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{item.customer}</CardTitle>
                                        <CardDescription>{item.date}</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                        {item.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="relative h-64 w-full bg-gray-100 rounded-md mb-4 overflow-hidden group">
                                    <Image
                                        src={item.image}
                                        alt="Prescription"
                                        fill
                                        className="object-contain"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="secondary" onClick={() => setSelectedImage(item.image)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Full Size
                                        </Button>
                                    </div>
                                </div>
                                {item.notes && (
                                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                        <span className="font-semibold">Note:</span> {item.notes}
                                    </p>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between gap-4">
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => handleAction(item.id, 'REJECT')}
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                </Button>
                                <Button
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    onClick={() => handleAction(item.id, 'APPROVE')}
                                >
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Simple Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-4xl w-full h-full max-h-[90vh]">
                        <Image
                            src={selectedImage}
                            alt="Full Prescription"
                            fill
                            className="object-contain"
                        />
                        <Button
                            className="absolute top-4 right-4"
                            variant="destructive"
                            onClick={() => setSelectedImage(null)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
