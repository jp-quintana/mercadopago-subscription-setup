import { Redirect, Stack } from 'expo-router';
import { useUserStore } from '@/store';

export default function PublicLayout() {
  const { user } = useUserStore((state) => state);

  if (user) return <Redirect href="/home" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
