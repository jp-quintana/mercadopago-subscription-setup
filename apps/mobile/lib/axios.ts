import a from 'axios';
// import { useAuthStore } from '@/store';

const axios = a.create({
  baseURL: 'http://localhost:3000/api',
  // withCredentials: true,
});

// axios.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   config.headers['Authorization'] = `${token}`;

//   return config;
// });

export { axios };
