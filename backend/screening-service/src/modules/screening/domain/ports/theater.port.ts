import { Theater } from '../interface';

export abstract class TheaterPort {
	public abstract findById(id: string): Promise<Theater | null>;
}
