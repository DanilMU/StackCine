import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	CancelBookingRequest,
	ConfirmBookingRequest,
	CreateReservationRequest,
	GetUserBookingsRequest,
	ListReservedSeatsRequest,
} from '@stackcine/contracts/gen/ts/booking';

import { BookingsService } from './bookings.service';

@Controller()
export class BookingsController {
	public constructor(private readonly bookingsService: BookingsService) {}

	@GrpcMethod('BookingService', 'GetUserBookings')
	public async getUserBookings(data: GetUserBookingsRequest) {
		return this.bookingsService.getUserBookings(data);
	}

	@GrpcMethod('BookingService', 'CreateReservation')
	public async createReservation(data: CreateReservationRequest) {
		return this.bookingsService.createReservation(data);
	}

	@GrpcMethod('BookingService', 'ConfirmBooking')
	public async confirmBooking(data: ConfirmBookingRequest) {
		return this.bookingsService.confirmBooking(data);
	}

	@GrpcMethod('BookingService', 'CancelBooking')
	public async cancelBooking(data: CancelBookingRequest) {
		return this.bookingsService.cancelBooking(data);
	}

	@GrpcMethod('BookingService', 'ListReservedSeats')
	public async listReservedSeats(data: ListReservedSeatsRequest) {
		return this.bookingsService.listReservedSeats(data);
	}
}
