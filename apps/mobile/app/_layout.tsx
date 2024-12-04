import { Redirect, Slot } from 'expo-router';
import '../global.css';
import { useUserStore } from '@/store';

export default function RootLayout() {
  const { user } = useUserStore((state) => state);

  if (user) return <Redirect href="/home" />;

  return <Slot />;
}
