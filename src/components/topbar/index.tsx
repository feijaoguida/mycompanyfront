import { ReactNode, useContext } from 'react';
import { Box, Flex, Avatar, HStack, Button, Menu, MenuButton,  MenuList, MenuItem, MenuDivider, useColorModeValue, Image
} from '@chakra-ui/react';
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link"



export default function TopBar() {
  const { signOut, user } = useContext(AuthContext)
  return (
    <>
      <Box bg={'white'} px={4} >
       <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Image alt={"Icon company"} objectFit={'cover'} src={'/mdi_company.svg'} />
          <Box fontWeight={'bold'} cursor={'pointer'} >
            <Link href={{ pathname: "/company" }} > Minhas Empresas </Link>
          </Box>
          
        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              flex={1}
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              >
              <Avatar 
                size={'sm'}
                mr={'2'}
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
              <span>{user?.name ? user.name : 'Usuário'}</span>
            </MenuButton>
            <MenuList>
                  <MenuItem>Sobre</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => signOut()}> Sair </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      
       </Flex>
      </Box>
    </>
  )
}
