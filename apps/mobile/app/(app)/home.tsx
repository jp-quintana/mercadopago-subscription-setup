import { Button, Text } from '@/components';
import { apiClient } from '@/services';
import { User, useUserStore } from '@/store';
import { View } from 'react-native';
import * as Linking from 'expo-linking';

export default function Home() {
  const { user } = useUserStore((state) => state) as { user: User };
  const subscribe = apiClient.subscribe();

  const handleSubscribe = async () => {
    const link = await subscribe.mutateAsync({ email: user.email });

    await Linking.openURL(link);
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
