import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DolyamiService } from './dolyami.service';
import { OrderDTO } from 'src/dto/order.dto';

@Controller('dolyami')
export class DolyamiController {
  constructor(private readonly dolyamiService: DolyamiService) {}

  @Post('create')
  @HttpCode(200)
  async create(@Body() data: OrderDTO) {
    return this.dolyamiService.createOrder(data);
  }

  @Get('orders/:id/info/')
  @HttpCode(200)
  async getInfo(@Param() param) {
    return this.dolyamiService.getInfoOrder(param);
  }
}
