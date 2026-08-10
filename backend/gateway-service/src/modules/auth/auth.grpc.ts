import { Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { AuthServiceClient } from '@stackcine/contracts/gen/auth';

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private svc!: AuthServiceClient;

	public constructor(
		@InjectGrpcClient('AUTH_PACKAGE')
		private readonly client: ClientGrpc,
	) {}

	public onModuleInit() {
		this.svc = this.client.getService<AuthServiceClient>('AuthService');
	}

	public get service() {
		return this.svc;
	}
}
