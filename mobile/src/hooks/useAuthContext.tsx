import { useContext } from 'react'

import { AuthContext, AuthContextDataProps } from '@/contexts/auth'

export function useAuthContext(): AuthContextDataProps {
  const context = useContext(AuthContext)

  return context
}
