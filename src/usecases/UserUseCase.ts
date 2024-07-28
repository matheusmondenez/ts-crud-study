import { IUser, IUserCreate, IUserRepository } from '../interfaces/IUser.ts'
import { UserRepository } from '../repositories/UserRespository.ts'

class UserUseCase {
  private userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
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

export { UserUseCase }
