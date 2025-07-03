const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const hashedAdmin = await bcrypt.hash('admin123', 10)
  const hashedUser = await bcrypt.hash('user123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedAdmin,
      role: 'ADMIN',
    },
  })

  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'User',
      email: 'user@example.com',
      password: hashedUser,
      role: 'USER',
    },
  })

  await prisma.category.createMany({
    data: [
      { name: 'Elektronik' },
      { name: 'Giyim' },
      { name: 'Kitap' }
    ],
    skipDuplicates: true
  })

  await prisma.product.create({
    data: {
      name: 'Laptop',
      description: 'Yüksek performanslı dizüstü',
      price: 15999,
      stock: 10,
      category: {
        connect: { name: 'Elektronik' }
      }
    }
  })
}

main()
  .then(() => console.log('✔️ Seed tamamlandı.'))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
