import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { PreApproval } from 'mercadopago';

@Injectable()
export class MercadopagoService {
  private readonly mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  async subscribe(email: string) {
    console.log({ email });
    try {
      const subscription = await new PreApproval(this.mercadopago).create({
        body: {
          back_url: process.env.APP_URL,
          reason: 'Monthly subscription',
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: 100,
            currency_id: 'ARS',
          },
          payer_email: email,
          status: 'pending',
        },
      });

      return subscription.init_point!;
    } catch (error: any) {
      console.error('error', error);
    }
  }
}
