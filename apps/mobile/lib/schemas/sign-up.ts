import * as z from 'zod';

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'El nombre de usuario es obligatorio' }),
    password: z
      .string()
      .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Por favor, confirme su contraseña' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirm'],
  });
