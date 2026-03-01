import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { PROTO_PATHS } from '@stackcine/contracts';
import {
	AUTH_SERVICE_NAME,
	AUTH_V1_PACKAGE_NAME,
	type AuthServiceClient,
} from '@stackcine/contracts/gen/auth';

import { CONFIG } from '@/config';

const packageDef = loadSync(PROTO_PATHS.AUTH, {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});

const proto = loadPackageDefinition(packageDef) as any;

export const authClient: AuthServiceClient = new proto.auth.v1.AuthService(
	CONFIG.AUTH_GRPC_URL,
	credentials.createInsecure(),
);
