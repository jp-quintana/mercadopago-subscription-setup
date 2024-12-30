import { Button, Text } from '@/components';
import { apiClient } from '@/services';
import { User, useUserStore } from '@/store';
import { AppState, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const { user, setUser } = useUserStore((state) => state) as {
    user: User;
    setUser: (user: User) => void;
  };

  const subscribe = apiClient.subscribe();
  const { refetch } = apiClient.getUser(user.id);

  const appState = useRef(AppState.currentState);
  const [_appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        (async () => {
          const { data: u } = await refetch();
          if (u) {
            setUser(u);
          }
        })();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleSubscribe = async () => {
    const link = await subscribe.mutateAsync({
      email: user.email,
      userId: user.id,
    });

    await WebBrowser.openBrowserAsync(link);
  };

  return (
    <View className="flex-1 items-center justify-center gap-3">
      <Text>User role: {user.role}</Text>
      <Button onPress={handleSubscribe}>
        <Text>Subscribe</Text>
      </Button>
    </View>
  );
}
