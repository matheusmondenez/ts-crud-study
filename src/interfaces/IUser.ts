export interface IUser {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserCreate {
  name: string
  email: string
}

export interface IUserRepository {
  getAll(): Promise<IUser[]>
  findByEmail(email: string): Promise<IUser | null>
  create(data: IUserCreate): Promise<IUser>
}
