import axios, { AxiosInstance } from 'axios';

export const customAxiosUtil: AxiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});