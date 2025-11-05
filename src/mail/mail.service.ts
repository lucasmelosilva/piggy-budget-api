import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    // Configure the email transporter (using nodemailer as an example)
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    this.logger.log('MailService initialized');
  }

  async sendEmailVerification(
    email: string,
    token: string,
  ): Promise<void | Error> {
    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    try {
      await this.transporter.sendMail({
        from: `No Reply <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'Email Verification',
        html: `<p>Please verify your email by clicking on the link below:</p>
               <a href="${url}">Verify Email</a>`,
      });
      this.logger.log(`Email verification sent to ${email}`);
    } catch (error) {
      this.logger.error(
        // eslint-disable-next-line
        `Failed to send email verification to ${email}: ${error.message}`,
      );
    }
  }
}
