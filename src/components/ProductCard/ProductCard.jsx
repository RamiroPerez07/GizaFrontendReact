import React from 'react'
import { Card, Heading, Stack, CardBody, Text, Image, CardFooter, ButtonGroup, Button, Divider, useToast } from '@chakra-ui/react'
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/actions/cartActions';

const ProductCard = (props) => {
  const {_id, descripcion, marca, categoria, precio, imagen, descuento, estado} = props

  const dispatch = useDispatch()

  const toast = useToast()

  const addProduct = (product) => {
    dispatch(addProductToCart(product));
    toast({
      title: `Producto agregado al carrito`,
      description: `${product.descripcion}`,
      status: "success",
      duration: "2500",
      isClosable: true,
    })

  }

  return (
    <Card w="full" maxW='220px'>
      <CardBody style={{padding:"15px 20px"}}>
        <Image
          src= {imagen}
          alt='Imagen del producto'
          borderRadius='lg'
          maxW="120px"
          margin="auto"
        />
        <Stack mt='4' spacing='2'>
          <Heading size='xs' minH="25px">{descripcion}</Heading>
          <Text style={{fontSize:"0.7rem", fontStyle: "italic", fontWeight: "300"}}>{categoria}</Text>
          <Text style={{fontSize:"0.7rem"}}>{marca}</Text>
          <Text as="b" color='teal.600' fontSize='s'>${precio}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter style={{padding:"15px",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <ButtonGroup spacing='1'>
          <Button leftIcon={<FaCartPlus />} colorScheme='teal' variant='solid' size="sm" onClick={()=>addProduct({_id,descripcion,precio,imagen,marca})}>
            Agregar al carrito
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default ProductCard