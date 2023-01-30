import { createContext, ReactNode, useEffect, useState} from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from "next/router";
import { api } from "@/pages/services/apiCliente";
import { useToast } from "@chakra-ui/toast";
import { AuthContextData, AuthProviderProps, SignInProps, SignUpProps, UserProps } from './interfaces/typesContext'



export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try {
    destroyCookie(undefined, '@hubauth.token')
    Router.push('/')
  } catch {
    console.log('Erro ao deslogar')
  }
}

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user
  const toast = useToast()

  useEffect(() => {
    const { '@hubauth.token': access_token } = parseCookies();
    if(access_token){
      api.get('/me').then(response => {
        const { id, name, email } = response.data

        setUser({id, name, email })
      }).catch(() => {
        signOut();
      })
    }
  }, [])

  async function signIn({email, password}: SignInProps) {
    try {
      const response = await api.post('/login', {
        email, password
      })
      const {id, name, access_token} = response.data
      const umMes = 60 * 60 * 24 * 30
      setCookie(undefined, '@hubauth.token', access_token, {
        maxAge: umMes,
        path: '/'
      })
      setUser({
        id,
        name,
        email
      })

      api.defaults.headers['Authorization'] = `Bearer ${access_token}`

      Router.push('/')
    } catch (error) {
      console.log("Erro ao acessar ", error)
    }
  }
  async function signUp({ name, email, password }: SignUpProps){
    try {
      const response = await api.post('/users', {
        email, name, password
      })

      toast({
        position: 'top-right',
        title: `Usuario ${name} criado com sucesso`,
        status: "success",
        isClosable: true,
      })
      Router.push('/company')
    } catch (error) {
      toast({
        position: 'top-right',
        title: `Erro ao criar usuário`,
        status: "error",
        isClosable: true,
      })
      console.log("Erro ao acessar ", error)
    }
  }
  
  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}} >
      {children}
    </AuthContext.Provider>
  )
}