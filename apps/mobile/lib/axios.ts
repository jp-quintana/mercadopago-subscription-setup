import axios from 'axios';
// import { useAuthStore } from '@/store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  // withCredentials: true,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   config.headers['Authorization'] = `${token}`;

//   return config;
// });

export { axiosInstance };
