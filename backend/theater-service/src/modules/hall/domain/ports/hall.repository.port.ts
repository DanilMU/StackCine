import { HallEntity } from '../entities/hall.entity';
import { RowLayout } from '../interfaces';

export abstract class HallRepositoryPort {
	public abstract create(data: {
		name: string;
		theaterId: string;
		layout: RowLayout[];
	}): Promise<HallEntity>;

	public abstract findById(id: string): Promise<HallEntity | null>;

	public abstract listByTheater(theaterId: string): Promise<HallEntity[]>;

	public abstract findSeatsByHall(hallId: string): Promise<unknown[]>;

	public abstract createSeats(data: {
		hallId: string;
		layout: RowLayout[];
	}): Promise<void>;
}
