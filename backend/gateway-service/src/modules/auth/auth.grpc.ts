import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type {
	SendOtpRequest,
	VerifyOtpRequest,
	VerifyOtpResponse,
} from '@stackcine/contracts/gen/auth';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthServiceClient {
	sendOtp(request: SendOtpRequest): Observable<any>;
	verifyOtp(request: VerifyOtpRequest): Observable<VerifyOtpResponse>;
}

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private authService!: AuthServiceClient;

	public constructor(
		@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc,
	) {}

	public async onModuleInit() {
		this.authService = this.client.getService('AuthService');
	}

	public sendOtp(request: SendOtpRequest) {
		return this.authService.sendOtp(request);
	}

	public verifyOtp(
		request: VerifyOtpRequest,
	): Observable<VerifyOtpResponse> {
		return this.authService.verifyOtp(request).pipe(
			catchError((error) => {
				throw error;
			}),
		);
	}
}
