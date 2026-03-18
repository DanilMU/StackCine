import { Module } from '@nestjs/common';
import { MailService } from 'src/infrastructure/mail/mail.service';

import { NodtificationsController } from './nodtifications.controller';
import { NodtificationsService } from './nodtifications.service';

@Module({
	controllers: [NodtificationsController],
	providers: [NodtificationsService, MailService],
})
export class NodtificationsModule {}
