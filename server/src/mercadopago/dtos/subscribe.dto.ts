import { IsEmail, IsUUID } from 'class-validator';

export class SubscribeDto {
  @IsEmail()
  email: string;

  @IsUUID()
  userId: string;
}
