import React, { useRef } from 'react'
import {  useDisclosure, Button,  Divider, Text, Heading, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useMediaQuery, IconButton} from '@chakra-ui/react'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { setCurrentUser } from '../../redux/actions/userActions';

import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { removeAllProductsFromCart } from '../../redux/actions/cartActions';

const UserProfile = (props) => {

  const {user} = props

  const navigate = useNavigate()

  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef();

  const {isOpen: isOpenLogout, onOpen: onOpenLogout, onClose: onCloseLogout} = useDisclosure();
  const btnLogoutRef = useRef();

  const dispatch = useDispatch();

  const [isLargerThan1280] = useMediaQuery('(min-width: 750px)')

  return (
    <>
    {isLargerThan1280? 
    <Button leftIcon={<FaUser />} colorScheme='giza' _hover={{bg:"giza.700"}} variant='solid' onClick={() => {onOpen()}} ref={btnRef}>{user.usuarioNombre}</Button>:
    <IconButton icon={<FaUser />} colorScheme='giza' _hover={{bg:"giza.700"}} variant='solid' onClick={() => {onOpen()}} ref={btnRef} />
    }

      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent style={{top:"70px",maxWidth:"420px"}}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading as="h3" style={{fontWeight:"500", fontSize: "1.2rem", marginBottom:"5px"}}>Hola, {user.usuarioNombre}</Heading>
            <Text style={{fontWeight:"300", fontSize: "0.9rem"}}>{user.email}</Text>
          </DrawerHeader>
          <Divider />
          <DrawerBody style={{display:"flex", flexDirection:"column"}}>
            <ChakraLink as={ReactRouterLink} to="/pedidos" mb="5px" style={{marginBottom:"5px",fontSize:"1rem"}} onClick={onClose}>Mis pedidos</ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/cambiar-clave" style={{marginBottom:"5px",fontSize:"1rem"}} onClick={onClose}>Cambiar contraseña</ChakraLink>
            <ChakraLink onClick={ () => {onOpenLogout(); dispatch(removeAllProductsFromCart())}  } style={{marginBottom:"5px",fontSize:"1rem"}}>Cerrar Sesión</ChakraLink>
          </DrawerBody>

          <DrawerFooter style={{display:"flex",flexDirection:"column"}}>
            <Divider my="5px" />
            <div style={{display:"flex",flexDirection:"column",width:"100%", maxWidth:"320px",margin:"20px auto"}}>
            </div>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Alerta para eliminar productos */}
      <AlertDialog
        isOpen={isOpenLogout}
        leastDestructiveRef={btnLogoutRef}
        onClose={onCloseLogout}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx="15px">
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>Confirmación</AlertDialogHeader>

            <AlertDialogBody>¿Deseas cerrar sesión?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={btnLogoutRef} onClick={onCloseLogout}>Cancelar</Button>
              <Button colorScheme='red' onClick={() => {dispatch(setCurrentUser(null));onCloseLogout();}} ml={3}>Si</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
    
  )
}

export default UserProfile