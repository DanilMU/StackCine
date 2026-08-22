import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { CategoryServiceClient } from '@stackcine/contracts/gen/ts/category';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class CategoryClientGrpc extends AbstractGrpcClient<CategoryServiceClient> {
	constructor(@InjectGrpcClient('CATEGORY_PACKAGE') client: ClientGrpc) {
		super(client, 'CategoryService');
	}
}
