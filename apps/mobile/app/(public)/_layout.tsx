import { Redirect, Stack } from 'expo-router';
import { useUserStore } from '@/store';

export default function PublicLayout() {
  const { user } = useUserStore((state) => state);

  if (user) return <Redirect href="/home" />;

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: true }} />
    </Stack>
  );
}
