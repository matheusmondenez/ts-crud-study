import { FastifyInstance } from 'fastify'
import { auth } from '../middlewares/auth.ts'
import { IContact, IContactCreate } from '../interfaces/IContact.ts'
import { ContactUseCase } from '../usecases/ContactUseCase.ts'

export async function contactRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase()

  fastify.addHook('preHandler', auth)

  fastify.post<{ Body: IContactCreate, Headers: { email: string } }>('/', async (req, reply) => {
    const { name, email, phone } = req.body
    const userEmail = req.headers['email']

    try {
      const data = await contactUseCase.create({name, email, phone, userEmail})

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })

  fastify.get<{ Headers: { email: string } }>('/', async (req, reply) => {
    const userEmail = req.headers['email']

    try {
      const data = await contactUseCase.listAll(userEmail)

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })

  fastify.put<{ Body: IContact, Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params
    const { email, name, phone } = req.body

    try {
      const data = await contactUseCase.update({id, name, email, phone})

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })

  fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params

    try {
      const data = await contactUseCase.delete(id)

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })
}
