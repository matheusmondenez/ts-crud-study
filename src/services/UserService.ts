import { IUser, IUserCreate, IUserRepository } from '../interfaces/IUser.ts'
import { UserRepository } from '../repositories/UserRespository.ts'

class UserService {
  private userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getAll(): Promise<IUser[]> {
    const result = await this.userRepository.getAll()

    return result
  }

  async create({ name, email }: IUserCreate): Promise<IUser> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email)

    if (verifyIfUserExists) {
      throw new Error('User already exists!')
    }

    const result = await this.userRepository.create({name, email})

    return result
  }
}

export { UserService }
