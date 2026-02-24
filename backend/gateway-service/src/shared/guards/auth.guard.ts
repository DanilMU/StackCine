import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { PassportService } from '@stackcine/passport';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly passportService: PassportService) {}
	public canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();

		const token = this.extractToken(request);

		if (!token) throw new UnauthorizedException('Token npt provided');

		const result = this.passportService.verify(token);

		console.log('AuthGuard: Token verification result:', result);

		if (!result.valid) throw new UnauthorizedException(result.reason);

		request.user = {
			id: result.userId,
		};

		console.log('AuthGuard: Set request.user to:', request.user);

		return true;
	}

	private extractToken(request: Request) {
		const header = request.headers.authorization;

		if (!header)
			throw new UnauthorizedException(
				'Authorization header is missing',
			);

		if (!header.startsWith('Bearer '))
			throw new UnauthorizedException(
				'Invalid authorization header',
			);

		const token = header.replace(/^Bearer\s+/i, '').trim();

		console.log('AuthGuard: Extracted token:', token);

		return token;
	}
}
