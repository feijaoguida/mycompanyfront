import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from "@/contexts/AuthContext";
import { Flex, Stack, Image, Heading, FormControl, FormLabel, Input, Button, useToast  } from "@chakra-ui/react";
import Link from 'next/link'
import { GetServerSideProps } from 'next';
import { canSSRGuest } from '@/utils/canSSRGuest';


export default function SignIn() {
  const toast = useToast()
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    if (email === '' || password === ''){
      toast({
        position: 'top-right',
        title: `Preencha todos os campos.`,
        status: "error",
        isClosable: true,
      })
      return
    }
    setLoading(true)

    const data = { email, password }
    await signIn(data)

    setLoading(false)
  }

  return (
    <>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row'}}>
        <Flex flex={1}  >
          <Image alt={"Login HubTest"} objectFit={'cover'} src={'/signup.png'} />
        </Flex>
        <Flex as='form' onSubmit={handleLogin} p={8} flex={1} align={'center'} justify={'center'} >
         <Stack spacing={4} w={'full'} maxW={'xl'}>
          <Flex align={'center'} justify={'center'}>
            <Image alt={"Logo HubTest"} objectFit={'cover'} src={'/logoHub.png'} />
          </Flex>

          <FormControl id="email">
            <FormLabel color={'#373737'}>Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" borderColor={'#0385FD'} />
          </FormControl>
          <FormControl id="password">
            <FormLabel color={'#373737'}>Senha</FormLabel>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" borderColor={'#0385FD'} />
          </FormControl>
         
          <Stack spacing={6}>
            <Button isLoading={loading} as='button' type='submit' bgColor={'#0385FD'} color={'#ffffff'}  fontWeight={700} fontSize={'20px'} variant={'solid'} >
              LOGAR
            </Button>
            <Button isDisabled={true} bgColor={'#00CC99'} color={'#ffffff'}  fontWeight={700} fontSize={'20px'} variant={'solid'} >
              <Link href="/signUp">CRIAR CONTA</Link>
            </Button>
          </Stack>
          
         </Stack>
        </Flex>
        
      </Stack>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})