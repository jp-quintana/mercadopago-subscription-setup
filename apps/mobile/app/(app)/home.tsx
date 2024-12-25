import { Button } from '@/components';
import { View } from 'react-native';

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button onPress={() => console.log('check')}>Subscribe</Button>
    </View>
  );
}
