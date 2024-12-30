import { Body, Controller, Post, Req } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { SubscribeDto } from './dtos';
import { Request } from 'express';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadoPagoService: MercadopagoService) {}

  @Post()
  async webhook(@Req() request: Request) {
    if (request.body?.type === 'subscription_preapproval') {
      await this.mercadoPagoService.webhook(request.body.data);
    }

    return new Response(null, { status: 200 });
  }

  @Post('subscribe')
  subscribe(@Body() subscribeDto: SubscribeDto, @Req() request: Request) {
    const userAgent = request.headers['user-agent'];
    return this.mercadoPagoService.subscribe(subscribeDto);
  }
}
