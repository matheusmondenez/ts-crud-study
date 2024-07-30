import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { userRoutes } from './routes/user.ts'
import { contactRoutes } from './routes/contact.ts'

const app: FastifyInstance = fastify({logger: true})

app.get('/hello', (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({message: 'Hello, World!'})
})

app.register(userRoutes, {prefix: '/users'})
app.register(contactRoutes, {prefix: '/contacts'})

app.listen({port: 3333}, (err: Error | null, address: string): void => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
