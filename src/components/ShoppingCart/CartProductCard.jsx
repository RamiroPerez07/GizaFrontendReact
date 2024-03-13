import React, { useRef } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, Image, Text, useDisclosure } from '@chakra-ui/react'
import { CgMathMinus } from "react-icons/cg";
import { CgMathPlus } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { addProductToCart, decreaseProductFromCart, removeProductFromCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../utils/functions';

const CartProductCard = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const dispatch = useDispatch()


  
  

  return (
    <div style={{padding:"2px 5px",width:"100%",minHeight:"60px",display:"grid",alignItems:"center",gridTemplateColumns:"auto 1fr 20px",gap:"10px",boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",borderRadius: "0.375rem"}}>
      <Image
        boxSize="45px"
        src= {props.imagen}
        alt="Imagen del producto"
        objectFit="contain"
      />
      <div>
        <Text fontSize='xs' style={{marginLeft:"5px"}}>{props.descripcion}</Text>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0px 5px"}}>
          {
            (props.descuento > 0) ?
            <div style={{display:"flex"}}>
              <Text fontSize='xs' mr="5px"  style={{textDecoration: "line-through", textDecorationColor: "#a79d9d"}}>{"$ "+formatPrice(props.precio)}</Text> 
              <Text color="giza.700" fontSize='xs' fontWeight="500">{`$ ${formatPrice(Number(props.precio*(1-props.descuento/100)).toFixed(2))}`}</Text> 
            </div>  
            :
            <Text color="giza.700" fontSize='xs' fontWeight="500">{"$ "+formatPrice(props.precio)}</Text>
          }
          
          <div style={{display:"flex", alignItems:"center"}}>
            <Text fontSize='xs' style={{margin:"0px 10px"}}>Cantidad</Text>
            {
              props.quantity > 1 ?
              <IconButton 
                colorScheme='giza'
                _hover={{bg:"#0087BF"}}
                aria-label='Menos'
                icon={<CgMathMinus />} 
                style={{minWidth:"auto",width:"22px",height:"22px",margin:"3px"}}
                onClick = {() => dispatch(decreaseProductFromCart({...props}))}
              />:
              <IconButton 
                colorScheme='red'
                aria-label='Eliminar'
                icon={<FaTrash style={{width:"10px", height:"10px"}} />} 
                style={{minWidth:"auto",width:"22px",height:"22px",margin:"3px"}}
                onClick = {() => onOpen()}
              />
            }
            <Text fontSize='xs' w="20px" textAlign="center">{props.quantity}</Text>
            <IconButton 
              colorScheme='giza'
              _hover={{bg:"giza.700"}}
              aria-label='Mas'
              icon={<CgMathPlus />} 
              style={{minWidth:"auto",width:"22px",height:"22px",margin:"3px"}}
              onClick = {() => dispatch(addProductToCart({...props}))}
            />
          </div>
        </div>
      </div>
      {
      props.quantity > 1 &&
      <IconButton 
        colorScheme='red'
        aria-label='Borrar producto del carrito'
        icon={<FaTrash style={{width:"10px", height:"10px"}} />}  
        style={{width:"16px", height:"16px",margin:"3px", alignSelf:"start", minWidth:"auto"}}
        onClick={()=>onOpen()}
      />}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx="15px">
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>Confirmación</AlertDialogHeader>

            <AlertDialogBody>{`¿Desea eliminar ${props.descripcion} del carrito?`}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>Cancelar</Button>
              <Button colorScheme='red' onClick={() => {onClose();dispatch(removeProductFromCart({...props}))}} ml={3}>Si</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}

export default CartProductCard