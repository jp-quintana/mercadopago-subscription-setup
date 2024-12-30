import a from 'axios';
import { Platform } from 'react-native';

// import { useAuthStore } from '@/store';

const axios = a.create({
  baseURL:
    Platform.OS === 'web'
      ? 'http://localhost:3000/api'
      : 'http://10.0.2.2:3000/api',
  // withCredentials: true,
});

// axios.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   config.headers['Authorization'] = `${token}`;

//   return config;
// });

export { axios };
