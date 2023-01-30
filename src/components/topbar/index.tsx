import { ReactNode, useContext } from 'react';
import { Box, Flex, Avatar, HStack, Link, Button, Menu, MenuButton,  MenuList, MenuItem, MenuDivider, useColorModeValue, Image
} from '@chakra-ui/react';
import { AuthContext } from "@/contexts/AuthContext";



const Links = [{
  id: 'signIn',
  name: "Empresa A"
},{
  id: 'signUp',
  name: "Empresa b"
}]

interface propsLink {
  link: string
  children: ReactNode
}

const NavLink = ({link, children}: propsLink) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function TopBar() {
  const { signOut } = useContext(AuthContext)
  return (
    <>
      <Box bg={'white'} px={4} >
       <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Image alt={"Icon company"} objectFit={'cover'} src={'/mdi_company.svg'} />
          <Menu >
          <MenuButton  as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} >
                Minhas Empresas
            </MenuButton>
            <MenuList>
              {Links.map(({id, name}) => (
                <MenuItem key={id}> <NavLink  link={id}>{name}</NavLink> </MenuItem>
              ))}
            </MenuList>
          </Menu>

        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              >
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
              <span>Fulano de tal</span>
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
