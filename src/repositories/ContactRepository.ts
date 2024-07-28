import { prisma } from '../database/prisma.ts'
import { IContact, IContactRepository, IContactCreateData } from '../interfaces/IContact.ts'

class ContactRepository implements IContactRepository {
  async create(data: IContactCreateData): Promise<IContact> {
    const result = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        userId: data.userId,
      },
    })

    return result
  }

  async findByEmailOrPhone(email: string, phone: string): Promise<IContact | null> {
    const result = await prisma.contact.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            phone,
          },
        ],
      },
    })

    return result || null
  }

  async findAll(userId: string): Promise<IContact[]> {
    const result = await prisma.contact.findMany({
      where: {
        userId,
      },
    })

    return result
  }

  async update({ id, name, email, phone }: IContact): Promise<IContact> {
    const result = await prisma.contact.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
      },
    })

    return result
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.contact.delete({
      where: {
        id,
      },
    })

    return result ? true : false
  }
}

export { ContactRepository }
