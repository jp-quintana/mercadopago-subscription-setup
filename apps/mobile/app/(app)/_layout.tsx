import { Redirect, Stack } from 'expo-router';
import { useUserStore } from '@/store';
import { Button } from '@/components';
import { LogOut } from '@/lib/icons';

export default function AppLayout() {
  const { user, setUser } = useUserStore((state) => state);

  if (!user) return <Redirect href="/sign-in" />;

  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerTitle: 'Home',
          headerRight: () => (
            <Button
              onPress={() => {
                setUser(null);
              }}
              className="w-8 h-8 p-0 flex items-center justify-center web:mr-4 bg-background text-foreground"
            >
              <LogOut className="text-foreground" />
            </Button>
          ),
        }}
      />
    </Stack>
  );
}
