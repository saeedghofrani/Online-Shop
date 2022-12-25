import { Module } from '@nestjs/common';
import { MailerProvider } from './provider/email.provider';
import { EmailService } from './service/email.service';

@Module({
  providers: [EmailService, MailerProvider],
  exports: [EmailService],
})
export class EmailModule {}
