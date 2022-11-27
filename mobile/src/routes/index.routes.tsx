import { Box } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from '@/routes/app.routes'
import { useAuthContext } from '@/hooks'
import { SignIn } from '@/screens'

export function Routes() {
  const { user } = useAuthContext()
  return (
    <Box flex={1} bgColor="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  )
}
