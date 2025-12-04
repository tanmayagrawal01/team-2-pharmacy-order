"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type UserRole = 'CUSTOMER' | 'PHARMACIST' | 'DELIVERY'

interface User {
    id: string
    name: string
    email: string
    role: UserRole
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string, role: UserRole) => Promise<void>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('pharmacy_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string, role: UserRole) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            })

            if (!res.ok) {
                const error = await res.json()
                alert(error.error || 'Login failed')
                return
            }

            const data = await res.json()
            const user = data.user

            setUser(user)
            localStorage.setItem('pharmacy_user', JSON.stringify(user))

            if (role === 'PHARMACIST') router.push('/admin')
            else if (role === 'DELIVERY') router.push('/delivery')
            else router.push('/')
        } catch (error) {
            console.error('Login error:', error)
            alert('An error occurred during login')
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('pharmacy_user')
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
