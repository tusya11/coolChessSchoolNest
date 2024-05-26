import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { OrderDTO } from 'src/dto/order.dto';
import { DolyamiService } from './dolyami.service';

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

  @Post('email')
  @HttpCode(200)
  async sendEmail(@Body() data) {
    return this.dolyamiService.sendEmail(data);
  }
}
