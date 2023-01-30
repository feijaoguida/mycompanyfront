import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

export function canSSRGuest<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies['@hubauth.token']) {
      return {
        redirect: {
          destination: '/company',
          permanent: false
        }
      }
    }
    return await fn(ctx)
  }
}