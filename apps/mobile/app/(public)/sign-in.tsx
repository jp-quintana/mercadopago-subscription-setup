import { Pressable, Text, View } from 'react-native';
import { MoonStar, Sun } from '@/lib/icons';

export default function SignIn() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text className="text-blue-500">This is sign in</Text>
      <Pressable>
        <Sun />
      </Pressable>
      <Pressable>
        <MoonStar />
      </Pressable>
    </View>
  );
}
