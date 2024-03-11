import React, { useEffect, useRef, useState } from 'react'
import { StyledProductsContainer } from '../Products/ProductsStyles'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { confirmOrderSchema } from '../../validationSchemas'
import CartProductCard from '../ShoppingCart/CartProductCard'
import { /*useDispatch,*/ useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../axios/orders'
import { errors } from '../../errors'
import { StyledConfirmWrapper } from './ConfirmOrder.js'



const ConfirmOrder = () => {

  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const [subtotal, setSubtotal] = useState(0);


  const toast = useToast();

  const products = useSelector(state => state.cart.productsCart)

  const currentUser = useSelector(state => state.user.user)


  //valido si el usuario esta logeado
  useEffect(()=>{
    if (!currentUser){
      navigate("/iniciar-sesion");
    }
  }, [currentUser, navigate])

  //con esta funcion me aseguro que cuando no hay nada en el carrito, vuelve al catalogo
  useEffect(() => {
    const subtotal = products.reduce((prev, current)=>prev+current.quantity * current.precio,0);
    setSubtotal(subtotal)
    if (subtotal <= 0) {
      navigate("/productos")
    }
  }, [products,navigate])


  const confirmOrder = async (userData) => {
    const items = products.map(product => {
      return {
        idProducto: product._id,
        descripcion: product.descripcion,
        marca: product.marca,
        categoria: product.categoria,
        precio: product.precio,
        imagen: product.imagen,
        descuento: product.descuento,
        estado: product.estado,
        cantidad: product.quantity,
      }
    })
    try {

      const response = await createOrder({items: items ,detalleContacto: userData ,monto: subtotal},currentUser) ;

      console.log("El resultado de la respuesta es ==> ", response)

      if (response.status === 201) {
        toast({
          title: ``,
          description: `El pedido se cargó exitosamente`,
          status: "success",
          duration: "2500",
          isClosable: true,
        })
        navigate("/pedidos");
        // dispatch(removeAllProductsFromCart());  //Elimino los productos del carrito
        return 
      }  

      if (response.response.data.msg === errors.TOKEN_NO_VALIDO){
        toast({
          title: ``,
          description: `Necesitas iniciar sesión para proceder a la carga del pedido`,
          status: "error",
          duration: "2500",
          isClosable: true,
        })
        navigate("/iniciar-sesion");
      }
  

      
    } catch (error) {
      alert(error)
      return error
    }

  }

  const [confirmation, setConfirmation] = useState({proceed: () => {}})


  const getConfirmation = async () => {
    const promise = new Promise((res,rej)=>{
      onOpen();
      setConfirmation({proceed: res})
    })

    return promise
  }



  

  return (
    <>
    <Heading as="h2" my="20px" style={{fontSize: "1.2rem",fontWeight: "500",textAlign: "center"}}>Completá el formulario</Heading>
    <StyledProductsContainer>
      <StyledConfirmWrapper>
        <Box w="full" maxW="450px" mt="10px" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <Heading as="h2" textAlign={{base:"left",sm:"center"}} w="full" style={{fontWeight:"500", fontSize:"1.1rem", textAlign:"center", marginBottom:"10px"}}>Ingresá tus datos</Heading>
          <Formik
            initialValues={{ 
                contacto: "",
                documento: "",
                telefono: "",
            }}

            validationSchema={confirmOrderSchema}

            onSubmit={ async (values, actions) => {
              const userData = {
                contacto: values.contacto,
                documento: values.documento,
                telefono: values.telefono} //se graban en el estado, los resultados de los valores ingresados al formulario
              const confirmation = await getConfirmation()
              if (!confirmation) return 
              await confirmOrder(userData);
              actions.setSubmitting(false);
              actions.resetForm();
            }}
          >
            {(props) => (
              <Form style={{display:"flex", flexDirection:"column", width:"90%", maxWidth:"320px", alignItems:"center"}}>
                <Field name='contacto'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.contacto && form.touched.contacto} my="15px">
                      <FormLabel>Contacto</FormLabel>
                      <Input {...field} placeholder='Nombre y Apellido' />
                      <FormErrorMessage>{form.errors.contacto}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='documento'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.documento && form.touched.documento} my="15px">
                      <FormLabel>Documento DNI</FormLabel>
                      <Input {...field} placeholder='Documento DNI' type='number' />
                      <FormErrorMessage>{form.errors.documento}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='telefono'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.telefono && form.touched.telefono} my="15px">
                      <FormLabel>Teléfono o celular</FormLabel>
                      <Input {...field} placeholder='Teléfono' type="number" />
                      <FormErrorMessage>{form.errors.telefono}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button my="20px" colorScheme='giza' _hover={{bg:"giza.700"}} isLoading={props.isSubmitting} type='submit'>Confirmar</Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Box w="full" maxWidth="450px">        
          <Heading as="h2" w="full" style={{fontWeight:"500", fontSize:"1.1rem", textAlign:"center", marginBottom:"10px"}}>Tus productos</Heading>
          <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <div style={{width:"100%", maxWidth:"400px",padding:"10px",display:"grid",maxHeight:"400px",gap:"15px", overflowY:"scroll"}}>
                {products.map(product => (<CartProductCard key={product._id} {...product} />))}
            </div>
            <Divider my="10px" style={{width:"100%", maxWidth:"400px"}} />
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%", maxWidth:"320px",margin:"5px auto"}}>
              {/*
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%",margin:"5px 0px"}}>
                <Text>Subtotal</Text>
                <Text>$ 1000</Text>
              </div>
              */}
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%", maxWidth:"250px"}}>
                <Text as="b">Total</Text>
                <Text as="b">$ {subtotal}</Text>
              </div>
            </div>
          </div>
        </Box>
      </StyledConfirmWrapper>
      
      {/* Alerta */}
      <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={()=>{onClose(); confirmation.proceed(false)}}
          isCentered

        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>Confirmación</AlertDialogHeader>

              <AlertDialogBody>¿Desea confirmar el pedido?</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => {onClose(); confirmation.proceed(false)}}>Cancelar</Button>
                <Button colorScheme='teal' onClick={async () => {onClose(); confirmation.proceed(true)}} ml={3}>Si</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

    </StyledProductsContainer>
    </>
  )
}

export default ConfirmOrder