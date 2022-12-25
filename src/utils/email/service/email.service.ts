import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { SendEmailDto } from '../dto/send-email.dto';
const ejs=require('ejs')
const fs=require('fs')
const path=require('path')

@Injectable()
export class EmailService {
  constructor(
    @Inject("MAILER_PROVIDER") private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>
  ) {

  }
  async sentCode(email: string, sendEmailDto: SendEmailDto): Promise<any> {
    console.log(email);
    console.log(sendEmailDto);
    let str = await fs.readFileSync(path.join(process.cwd(), 'src/assets/template/', 'FA', 'otp') + '.ejs')
    let html = ejs.render(str.toString(), sendEmailDto);
    await this.transporter.sendMail({
      from: "info@novintex.info",
      to: email,
      subject: sendEmailDto.subject,
      html: html,
    });
  }
}
