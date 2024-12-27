import { Button, Text } from '@/components';
import { apiClient } from '@/services';
import { User, useUserStore } from '@/store';
import { Platform, View } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useUserStore((state) => state) as { user: User };
  const subscribe = apiClient.subscribe();

  useEffect(() => {
    Linking.addEventListener('url', (event) => {
      const { url } = event;
      console.log({ url });
      if (url !== null && url.includes('myapp://')) {
        Platform.OS === 'ios' && WebBrowser.dismissBrowser();
      }
    });
  }, []);

  const handleSubscribe = async () => {
    const link = await subscribe.mutateAsync({ email: user.email });

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
