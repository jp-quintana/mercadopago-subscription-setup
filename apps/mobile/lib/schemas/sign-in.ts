import * as z from 'zod';

export const SignInSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'El nombre de usuario es obligatorio' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria' }),
});
