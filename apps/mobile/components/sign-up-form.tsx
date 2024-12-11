import { Alert, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Input } from './ui/input';
import { Button, Text } from './ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '@/lib/schemas';
import { z } from 'zod';

export const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const username = watch('username') || '';
  const password = watch('password') || '';
  const confirmPassword = watch('confirmPassword') || '';

  const inputsAreNotEmpty =
    username.trim().length > 0 &&
    password.trim().length > 0 &&
    confirmPassword.trim().length > 0;

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    console.log(data);
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
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
          />
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            placeholder="Confirm password"
          />
        )}
        name="confirmPassword"
        rules={{ required: true }}
        defaultValue=""
      />
      <Button
        onPress={handleSubmit(onSubmit, onErrors)}
        disabled={!inputsAreNotEmpty}
        className="mt-6"
      >
        <Text>Crear</Text>
      </Button>
    </View>
  );
};