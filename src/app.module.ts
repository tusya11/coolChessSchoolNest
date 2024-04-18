import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DolyamiModule } from './dolyami/dolyami.module';

@Module({
  imports: [DolyamiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
