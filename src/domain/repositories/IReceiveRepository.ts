import { Receive } from '../models/Receive';

export interface IReceiveRepository {
    create(receive: Receive): Promise<void>;
    findById(id: string): Promise<Receive | null>;
    findByUserId(userId: string): Promise<Receive[]>;
    listAll(): Promise<Receive[]>;
    update(receive: Receive): Promise<void>;
    delete(id: string): Promise<void>;
    getTotalByUser(userId: string): Promise<number>;
    getByUserAndType(userId: string, type: string): Promise<Receive[]>;
    getByDateRange(userId: string, startDate: string, endDate: string): Promise<Receive[]>;
}
