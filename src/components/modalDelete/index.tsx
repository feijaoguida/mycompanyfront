import { Button } from "@chakra-ui/react"
import React, { useRef } from "react"
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'

export function ModalDelete({
  title,
  message,
  cancelText,
  confirmText,
  confirmSchema,
  isOpen,
  onConfirm,
  onClose
}: any) {
  const cancelRef = useRef<any>()

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      closeOnEsc
    >
      <AlertDialogOverlay>
        <AlertDialogContent width="90%" color={'white'}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color={'white'} bg={'red.900'}>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody color={'blackAlpha.900'}>{message}</AlertDialogBody>

          <AlertDialogFooter>
            {confirmText && (
              <Button bg={'red.900'} color={'white'} onClick={onConfirm} ml={3}>
                {confirmText}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

