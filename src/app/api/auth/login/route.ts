import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password, role } = body

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Verify password (simple string comparison for now, should use bcrypt in prod)
        if (user.password !== password) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            )
        }

        // Verify role
        if (user.role !== role) {
            return NextResponse.json(
                { error: `User is not registered as a ${role}` },
                { status: 403 }
            )
        }

        // Return user data (excluding password)
        const { password: _, ...userWithoutPassword } = user
        return NextResponse.json({ user: userWithoutPassword })

    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
