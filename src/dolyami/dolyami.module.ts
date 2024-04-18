import { Module } from '@nestjs/common';
import { DolyamiController } from './dolyami.controller';
import { HttpModule } from '@nestjs/axios/dist';
import { DolyamiService } from './dolyami.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [DolyamiController],
  providers: [DolyamiService],
})
export class DolyamiModule {}
