import { FastifyInstance } from 'fastify'
import { auth } from '../middlewares/auth.ts'
import { IContact, IContactCreate } from '../interfaces/IContact.ts'
import { ContactService } from '../services/ContactService.ts'

export async function contactRoutes(fastify: FastifyInstance) {
  const contactService = new ContactService()

  fastify.addHook('preHandler', auth)

  fastify.get<{ Headers: { email: string } }>('/', async (req, reply) => {
    const userEmail = req.headers['email']

    try {
      const data = await contactService.getAll(userEmail)

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })

  fastify.post<{ Body: IContactCreate, Headers: { email: string } }>('/', async (req, reply) => {
    const { name, email, phone } = req.body
    const userEmail = req.headers['email']

    try {
      const data = await contactService.create({name, email, phone, userEmail})

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })

  fastify.put<{ Body: IContact, Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params
    const { email, name, phone } = req.body

    try {
      const data = await contactService.update({id, name, email, phone})

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })

  fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params

    try {
      const data = await contactService.delete(id)

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })
}
