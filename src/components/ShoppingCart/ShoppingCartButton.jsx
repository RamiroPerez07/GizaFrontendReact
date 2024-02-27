import React, { useRef } from 'react'
import { IconButton, useDisclosure, Button, Text, Divider, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import { FaShoppingCart } from "react-icons/fa";
import { StyledCartCounter } from './ShoppingCartButton';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import CartProductCard from './CartProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllProductsFromCart } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const ShoppingCartButton = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef();

  const {isOpen: isOpenBuy, onOpen: onOpenBuy, onClose: onCloseBuy} = useDisclosure();
  const btnBuyRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {isOpen: isOpenDeleteAllProducts, onOpen: onOpenDeleteAllProducts, onClose: onCloseDeleteAllProducts} = useDisclosure();
  const btnDeleteAllProductsRef = useRef();

  const products = useSelector(state => state.cart.productsCart)

  const calculateQuantity = () => {
    return products.reduce((prev,current)=> prev + current.quantity, 0)
  }

  const calculateSubtotal = () => {
    return products.reduce((prev, current) => prev + current.quantity * current.precio,0  )
  }

  return (
    <>
      <div style={{position:"relative"}} onClick={onOpen} ref={btnRef}>
        <StyledCartCounter>{calculateQuantity()}</StyledCartCounter>
        <IconButton aria-label='Carrito' variant="outline" icon={<FaShoppingCart />} />
      </div>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent style={{top:"70px",maxWidth:"420px"}}>
          <DrawerCloseButton />
          <DrawerHeader>Tus Productos</DrawerHeader>
          <DrawerBody>
            <div style={{width:"100%",padding:"10px",display:"grid",maxHeight:"400px",gap:"15px"}}>
              {products.map(product => (<CartProductCard key={product.id} {...product} />))}
            </div>
          </DrawerBody>

          <DrawerFooter style={{display:"flex",flexDirection:"column"}}>
            <Divider my="5px" />
            <div style={{display:"flex",flexDirection:"column",width:"100%", maxWidth:"320px",margin:"20px auto"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%",margin:"5px 0px"}}>
                <Text>Subtotal</Text>
                <Text>$ {calculateSubtotal()}</Text>
              </div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%",margin:"5px 0px"}}>
                <Text as="b">Total</Text>
                <Text as="b">$ {calculateSubtotal()}</Text>
              </div>
            </div>
            <div style={{display:"flex"}}>
              {products.length >= 1 && <Button colorScheme='teal' mr={3} onClick={onOpenBuy}>Comprar</Button>}
              {products.length >= 1 && <Button variant='outline' onClick={onOpenDeleteAllProducts}>Eliminar todos</Button>}
            </div>

            {/* Alerta para eliminar productos */}
            <AlertDialog
              isOpen={isOpenDeleteAllProducts}
              leastDestructiveRef={btnDeleteAllProductsRef}
              onClose={onCloseDeleteAllProducts}
              isCentered
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>Confirmación</AlertDialogHeader>

                  <AlertDialogBody>¿Desea eliminar todos los productos?</AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={btnDeleteAllProductsRef} onClick={onCloseDeleteAllProducts}>Cancelar</Button>
                    <Button colorScheme='red' onClick={() => {dispatch(removeAllProductsFromCart());onCloseDeleteAllProducts();}} ml={3}>Si</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>

            {/* Alerta para confirmar compra */}
            <AlertDialog
              isOpen={isOpenBuy}
              leastDestructiveRef={btnBuyRef}
              onClose={onCloseBuy}
              isCentered
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>Confirmación</AlertDialogHeader>

                  <AlertDialogBody>¿Desea continuar con la compra?</AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={btnDeleteAllProductsRef} onClick={onCloseBuy}>Cancelar</Button>
                    <Button colorScheme='teal' onClick={() => {navigate("/confirmar-orden");onCloseBuy();onClose();}} ml={3}>Si</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ShoppingCartButton