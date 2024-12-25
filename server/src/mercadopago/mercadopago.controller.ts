import { Body, Controller, Post } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { SubscribeDto } from './dtos';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadoPagoService: MercadopagoService) {}

  @Post('subscribe')
  subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.mercadoPagoService.subscribe(subscribeDto.email);
  }
}
