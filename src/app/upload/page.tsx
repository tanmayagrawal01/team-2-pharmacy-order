"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return
        if (!user) {
            router.push('/login')
            return
        }

        setIsUploading(true)

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsUploading(false)
        setUploadSuccess(true)

        // In a real app, we would send the file to an API endpoint
        // and create an Order record in the database.
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-12 flex justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Upload Prescription</CardTitle>
                        <CardDescription>
                            Upload a clear image of your doctor's prescription to place an order.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!uploadSuccess ? (
                            <>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
                                    <Input
                                        type="file"
                                        accept="image/*,.pdf"
                                        className="hidden"
                                        id="prescription-upload"
                                        onChange={handleFileChange}
                                    />
                                    <Label htmlFor="prescription-upload" className="cursor-pointer flex flex-col items-center">
                                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {file ? file.name : "Click to upload or drag and drop"}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">
                                            PNG, JPG or PDF (MAX. 5MB)
                                        </span>
                                    </Label>
                                </div>

                                <Button
                                    className="w-full"
                                    disabled={!file || isUploading}
                                    onClick={handleUpload}
                                >
                                    {isUploading ? "Uploading..." : "Submit Prescription"}
                                </Button>
                            </>
                        ) : (
                            <div className="text-center py-6">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Upload Successful!</h3>
                                <p className="text-gray-600 mb-6">
                                    Your prescription has been submitted for verification. We will notify you once a pharmacist reviews it.
                                </p>
                                <Button className="w-full" onClick={() => router.push('/orders')}>
                                    View My Orders
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
