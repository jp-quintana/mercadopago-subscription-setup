import { Module } from '@nestjs/common';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MercadopagoModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
