import {User} from '../models/User'

export interface IUserRepository {
    create(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    listAll(): Promise<User[]>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
    updateBalance(userId: string, newBalance: number): Promise<void>;
}