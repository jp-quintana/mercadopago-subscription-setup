import { Redirect, Stack } from 'expo-router';
import { useUserStore } from '@/store';
import { LogOut } from 'lucide-react-native';
import { Button } from '@/components';

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
              className="w-8 h-8 p-0 flex items-center justify-center mr-4 bg-background text-foreground"
            >
              <LogOut />
            </Button>
          ),
        }}
      />
    </Stack>
  );
}
