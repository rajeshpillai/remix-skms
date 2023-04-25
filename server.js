let path = require("node:path");
let fastify = require("fastify");
let { remixFastifyPlugin } = require("@mcansh/remix-fastify");
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let MODE = process.env.NODE_ENV;

console.log("MODE: ", MODE);

async function start() {
  let app = fastify();

  await app.register(remixFastifyPlugin, {
    build: path.join(process.cwd(), "build/index.js"),
  });
  
  // Get all students
  app.get('/api/students', async (request, reply) => {
    try {
      const students = await prisma.student.findMany();
  
      reply.code(200).send(students);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ message: 'Failed to fetch students' });
    }
  });


  // Fetch students by ID
  app.get('/api/students/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const student = await prisma.student.findUnique({ where: { id: Number(id) } });

      if (!student) {
        reply.code(404).send({ message: 'Student not found' });
        return;
      }

      reply.code(200).send(student);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ message: 'Failed to fetch student' });
    }
  });

  // Create new student
  app.post('/api/students', async (request, reply) => {
    try {
      const studentData = request.body;
      studentData.dateOfBirth = new Date(studentData.dateOfBirth).toISOString();
      console.log("DOB: ", studentData.dateOfBirth);
      studentData.address = studentData.primaryAddress;
      console.log("StudentData3: ", studentData);
      const createdStudent = await prisma.student.create({ data: studentData });
      reply.code(201).send(createdStudent);
    } catch (error) {
      // app.log.error(error);
      console.error(error);
      reply.code(500).send({ message: 'Failed to create student' });
    }
  });

  // Register user

  app.post('/api/signup', async (request, reply) => {
    try {
      const { username, password } = request.body;

      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        reply.code(400).send({ message: 'User already exists' });
        console.error("User already exists");
        return;
      }

      // Encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);

      // Save the user to the database
      const newUser = await prisma.user.create({
        data: {
          username,
          passwordHash,
        },
      });

      reply.code(201).send(newUser);
    } catch (error) {
      fastify.log.error(error);
      console.error(error);
      reply.code(500).send({ message: 'Failed to create user' });
    }
  });

  let port = process.env.PORT ? Number(process.env.PORT) || 3000 : 3000;

  let address = await app.listen({ port, host: "0.0.0.0" });
  console.log(`✅ app ready: ${address}`);
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
