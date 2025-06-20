// import axios from 'axios';

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor to include auth token
// api.interceptors.request.use(
//   (config) => {
//     // Check if we're in a browser environment before accessing localStorage
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('access_token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Optional: Add response interceptor for better error handling
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle common error scenarios
//     if (error.response?.status === 401) {
//       // Token expired or invalid - redirect to login
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('access_token');
//         // You might want to redirect to login page here
//         // window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// import { logout } from '@/services/auth-service';
// import axios from 'axios';

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor to include auth token
// api.interceptors.request.use(
//   (config) => {
//     // Check if we're in a browser environment before accessing localStorage
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('access_token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for error handling
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const status = error.response?.status;

//     // Check if there's no access token and request is 400
//     if (status === 400) {
//       const hasToken =
//         typeof window !== 'undefined' && localStorage.getItem('access_token');
//       if (!hasToken) {
//         logout();
//         return Promise.reject(error);
//       }
//     }

//     // Handle 401 unauthorized (token expired or invalid)
//     if (status === 401) {
//       logout();
//     }

//     return Promise.reject(error);
//   }
// );

// lib/api.ts
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth-token');
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetch(url, { ...options, headers });
}
