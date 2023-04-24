let path = require("node:path");
let fastify = require("fastify");
let { remixFastifyPlugin } = require("@mcansh/remix-fastify");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let MODE = process.env.NODE_ENV;

console.log("MODE: ", MODE);

async function start() {
  let app = fastify();

  await app.register(remixFastifyPlugin, {
    build: path.join(process.cwd(), "build/index.js"),
  });
  
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




  let port = process.env.PORT ? Number(process.env.PORT) || 3000 : 3000;

  let address = await app.listen({ port, host: "0.0.0.0" });
  console.log(`✅ app ready: ${address}`);
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
