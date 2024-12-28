import { Body, Controller, Post, Req } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { SubscribeDto } from './dtos';
import { Request } from 'express';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadoPagoService: MercadopagoService) {}

  @Post()
  async webhook(@Req() request: any) {
    const body: { data: { id: string }; type: string } = await request.json();
    console.log(body);
    if (body?.type === 'subscription_preapproval') {
      this.mercadoPagoService.webhook(request.body.data);
    }
  }

  @Post('subscribe')
  subscribe(@Body() subscribeDto: SubscribeDto, @Req() request: Request) {
    const userAgent = request.headers['user-agent'];
    return this.mercadoPagoService.subscribe(subscribeDto.email);
  }
}
