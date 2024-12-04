import { Stack } from 'expo-router';
import '../global.css';
import { useUserStore } from '@/store';

export default function RootLayout() {
  const { user } = useUserStore((state) => state);

  return (
    <Stack>
      {user ? (
        <Stack.Screen
          name="(app)/index"
          options={{
            headerTitle: 'Home',
          }}
        />
      ) : (
        <Stack.Screen
          name="(public)/index"
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack>
  );
}
