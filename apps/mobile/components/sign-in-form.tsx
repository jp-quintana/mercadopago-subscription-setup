import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Input } from './ui/input';
import { Button, buttonVariants, Text } from './ui';
import { Link } from 'expo-router';
import { cn } from '@/lib';
import { SignInSchema } from '@/lib';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

export const SignInForm = () => {
  const { control, watch, handleSubmit } = useForm<
    z.infer<typeof SignInSchema>
  >({
    resolver: zodResolver(SignInSchema),
  });

  const username = watch('username') || '';
  const password = watch('password') || '';

  const inputsAreNotEmpty =
    username.trim().length > 0 && password.trim().length > 0;

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    console.log(data);
  };

  return (
    <View className="w-full mt-12 gap-3">
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
            />
          </>
        )}
        name="username"
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            placeholder="Password"
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'link' }),
          'font-bold text-xs text-right text-foreground p-0 self-end'
        )}
      >
        Recuperar Contraseña
      </Link>
      <Button onPress={handleSubmit(onSubmit)} disabled={!inputsAreNotEmpty}>
        <Text>Ingresar</Text>
      </Button>
    </View>
  );
};
