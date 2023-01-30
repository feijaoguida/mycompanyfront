import { AuthContext } from "@/contexts/AuthContext";
import { Box, Flex, Stack, Image, Heading, FormControl, FormLabel, Input, Button, Alert, useToast   } from "@chakra-ui/react";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";


export default function SignUp() {
  const {signUp} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast({
        position: 'top-right',
        title: `Preencha todos os campos.`,
        status: "error",
        isClosable: true,
      })
      return
    }
    if (password !== confirmPassword){
      toast({
        position: 'top-right',
        title: `Senha e confirmação de senha não confere.`,
        status: "error",
        isClosable: true,
      })
      return
    }

    setLoading(true)
    const data = {
      name, email, password
    }

    await signUp(data)
    

    setLoading(false)

  }
  return (
    <>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row'}}>
        <Flex flex={1} >
          <Image  alt={"Login HubTest"} objectFit={'cover'} src={'/signup.png'} />
        </Flex>
        <Flex as='form' onSubmit={handleSignUp} p={8} flex={1} align={'center'} justify={'center'} >
         <Stack spacing={4} w={'full'} maxW={'xl'}>
          <Flex align={'center'} justify={'center'}>
            <Image alt={"Logo HubTest"} objectFit={'cover'} src={'/logoHub.png'} />
          </Flex>
          <FormControl id="name">
            <FormLabel color={'#373737'}>Nome</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" borderColor={'#0385FD'} />
          </FormControl>
          <FormControl id="email">
            <FormLabel color={'#373737'}>Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" borderColor={'#0385FD'} />
          </FormControl>
          <FormControl id="password">
            <FormLabel color={'#373737'}>Senha</FormLabel>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" borderColor={'#0385FD'} />
          </FormControl>
          <FormControl id="repetPassword">
            <FormLabel color={'#373737'}>Repetir Senha</FormLabel>
            <Input  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}type="password" borderColor={'#0385FD'} />
          </FormControl>
          <Stack spacing={6}>
            <Button isLoading={loading} as='button' type='submit' bgColor={'#0385FD'} color={'#ffffff'}  fontWeight={700} fontSize={'20px'} variant={'solid'} >
              REGISTRAR
            </Button>
            <Button bgColor={'#00CC99'} color={'#ffffff'}  fontWeight={700} fontSize={'20px'} variant={'solid'} >
              <Link href="/">LOGAR</Link>
            </Button>
          </Stack>
          
         </Stack>
        </Flex>
        
      </Stack>
    </>
  )
}