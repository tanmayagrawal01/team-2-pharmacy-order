import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create Users
    const customer = await prisma.user.upsert({
        where: { email: 'customer@example.com' },
        update: {},
        create: {
            email: 'customer@example.com',
            name: 'John Doe',
            password: 'password123', // In a real app, hash this!
            role: 'CUSTOMER',
        },
    })

    const pharmacist = await prisma.user.upsert({
        where: { email: 'admin@pharmacy.com' },
        update: {},
        create: {
            email: 'admin@pharmacy.com',
            name: 'Jane Pharmacist',
            password: 'adminpassword',
            role: 'PHARMACIST',
        },
    })

    const delivery = await prisma.user.upsert({
        where: { email: 'driver@delivery.com' },
        update: {},
        create: {
            email: 'driver@delivery.com',
            name: 'Dave Driver',
            password: 'driverpassword',
            role: 'DELIVERY',
        },
    })

    console.log({ customer, pharmacist, delivery })

    // Create Products
    const products = [
        {
            name: 'Paracetamol 500mg',
            description: 'Pain reliever and fever reducer.',
            price: 5.00,
            stock: 100,
            requiresPrescription: false,
            image: 'https://placehold.co/400x400?text=Paracetamol',
        },
        {
            name: 'Amoxicillin 500mg',
            description: 'Antibiotic for bacterial infections.',
            price: 12.50,
            stock: 50,
            requiresPrescription: true,
            image: 'https://placehold.co/400x400?text=Amoxicillin',
        },
        {
            name: 'Vitamin C 1000mg',
            description: 'Immune system support supplement.',
            price: 8.00,
            stock: 200,
            requiresPrescription: false,
            image: 'https://placehold.co/400x400?text=Vitamin+C',
        },
        {
            name: 'Ibuprofen 400mg',
            description: 'Anti-inflammatory pain reliever.',
            price: 6.50,
            stock: 80,
            requiresPrescription: false,
            image: 'https://placehold.co/400x400?text=Ibuprofen',
        },
        {
            name: 'Metformin 500mg',
            description: 'Medication for type 2 diabetes.',
            price: 15.00,
            stock: 60,
            requiresPrescription: true,
            image: 'https://placehold.co/400x400?text=Metformin',
        },
    ]

    for (const p of products) {
        await prisma.product.create({
            data: p,
        })
    }

    console.log('Seeded products')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
