import { SeatType } from '../interface';

export abstract class SeatPort {
	public abstract listSeatTypes(
		hallId: string,
		screeningId: string,
	): Promise<SeatType[]>;
}
