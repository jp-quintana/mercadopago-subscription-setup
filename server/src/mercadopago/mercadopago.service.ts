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
    const preapproval = await new PreApproval(this.mercadopago).get({
      id: data.id,
    });

    if (preapproval.status === 'authorized') {
      console.log(preapproval.id);
      // this.userService.confirmSubscription(preapproval.id);
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

      return subscription.init_point!;
    } catch (error: any) {
      console.error('error', error);
    }
  }
}
