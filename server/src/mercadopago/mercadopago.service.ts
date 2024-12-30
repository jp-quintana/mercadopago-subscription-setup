import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { PreApproval } from 'mercadopago';
import { UserService } from 'src/user/user.service';
import { SubscribeDto } from './dtos';

@Injectable()
export class MercadopagoService {
  private readonly mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  constructor(private readonly userService: UserService) {}

  async webhook(data: any) {
    const subscription = await new PreApproval(this.mercadopago).get({
      id: data.id,
    });

    if (subscription.status === 'authorized') {
      this.userService.confirmSubscription({
        id: subscription.id,
        status: subscription.status,
      });
    }
  }

  async subscribe(subscribeDto: SubscribeDto) {
    try {
      const subscription = await new PreApproval(this.mercadopago).create({
        body: {
          back_url: 'https://mercadopago.com.ar',
          reason: 'Monthly subscription',
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: 100,
            currency_id: 'ARS',
          },
          payer_email: subscribeDto.email,
          status: 'pending',
        },
      });

      await this.userService.startSubscription(subscribeDto.userId, {
        id: subscription.id,
        status: subscription.status,
      });

      return subscription.init_point!;
    } catch (error: any) {
      console.error('error', error);
    }
  }
}
