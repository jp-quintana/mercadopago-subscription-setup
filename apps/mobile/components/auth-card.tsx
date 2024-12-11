import { usePathname } from 'expo-router';
import { View } from 'react-native';
import { buttonVariants, Text } from './ui';
import { SignInForm } from './sign-in-form';
import { Link } from 'expo-router';
import { cn } from '@/lib';
import { SignUpForm } from './sign-up-form';

export const AuthCard = () => {
  const pathname = usePathname();

  const isSignIn = pathname === '/sign-in';

  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-5/6">
        <View>
          <Text className="text-center text-3xl font-bold">
            {isSignIn ? '¡Hola de nuevo!' : '¡Bienvenido!'}
          </Text>
          <Text className="text-center text-xl mt-3">
            {isSignIn ? 'Bienvenido de regreso' : 'Crea tu cuenta'}
          </Text>
        </View>
        {isSignIn ? <SignInForm /> : <SignUpForm />}
        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-sm text-center">{`¿${
            isSignIn ? 'No' : 'Ya'
          } tienes cuenta?`}</Text>
          <Link
            href={isSignIn ? '/sign-up' : '/sign-in'}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-blue-400 px-1.5 text-sm font-bold'
            )}
          >
            {isSignIn ? 'Crear ahora' : 'Iniciar sesión'}
          </Link>
        </View>
      </View>
    </View>
  );
};
