import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { HttpModule } from '@nestjs/axios/dist';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DolyamiController } from './dolyami.controller';
import { DolyamiService } from './dolyami.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get('EMAIL_ID'),
            pass: configService.get('EMAIL_PASS'),
          },
        },
        template: {
          dir: join(process.cwd(), 'src/dolyami/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [DolyamiController],
  providers: [DolyamiService],
})
export class DolyamiModule {}
