import { ErrorResponse } from "@/types/response";
import axios, { AxiosError, AxiosResponse } from "axios";

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  timeout: 10000,
  withCredentials: true, // Include credentials (cookies) with each request
});

// Add a response interceptor to handle errors globally
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the request was successful, return the response
    return response.data;
  },
  (error: AxiosError<ErrorResponse>) => {
    // log the error with the route
    console.log(error, error.config?.url);

    if (error.response?.data?.message) {
      // error response sent from the server
      console.error("Server error:", error.response.data.message);
    } else if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error("Response error:", error.message);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default http;
