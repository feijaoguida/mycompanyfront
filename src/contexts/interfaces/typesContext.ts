import { ReactNode } from "react";

export type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void;
  signUp: (Credentials: SignUpProps) => Promise<void>
}

export type UserProps = {
  id: string;
  name: string;
  email: string;
}

export  type SignInProps = {
  email: string;
  password: string;
}

export  type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

export type AuthProviderProps = {
  children: ReactNode
}