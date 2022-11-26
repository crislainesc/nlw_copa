import React, { createContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

import { GOOGLE_CLIENT_ID } from '@env'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  })

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }


  async function signInWithGoogle(accessToken: string) {
    console.log(`TOKEN: ${accessToken}`)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.params?.id_token) {
      signInWithGoogle(response.params?.id_token)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
