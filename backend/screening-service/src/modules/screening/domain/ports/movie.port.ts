import { Movie } from '../interface';

export abstract class MoviePort {
	public abstract findById(id: string): Promise<Movie | null>;
}
