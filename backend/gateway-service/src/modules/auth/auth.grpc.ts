import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type {
	SendOtpRequest,
	VerifyOtpRequest,
} from '@stackcine/contracts/gen/auth';
import { lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private authService!: any;

	public constructor(
		@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc,
	) {}

	public async onModuleInit() {
		this.authService = this.client.getService('AuthService');
	}

	public sendOtp(request: SendOtpRequest) {
		return this.authService.sendOtp(request);
	}

	public async verifyOtp(request: VerifyOtpRequest) {
		const result = await lastValueFrom(
			this.authService.verifyOtp(request).pipe(
				catchError((error) => {
					throw error;
				}),
			),
		);
		return result;
	}
}
