import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '@/pages/services/erros/AuthTokenError';
 

export function canSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<void|GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies['@hubauth.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@hubauth.token')
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }

    
  }
}