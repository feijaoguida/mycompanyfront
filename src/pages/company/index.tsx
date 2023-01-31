import {ModalCompany} from "@/components/modalCompany";
import Link from "next/link"
import { companyProps } from "@/components/modalCompany/interfaces/interfaces";
import TopBar from "@/components/topbar";
import { AuthContext } from "@/contexts/AuthContext";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Flex, Heading, Button, useDisclosure, Table, Tbody, Td, Th, Thead, Tr, Image, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Tooltip, Box   } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { setupAPIClient } from "../api/api";
import { api } from "../api/apiCliente";
import { ModalDelete } from "@/components/modalDelete";

export default function Company() {
  const [datacompanies, setDataCompanies] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalDelete = useDisclosure()
  const modalEdit = useDisclosure()
  const [selectedCompany, setSelectedCompany] = useState<any>({});
  const { user } =  useContext(AuthContext)
  
  async function findCompanies(){
    const response = await api.get(`/companies/user/${user?.id}`)
    setDataCompanies(response.data)
  }
  useEffect(() => {
    findCompanies()
  }, [datacompanies])

  
  async function handlerConfirm() {
    await api.delete(`/companies/${selectedCompany?.id}`)
    modalDelete.onClose()
    findCompanies()
  }

  return (
    <>
      <TopBar />
      {datacompanies.length <= 0 && 
        <Flex bg={'#EAEAEA'} direction={'column'} flex={1} justify={"center"} align={'center'} height={"calc(100vh - 64px)"} maxH={'100vh'}>
          <Heading maxW={'500px'} alignContent={'center'}>Nenhuma empresa Cadastrada!</Heading>
          <Button as='button' type='submit' bgColor={'#0385FD'} color={'#ffffff'}  fontWeight={600} fontSize={'20px'} variant={'solid'} onClick={() => [setSelectedCompany({}), onOpen()]} >Adicionar Empresa</Button>
        </Flex> ||
        <Flex  bg={'rgba(0, 0, 0, 0.05)'} direction={'column'} justify={"center"} align={'center'} height={"calc(100vh - 64px)"}  >
          <Flex w={['70%', '90%']} justifyContent={'flex-end'} >
            <Button mb={3} as='button' type='submit' bgColor={'#0385FD'} color={'#ffffff'}  fontWeight={600} fontSize={'20px'} variant={'solid'} onClick={() => [setSelectedCompany({}), onOpen()]} >Adicionar Empresa</Button>
          </Flex>
          <Flex maxH={'400px'} overflow={"auto"} w={['70%', '90%']} >
            <Table size="sm" bg={'white'}>
              <Thead position="sticky"  top={0} bgColor="white"> 
                <Tr>
                  <Th w={'60%'}>Name</Th>
                  <Th textAlign={'right'} w={'25%'}>Qt de Locais</Th>
                  <Th textAlign={'center'} w={'15%'}>Ações</Th>
                </Tr>
              </Thead>
              <Tbody overflow={"scroll"}>
                {datacompanies.map((company: companyProps, index) => (
                  <Tr key={index} my={'auto'} mx={'auto'}>
                    <Td>{company?.name}</Td>
                    <Td textAlign={'right'}>{company?.place?.length}</Td>
                    <Td>
                      <Flex justifyContent="space-around">
                        <Box cursor={'pointer'} onClick={() => [setSelectedCompany(company), modalEdit.onOpen()]}>
                          <Image alt={"Icon company"} onClick={() => [setSelectedCompany(company), modalEdit.onOpen()]} objectFit={'cover'} src={'/material-symbols_edit.svg'} />
                        </Box>
                        <Box cursor={'pointer'} >
                          <Link href={{ pathname: "/place", query: { id_company: company?.id } }} >
                            <Image alt={"Icon company"} objectFit={'cover'} src={'/create_company.svg'} />
                          </Link>
                        </Box>
                        <Box cursor={'pointer'} onClick={() => [setSelectedCompany(company), modalDelete.onOpen()]}>
                          <Image alt={"Icon company"} onClick={() => [setSelectedCompany(company), modalDelete.onOpen()]} objectFit={'cover'} src={'/material-symbols_delete.svg'} />
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex> 
        </Flex> 
      }

    <ModalDelete
      title={'Confirmação de exclusão'}
      message={`O local ${selectedCompany?.name} será excluído. Tem certeza dessa ação?`}
      cancelText={'Cancelar'}
      confirmText={'Excluir'}
      isOpen={modalDelete.isOpen}
      onConfirm={() => handlerConfirm()}
      onClose={modalDelete.onClose}
    />

    <ModalCompany
      isOpen={isOpen}
      onClose={onClose}
      size={'2xl'}
    />
    <ModalCompany
      isOpen={modalEdit.isOpen}
      onClose={modalEdit.onClose}
      size={'2xl'}
      isEdit={true}
      selectCompany={selectedCompany}
    />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  const { user } =  ctx

  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get(`/companies/user/${user?.id}`)

  return {
    props: { companies: response.data }
  }
})

