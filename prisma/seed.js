// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const student1 = await prisma.student.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'James',
      gender: 'Male',
      dateOfBirth: new Date('2000-01-01'),
      primaryAddress: '123 Main Street',
      fathersName: 'Michael Doe',
      mothersName: 'Susan Doe',
      guardianName: 'Michael Doe',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    },
  });

  const student2 = await prisma.student.create({
    data: {
      firstName: 'Jane',
      lastName: 'Doe',
      middleName: 'Mary',
      gender: 'Female',
      dateOfBirth: new Date('2001-02-01'),
      primaryAddress: '456 Elm Street',
      fathersName: 'Michael Doe',
      mothersName: 'Susan Doe',
      guardianName: 'Susan Doe',
      address: '456 Elm Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    },
  });

  console.log('Created sample student records:', { student1, student2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
