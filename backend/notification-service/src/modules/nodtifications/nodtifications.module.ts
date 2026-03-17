import { Module } from '@nestjs/common';

import { NodtificationsController } from './nodtifications.controller';
import { NodtificationsService } from './nodtifications.service';

@Module({
	controllers: [NodtificationsController],
	providers: [NodtificationsService],
})
export class NodtificationsModule {}
