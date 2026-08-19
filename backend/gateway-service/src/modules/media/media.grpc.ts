import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { MediaServiceClient } from '@stackcine/contracts/gen/ts/media';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class MediaClientGrpc extends AbstractGrpcClient<MediaServiceClient> {
	constructor(@InjectGrpcClient('MEDIA_PACKAGE') client: ClientGrpc) {
		super(client, 'MediaService');
	}
}
