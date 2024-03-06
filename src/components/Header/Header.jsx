import React, {useRef} from 'react'
import { StyledHeader, StyledHeaderContent, StyledNavbar, StyledNavbarContent, NavbarItem, StyledNavbarSummary } from './HeaderStyles'
import { IconButton, Button, Text, Image } from '@chakra-ui/react'
import { FiLogIn } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import { useDisclosure } from '@chakra-ui/react';
import { DrawerContent, DrawerBody, DrawerHeader, DrawerOverlay, Drawer, DrawerFooter, DrawerCloseButton } from '@chakra-ui/react';
import ShoppingCartButton from '../ShoppingCart/ShoppingCartButton.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserProfile from '../UserProfile/UserProfile.jsx';


const Header = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const navigate = useNavigate()

  const user = useSelector(state => state.user.user)

  return (
    <>
      <StyledHeader>
        <StyledHeaderContent>
          <Image src='https://res.cloudinary.com/dhnicvwkw/image/upload/v1709693839/logo_Giza_btneu2.png' name="Imagen de Giza" boxSize="12" objectFit="contain" />
          <StyledNavbar>
            <StyledNavbarContent>
              <NavbarItem className={({ isActive }) => (isActive ? "active" : "")} to={"/"}>Inicio</NavbarItem>
              <NavbarItem className={({ isActive }) => (isActive ? "active" : "")} to={"/productos"}>Productos</NavbarItem>
              <NavbarItem className={({ isActive }) => (isActive ? "active" : "")} to={"/contacto"}>Contacto</NavbarItem>
              <ShoppingCartButton />
              {
                user ?
                <UserProfile user={user} /> :
                <Button leftIcon={<FiLogIn />} colorScheme='cyan' variant='outline' onClick={()=>{navigate("/iniciar-sesion")}}>Ingresar</Button>
              }
            </StyledNavbarContent>
            <StyledNavbarSummary>
              <ShoppingCartButton />
              <IconButton ml="10px" aria-label='Menu Hamburguesa' variant="outline" ref={btnRef} onClick={onOpen} icon={<HiMenu />} />
              <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Menú</DrawerHeader>
                  <DrawerBody style={{display:"flex", flexDirection:"column", alignItems:"start"}}>
                    <NavbarItem style={{marginBottom:"15px"}} className={({ isActive }) => (isActive ? "active" : "")} to={"/"} onClick={onClose}>Inicio</NavbarItem>
                    <NavbarItem style={{marginBottom:"15px"}} className={({ isActive }) => (isActive ? "active" : "")} to={"/productos"} onClick={onClose}>Productos</NavbarItem>
                    <NavbarItem style={{marginBottom:"15px"}} className={({ isActive }) => (isActive ? "active" : "")} to={"/contacto"} onClick={onClose}>Contacto</NavbarItem>
                    <Button style={{marginBottom:"15px"}} leftIcon={<FiLogIn />} colorScheme='cyan' variant='outline' onClick={()=>{navigate("/iniciar-sesion");onClose()}}>Ingresar</Button>
                  </DrawerBody>
                  <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>Salir</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </StyledNavbarSummary>
          </StyledNavbar>
        </StyledHeaderContent>
      </StyledHeader>
    </>
  )
}

export default Header