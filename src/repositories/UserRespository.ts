import { prisma } from '../database/prisma.ts'
import { IUserRepository, IUserCreate, IUser } from '../interfaces/IUser.ts'

class UserRepository implements IUserRepository {
  async create(data: IUserCreate): Promise<IUser> {
    const result = prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      }
    })

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
}

export { UserRepository }