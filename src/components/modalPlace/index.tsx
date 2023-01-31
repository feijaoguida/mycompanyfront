import { api } from "@/pages/api/apiCliente";
import { Flex, FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure, Divider, useToast  } from "@chakra-ui/react";
import { FormEvent, useState, useEffect } from "react";
import { modalPlaceProps, placeProps} from './interfaces/interfaces'


export default function ModalPlace({isOpen, onClose, size, isEdit , selectPlace, idCompany}: modalPlaceProps) {
  const [name, setName] = useState<string>('')
  const [stret, setStret] = useState<string>('')
  const [theNumber, setTheNumber] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  function clearFields(){
    setName('')
    setStret('')
    setTheNumber('')
    setCity('')
    setState('')
  }

  function setValuesFields(){
    setName(selectPlace?.name)
    setStret(selectPlace?.stret)
    setTheNumber(selectPlace?.number)
    setCity(selectPlace?.city)
    setState(selectPlace?.state)
  }

  useEffect(() => {
    if (isEdit){
      setValuesFields()
    } else {
      clearFields()
    }
  },[isOpen])

  function handleSubmit(event: FormEvent){
    event.preventDefault()

    if (isEdit) { 
      handleEdit()
    } else {
      handleCreate()
    }
  }

  async function handleEdit() {
    setLoading(true)
    
    const data: placeProps ={
      id: selectPlace?.id,
      name, 
      stret, 
      number: parseInt(theNumber),
      city,
      State: state, 
      company_id: idCompany,
    }
    console.log("data Edit = ", data)
    await api.patch(`/places/${selectPlace?.id}`, data)
    toast({
      position: 'top-right',
      title: `Local ${name} atualizado com sucesso.`,
      status: "success",
      isClosable: true,
    })
    clearFields()
    setLoading(false)
    onClose()
  }

  async function handleCreate(){
    setLoading(true)
    
    const data: placeProps ={
      name, 
      stret, 
      number: parseInt(theNumber),
      city,
      State: state, 
      company_id: idCompany,
    }
    console.log("data Edit = ", data)
    await api.post(`/places/`, data)
    toast({
      position: 'top-right',
      title: `Local ${name} inserido com sucesso.`,
      status: "success",
      isClosable: true,
    })
    clearFields()
    setLoading(false)
    onClose()
  }

  return (
  <>
    <Modal isOpen={isOpen} onClose={onClose} autoFocus size={size || '2xl'} >
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit} mb={'auto'} mt="auto" >
          <ModalHeader background={'#0385FD'} color={'white'} p={'1.5'} >{isEdit ? 'Editar Local' : 'Cadastar Local'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4} >
            <FormControl>
              <FormLabel mb={0} >Nome</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Informe o Nome" />
            </FormControl>

            <Flex gap={2} >
              <FormControl mt={4}>
                <FormLabel  mb={0} >Rua</FormLabel>
                <Input value={stret} onChange={(e) => setStret(e.target.value)} placeholder="Rua" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel  mb={0} >Numero</FormLabel>
                <Input type={'number'} value={theNumber} onChange={(e) => setTheNumber(e.target.value)} placeholder="Numero" />
              </FormControl>
            </Flex>
            <Flex gap={2} >
              <FormControl mt={4}>
                <FormLabel  mb={0} >Cidade</FormLabel>
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cidade" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel  mb={0} >Estado</FormLabel>
                <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="Estado" />
              </FormControl>
            </Flex>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button isLoading={loading} as='button' type='submit' bgColor={'#0385FD'} color={'#ffffff'}  fontWeight={600} fontSize={'20px'} variant={'solid'}>
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>
  )
}