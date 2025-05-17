import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// Create the Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Add a request interceptor to attach the bearer token
// apiClient.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // Retrieve the token from storage (e.g., localStorage)
//     const token = localStorage.getItem("access_token"); // Adjust based on your storage method

//     // If token exists, add it to the Authorization header
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// Add a request interceptor to attach the bearer token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retrieve the token from storage (e.g., localStorage)
    const token = localStorage.getItem('access_token');

    // Ensure headers object is defined
    config.headers = config.headers || {};

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor to handle token expiration or refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases, e.g., 401 Unauthorized
    if (error.response?.status === 401) {
      // Optionally clear token and redirect to login
      localStorage.removeItem('access_token');
      window.location.href = '/auth/login'; // Adjust based on your routing
    }
    return Promise.reject(error);
  }
);

export default apiClient;
