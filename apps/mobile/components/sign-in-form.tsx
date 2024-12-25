import { Alert, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Input } from './ui/input';
import { Button, buttonVariants, Text } from './ui';
import { Link, useRouter } from 'expo-router';
import { cn } from '@/lib';
import { SignInSchema } from '@/lib';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { apiClient } from '@/services';
import { useUserStore } from '@/store';

export const SignInForm = () => {
  const login = apiClient.login();
  const { setUser } = useUserStore();
  const router = useRouter();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const email = watch('email') || '';
  const password = watch('password') || '';

  const inputsAreNotEmpty =
    email.trim().length > 0 && password.trim().length > 0;

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    const { data: d } = await login.mutateAsync(data);

    setUser(d.user);
    router.push('/home');
  };

  const onErrors = () => {
    if (Object.keys(errors).length) {
      const errorMessages = Object.values(errors)
        .map((error) => error.message)
        .join('\n');
      Alert.alert('Error', errorMessages);
    }
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
              placeholder="Enter your email"
            />
          </>
        )}
        name="email"
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
      <Button
        onPress={handleSubmit(onSubmit, onErrors)}
        disabled={!inputsAreNotEmpty}
      >
        <Text>Ingresar</Text>
      </Button>
    </View>
  );
};
