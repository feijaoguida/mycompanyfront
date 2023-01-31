import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/pages/api/apiCliente";
import { Flex, FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure, Divider, useToast  } from "@chakra-ui/react";
import { FormEvent, useContext, useState, useEffect } from "react";
import { modalCompanyProps, companyProps} from './interfaces/interfaces'


export function ModalCompany({isOpen, onClose, size, isEdit , selectCompany}: modalCompanyProps) {
  const [name, setName] = useState<string | undefined>('')
  const [website, setWebsite] = useState<string | undefined>('')
  const [cnpj, setCnpj] = useState<string | undefined>('')
  const [loading, setLoading] = useState(false)
  const {user} = useContext(AuthContext)
  const toast = useToast()

  function clearFields(){
    setName('')
    setWebsite('')
    setCnpj('')
  }

  function setValuesFields(){
    setName(selectCompany?.name)
    setWebsite(selectCompany?.website)
    setCnpj(selectCompany?.cnpj)
  }

  useEffect(() => {
    if (isEdit){
      setValuesFields()
    } else {
      clearFields()
    }
  },[selectCompany])

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
    
    const data: companyProps ={
      id: selectCompany?.id,
      name, 
      website, 
      cnpj, 
      user_id: user?.id,
    }
    await api.patch(`/companies/${selectCompany?.id}`, data)
    toast({
      position: 'top-right',
      title: `Empresa ${name} atualizada com sucesso.`,
      status: "success",
      isClosable: true,
    })
    clearFields()
    setLoading(false)
    onClose()
  }

  async function handleCreate(){
    setLoading(true)
    
    const data: companyProps ={
      name, 
      website, 
      cnpj, 
      user_id: user?.id,
    }
    await api.post(`/companies/`, data)
    toast({
      position: 'top-right',
      title: `Empresa ${name} inserida com sucesso.`,
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
          <ModalHeader background={'#0385FD'} color={'white'} p={'1.5'} >{isEdit ? 'Editar Empresa' : 'Cadastar Empresa'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4} >
            <FormControl>
              <FormLabel mb={0} >Nome</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Informe o Nome" />
            </FormControl>

            <Flex gap={2} >
              <FormControl mt={4}>
                <FormLabel  mb={0} >WebSite</FormLabel>
                <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="WebSite" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel  mb={0} >Cnpj</FormLabel>
                <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Cnpj" />
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