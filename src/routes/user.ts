import { FastifyInstance } from 'fastify'
import { IUserCreate } from '../interfaces/IUser.ts'
import { UserService } from '../services/UserService.ts'

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService()

  fastify.get('/', async (req, reply) => {
    try {
      const data = await userService.getAll()

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })

  fastify.post<{ Body: IUserCreate }>('/', async (req, reply) => {
    try {
      const { name, email } = req.body
      const data = await userService.create({name, email})

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })
}
