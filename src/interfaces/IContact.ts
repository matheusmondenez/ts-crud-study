export interface IContact {
  id: string
  name: string
  email: string
  phone: string
  userId?: string
}

export interface IContactCreate {
  name: string
  email: string
  phone: string
  userEmail: string
}

export interface IContactCreateData {
  name: string
  email: string
  phone: string
  userId: string
}

export interface IContactRepository {
  getAll(userId: string): Promise<IContact[]>
  findByEmailOrPhone(email: string, phone: string): Promise<IContact | null>
  create({ name, email, phone, userId }: IContactCreateData): Promise<IContact>
  update({ id, name, email, phone }: IContact): Promise<IContact>
  delete(id: string): Promise<boolean>
}
