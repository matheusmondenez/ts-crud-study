import { IContact, IContactCreate, IContactRepository } from '../interfaces/IContact.ts'
import { IUserRepository } from '../interfaces/IUser.ts'
import { ContactRepository } from '../repositories/ContactRepository.ts'
import { UserRepository } from '../repositories/UserRespository.ts'

class ContactUseCase {
  private contactRepository: IContactRepository
  private userRepository: IUserRepository

  constructor() {
    this.contactRepository = new ContactRepository()
    this.userRepository = new UserRepository()
  }

  async create({ name, email, phone, userEmail }: IContactCreate): Promise<IContact> {
    const user = await this.userRepository.findByEmail(userEmail)

    if (!user) {
      throw new Error('User not found!')
    }

    const verifyIfContactExists = await this.contactRepository.findByEmailOrPhone(email, phone)

    if (verifyIfContactExists) {
      throw new Error('Contact already exists!')
    }

    const result = await this.contactRepository.create({
      name,
      email,
      phone,
      userId: user.id,
    })

    return result
  }

  async listAll(userEmail: string): Promise<IContact[]> {
    const user = await this.userRepository.findByEmail(userEmail)

    if (!user) {
      throw new Error('User not found!')
    }

    const result = await this.contactRepository.findAll(user.id)

    return result
  }

  async update({ id, name, email, phone }: IContact): Promise<IContact> {
    const result = await this.contactRepository.update({ id, name, email, phone })

    return result
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.contactRepository.delete(id)

    return result
  }
}

export { ContactUseCase }
