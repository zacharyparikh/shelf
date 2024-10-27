import Fastify from 'fastify'

const server = Fastify({
  logger: true,
})

server.get('/', async function handler(request, reply) {
  return { hello: 'world' }
})

try {
  await server.listen({ port: 3000 })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
