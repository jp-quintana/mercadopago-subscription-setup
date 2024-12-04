import { Redirect, Stack } from 'expo-router';
import { useUserStore } from '@/store';

export default function AppLayout() {
  const { user } = useUserStore((state) => state);

  if (!user) return <Redirect href="/sign-in" />;

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerTitle: 'Home' }} />
    </Stack>
  );
}
