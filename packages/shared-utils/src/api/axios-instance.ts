import axios from 'axios';

export const baseAxiosInstance = (domain: string) =>
  axios.create({
    baseURL: domain,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
