import axios from 'axios';

export const axiosInstance = (domain: string) =>
  axios.create({
    baseURL: domain,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
