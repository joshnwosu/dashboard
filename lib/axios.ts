// import axios, { InternalAxiosRequestConfig } from 'axios';

// // Create the Axios instance
// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to attach the bearer token
// apiClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // Retrieve the token from storage (e.g., localStorage)
//     const token = localStorage.getItem('access_token');

//     // Ensure headers object is defined
//     config.headers = config.headers || {};

//     // If token exists, add it to the Authorization header
//     if (token) {
//       config.headers.set('Authorization', `Bearer ${token}`);
//     }

//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// // Optional: Add a response interceptor to handle token expiration or refresh
// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle specific error cases, e.g., 401 Unauthorized
//     if (error.response?.status === 401) {
//       // Optionally clear token and redirect to login
//       localStorage.removeItem('access_token');
//       window.location.href = '/auth/login'; // Adjust based on your routing
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from './cookie';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Get access token from cookies in browser
    const accessToken = (typeof window !== 'undefined' ? document.cookie : '')
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1];
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response, // Pass through successful response
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if it's a 401 error and hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried

      try {
        const refreshToken = getCookie('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        // Request new access token using refresh token
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh/`,
          { refresh: refreshToken },
          {
            withCredentials: false,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const { access } = refreshResponse.data;

        // Update access token in cookie
        setCookie('access_token', access, 30 * 60); // 30 minute expiry

        // Update the original request with new token
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${access}`,
        };

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    //  If not a 401 or retry failed, reject the error
    return Promise.reject(error);
  }
);

export default apiClient;
