import { Button, Header, Input } from '@/components'
import { api } from '@/services'
import { useNavigation } from '@react-navigation/native'
import { Heading, useToast, VStack } from 'native-base'
import { useState } from 'react'

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const toast = useToast()
  const { navigate } = useNavigation()

  async function handleJoinPoll() {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'yellow.500',
        })
      }

      await api.post('/polls/join', { code })

      setCode('')

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })

      navigate('polls')
    } catch (error) {
      setIsLoading(false)
      setCode('')
      const { message } = error.response?.data

      if (message === 'Poll not found.') {
        toast.show({
          title: 'Não foi possível encontrar o bolão',
          placement: 'top',
          bgColor: 'red.500',
        })
        return
      }

      if (message === 'You already joined this poll.') {
        toast.show({
          title: 'Você já está nesse bolão',
          placement: 'top',
          bgColor: 'red.500',
        })
        return
      }
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center">
          Encontre um bolão através de seu código único.
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />

        <Button
          title="BUSCAR BOLÃO"
          onPress={handleJoinPoll}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}
