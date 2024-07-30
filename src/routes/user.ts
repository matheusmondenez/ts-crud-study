import { FastifyInstance } from 'fastify'
import { IUserCreate } from '../interfaces/IUser.ts'
import { UserUseCase } from '../usecases/UserUseCase.ts'

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  fastify.get('/', async (req, reply) => {
    try {
      const data = await userUseCase.getAll()

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })

  fastify.post<{ Body: IUserCreate }>('/', async (req, reply) => {
    try {
      const { name, email } = req.body
      const data = await userUseCase.create({name, email})

      return reply.send(data)
    } catch (e) {
      reply.send(e)
    }
  })
}
