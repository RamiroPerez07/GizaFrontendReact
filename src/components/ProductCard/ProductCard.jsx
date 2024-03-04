import React, { useContext, useState } from 'react'
import { Card, Heading, Stack, CardBody, Text, Image, CardFooter, ButtonGroup, Button, Divider, useToast, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, FormErrorMessage, Select, ModalFooter, InputRightElement, InputGroup } from '@chakra-ui/react'
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/actions/cartActions';
import { FaEdit } from "react-icons/fa";
import { ROLES } from '../../utils/constants';
import { editProductSchema } from '../../validationSchemas';
import { Field, Form, Formik } from 'formik';
import {setCurrentUser} from "../../redux/actions/userActions.js";
import {errors} from "../../errors/index.js";
import { editProduct } from '../../axios/products.js';
import { useNavigate } from 'react-router-dom';
import { ProductFilterContext } from '../../contexts/productContext.js';


const ProductCard = (props) => {
  const {_id, descripcion, marca, categoria, precio, imagen, descuento, estado} = props

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const productFilterData = useContext(ProductFilterContext);
  const { products, 
          setProducts, 
          isLoadingProducts, 
          setIsLoadingProducts, 
          filterData, 
          setFilterData, 
          filterParams,
          filterActive,
          setFilterActive,
          setFilterParams,
          fetchAllProducts,
          filterProductsByParams,
        } = productFilterData;

  const user = useSelector(state => state.user.user);

  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
    <Card w="full" maxW='220px'>
      <CardBody style={{padding:"15px 20px", position: "relative"}}>
        {user?.rol === ROLES.admin && <IconButton onClick={onOpen} style={{position:"absolute", top:"15px", right:"15px", display:"grid", placeItems:"center"}} size="xs" aria-label='Editar producto' icon={<FaEdit />} />}
        <Image
          src= {imagen}
          alt='Imagen del producto'
          borderRadius='lg'
          maxW="120px"
          maxH="80px"
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

    <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent maxW="min(400px,90%)">
          <ModalHeader py="10px" fontSize="md">Editar producto</ModalHeader>
          <ModalCloseButton />
          
            <Formik
              initialValues={{
                descripcion: descripcion,
                marca: marca,
                categoria: categoria,
                imagen: imagen,
                precio: precio,
                descuento: descuento,
                estado: estado,
              }}
              validationSchema={editProductSchema}
              onSubmit={ async (values, actions)=>{
                
                try {
                  const response = await editProduct({...values, _id: _id},user) ;
            
                  console.log("El resultado de la respuesta es ==> ", response)
            
                  if (response.status === 200) {
                    toast({
                      title: ``,
                      description: `El producto se modifico exitosamente`,
                      status: "success",
                      duration: "2500",
                      isClosable: true,
                    })
  
                    onClose();
                    filterProductsByParams(filterParams);
                    return;
                  }
            
                  if (response.response.data.msg === errors.TOKEN_NO_VALIDO){
                    toast({
                      title: ``,
                      description: `Necesitas iniciar sesión para proceder a la carga del producto`,
                      status: "error",
                      duration: "2500",
                      isClosable: true,
                    })
                    dispatch(setCurrentUser(null)); //se desloguea el usuario
                    navigate("/iniciar-sesion");
                  }
  
                  if (response.response.data.msg === errors.USUARIO_NO_ADMINISTRADOR){
                    toast({
                      title: ``,
                      description: `Necesitas permisos de administrador para cargar el producto`,
                      status: "error",
                      duration: "2500",
                      isClosable: true,
                    })
                    dispatch(setCurrentUser(null)); //se desloguea el usuario
                    navigate("/iniciar-sesion");
                  }
              
            
                  
                } catch (error) {
                  alert(error)
                  return error
                }


                actions.setSubmitting(false)
                actions.resetForm();
                onClose();
              }}
            > 
            {
              (props) => (
                <Form style={{display:"flex", flexDirection:"column", width:"100%", alignItems:"center"}}>
                  <ModalBody px="25px" w="full">
                  <Field name='descripcion'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.descripcion && form.touched.descripcion} my="5px">
                        <FormLabel fontSize="xs" my="2px">Descripción</FormLabel>
                        <Input {...field} size="sm" placeholder="Descripción" type="text" />
                        <FormErrorMessage fontSize="xs">{form.errors.descripcion}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='marca'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.marca && form.touched.marca} my="5px">
                        <FormLabel fontSize="xs" my="2px">Marca</FormLabel>
                        <Input {...field} size="sm" placeholder="Marca" type="text" />
                        <FormErrorMessage fontSize="xs">{form.errors.marca}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='categoria'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.categoria && form.touched.categoria} my="5px">
                        <FormLabel fontSize="xs" my="2px">Categoria</FormLabel>
                        <Input {...field} size="sm" placeholder="Categoria" type="text" />
                        <FormErrorMessage fontSize="xs">{form.errors.categoria}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='imagen'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.imagen && form.touched.imagen} my="5px">
                        <FormLabel fontSize="xs" my="2px">Imagen</FormLabel>
                        <Input {...field} size="sm" placeholder="Imagen" type="text" />
                        <FormErrorMessage fontSize="xs">{form.errors.imagen}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 130px", gap:"15px"}}>
                    <Field name='precio'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.precio && form.touched.precio} my="5px">
                          <FormLabel fontSize="xs" my="2px">Precio</FormLabel>
                          <Input {...field} size="sm" placeholder="Precio" type="number" />
                          <FormErrorMessage fontSize="xs">{form.errors.precio}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='descuento'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.descuento && form.touched.descuento} my="5px">
                          <FormLabel fontSize="xs" my="2px">Descuento</FormLabel>
                          <InputGroup>
                            <Input {...field} size="sm" placeholder="Descuento" type="number" />
                            <InputRightElement>%</InputRightElement>
                          </InputGroup>
                          <FormErrorMessage fontSize="xs">{form.errors.descuento}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </div>
                  <Field name="estado"> 
                      {({field,form}) => (
                        <FormControl isInvalid={form.errors.estado && form.touched.estado} my="5px">
                        <FormLabel fontSize="xs" my="2px">Estado</FormLabel>
                        <Select size="sm" {...field}>
                          <option value="Activo">Activo</option>
                          <option value="Bloqueado">Bloqueado</option>
                          <option value="Publicitado">Publicitado</option>
                        </Select> 
                        <FormErrorMessage fontSize="xs">{form.errors.estado}</FormErrorMessage>
                      </FormControl>
                      )}
                  </Field>
                  </ModalBody>
                  <ModalFooter>
                    <Button size='sm' colorScheme='teal' mr={3} isLoading={props.isSubmitting} type="submit">Guardar</Button>
                    <Button size='sm' variant='ghost' onClick={onClose}>Cancelar</Button>
                  </ModalFooter>
                </Form>
              )
            }
            </Formik>
            
          
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProductCard