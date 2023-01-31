import ModalPlace from "@/components/modalPlace";
import { placeProps } from "@/components/modalPlace/interfaces/interfaces";
import TopBar from "@/components/topbar";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Flex, Heading, Button, useDisclosure, Table, Tbody, Td, Th, Thead, Tr, Image, Box   } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { api } from "../api/apiCliente";
import { ModalDelete } from "@/components/modalDelete";

export default function Place() {
  const [dataplaces, setDataPlaces] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalEdit = useDisclosure()
  const modalDelete = useDisclosure()
  const [selectedPlace, setSelectedPlace] = useState<any>({});
  const router = useRouter() 
  const { query: { id_company }} = router  

  async function findPlaces(){
    const response = await api.get(`/places/company/${id_company}`)
    setDataPlaces(response.data)
  }

  useEffect(() => {
    findPlaces()
  }, [id_company])


  async function handlerConfirm() {
    await api.delete(`/places/${selectedPlace?.id}`)
    modalDelete.onClose()
    findPlaces()
  }

  return (
    <>
      <TopBar />
      {dataplaces.length <= 0 && 
        <Flex bg={'#EAEAEA'} direction={'column'} flex={1} justify={"center"} align={'center'} height={"100vh"} maxH={'100vh'}>
          <Heading maxW={'500px'} alignContent={'center'}>Nenhum Local Cadastrado!</Heading>
          <Button as='button' type='submit' bgColor={'#0385FD'} color={'#ffffff'}  fontWeight={600} fontSize={'20px'} variant={'solid'} onClick={() => [setSelectedPlace({}), onOpen()]} >Adicionar Local</Button>
        </Flex> ||
        <Flex  bg={'rgba(0, 0, 0, 0.05)'} direction={'column'} justify={"center"} align={'center'} height={"89vh"}  >
          <Flex w={['70%', '90%']} justifyContent={'flex-end'} >
            <Button mb={3} as='button' type='submit' bgColor={'#0385FD'} color={'#ffffff'}  fontWeight={600} fontSize={'20px'} variant={'solid'} onClick={() => [setSelectedPlace({}), onOpen()]} >Adicionar Local</Button>
          </Flex>
          <Flex maxH={'400px'} overflow={"auto"} w={['70%', '90%']} >
            <Table size="sm" bg={'white'}>
              <Thead position="sticky"  top={0} bgColor="white">
                <Tr>
                  <Th w={'60%'}>Local</Th>
                  <Th textAlign={'center'} w={'15%'}>Ações</Th>
                </Tr>
              </Thead>
              <Tbody overflow={"scroll"}>
                {dataplaces.map((place: placeProps, index) => (
                  <Tr key={index} my={'auto'} mx={'auto'}>
                    <Td>{place?.name}</Td>
                    <Td>
                      <Flex justifyContent="space-around">
                        <Box cursor={'pointer'} onClick={() => [setSelectedPlace(place), modalEdit.onOpen()]}>
                          <Image alt={"Icon place"} onClick={() => [setSelectedPlace(place), modalEdit.onOpen()]} objectFit={'cover'} src={'/material-symbols_edit.svg'} />
                        </Box>
                        <Box cursor={'pointer'} onClick={() => [setSelectedPlace(place), modalDelete.onOpen()]}>
                          <Image alt={"Icon place"} onClick={() => [setSelectedPlace(place), modalDelete.onOpen()]} objectFit={'cover'} src={'/material-symbols_delete.svg'} />
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
      message={`O local ${selectedPlace?.name} será excluído. Tem certeza dessa ação?`}
      cancelText={'Cancelar'}
      confirmText={'Excluir'}
      isOpen={modalDelete.isOpen}
      onConfirm={() => handlerConfirm()}
      onClose={modalDelete.onClose}
    />

    <ModalPlace
      isOpen={isOpen}
      onClose={onClose}
      size={'2xl'}
      isEdit={false}
      idCompany={id_company}
    />
    <ModalPlace
      isOpen={modalEdit.isOpen}
      onClose={modalEdit.onClose}
      size={'2xl'}
      isEdit={true}
      selectPlace={selectedPlace}
      idCompany={id_company}
    />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  
  return {
    props: { }
  }
})

