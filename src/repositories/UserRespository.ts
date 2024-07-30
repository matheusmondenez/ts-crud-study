import { prisma } from '../database/prisma.ts'
import { IUserRepository, IUserCreate, IUser } from '../interfaces/IUser.ts'

class UserRepository implements IUserRepository {
  async getAll(): Promise<IUser[]> {
    const result = await prisma.user.findMany()

    return result
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      }
    })

    return result || null
  }

  async create(data: IUserCreate): Promise<IUser> {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      }
    })

    return result
  }
}

export { UserRepository }