import { signOut } from '@/contexts/AuthContext';
import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './erros/AuthTokenError';

export function setupAPIClient(ctx = undefined){
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://hubtest.fly.dev/',
    headers: {
      Authorization: `Bearer ${cookies['@hubauth.token']}`
    }

  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if(error.response?.status === 401){
      if(typeof window !== undefined){
        signOut();
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(error);
  })

  return api
}