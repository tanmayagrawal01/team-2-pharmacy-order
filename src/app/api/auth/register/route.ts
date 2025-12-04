import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, password, role } = body

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            )
        }

        // Create new user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password, // In a real app, hash this password!
                role,
            },
        })

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        )
    }
}
