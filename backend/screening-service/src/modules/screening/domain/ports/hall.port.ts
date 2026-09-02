import { Hall } from '../interface';

export abstract class HallPort {
	public abstract findById(id: string): Promise<Hall | null>;
	public abstract listByTheater(theaterId: string): Promise<Hall[]>;
}
