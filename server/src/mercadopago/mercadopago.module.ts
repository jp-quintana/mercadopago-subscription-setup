import { Module } from '@nestjs/common';
import { MercadopagoController } from './mercadopago.controller';
import { MercadopagoService } from './mercadopago.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MercadopagoController],
  providers: [MercadopagoService],
})
export class MercadopagoModule {}
