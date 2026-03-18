import { Module } from '@nestjs/common';
import { MailModule } from 'src/infrastructure/mail/mail.module';

import { NodtificationsController } from './nodtifications.controller';
import { NodtificationsService } from './nodtifications.service';

@Module({
	imports: [MailModule],
	controllers: [NodtificationsController],
	providers: [NodtificationsService],
})
export class NodtificationsModule {}
