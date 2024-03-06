import React, {useContext, useEffect, useRef, useState} from 'react'
import { StyledProductsContainer, StyledProductsWrapper } from './ProductsStyles'
import { FormControl, Input, IconButton, FormErrorMessage, FormLabel, InputGroup, InputRightElement, useToast, Stack, Skeleton, Alert, AlertIcon, List, ListItem, ListIcon } from '@chakra-ui/react'
import { FaSearch,  } from "react-icons/fa";
import ProductCard from '../ProductCard/ProductCard';
import { FaFilter } from "react-icons/fa6";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Text
} from '@chakra-ui/react'

import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'
import products from '../../data/products';
import { Field, Form, Formik } from 'formik';
import { filterProductsSchema, newProductSchema } from '../../validationSchemas';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from '../../utils/constants';
import { VscNewFile } from "react-icons/vsc";
import { createProduct, filterProducts, getProducts } from '../../axios/products';
import { errors } from '../../errors';
import { setCurrentUser } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { ProductFilterContext } from '../../contexts/productContext';

const Products = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();  //modal de filtros
  const { isOpen: isOpenNew, onOpen: onOpenNew, onClose: onCloseNew} = useDisclosure(); //modal de nuevo producto


  const user = useSelector(state => state.user.user)

  const dispatch = useDispatch();

  const toast = useToast();

  const navigate = useNavigate();

  const titleStyles = {
    fontSize: "1.2rem",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: "25px"
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

  // const [products , setProducts] = useState({items: []})

  // const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  // const [filterData, setFilterData] = useState({brands: [], categories: []})

  // const initialStateFilter = {categoria: "", marca: "", precioEntre: [0,100000], descripcion: ""}
  // const [filterParams, setFilterParams] = useState(initialStateFilter)

  // const initialStateFilterActive = {categoria: false, marca: false, precioEntre: false, descripcion: false}
  // const [filterActive, setFilterActive] = useState(initialStateFilterActive)

  const searchRef = useRef(null)

  useEffect( () => {
    const fetchAllProducts = async () => {
      setIsLoadingProducts(true);
      const response = await getProducts();

      if (response.status === 200) {
        setProducts({items: response.data.data})
        
        // en esta etapa actualizo los filtros, porque puede ser que se agregue una marca no existente
        const marcas = response.data.data?.map(p=> p.marca).filter((brand, index, arr) => {
          return arr.indexOf(brand) === index;
        })
        const categorias = response.data.data?.map(p=> p.categoria).filter((category, index, arr) => {
          return arr.indexOf(category) === index;
        })
        setFilterData({brands: marcas, categories: categorias})
        setIsLoadingProducts(false);
        return
      } 

      alert("Ha ocurrido un error en la carga de los productos")

    }

    fetchAllProducts();

  }, [] /* Solo cuando el componente se monta, por eso arr vacio */)

  // const fetchAllProducts = async () => {
  //   setIsLoadingProducts(true);
  //     const response = await getProducts();

  //     if (response.status === 200) {
  //       setProducts({items: response.data.data})
  //       setIsLoadingProducts(false);
  //       setFilterParams(initialStateFilter);
  //       setFilterActive(initialStateFilterActive);
  //       return;
  //     }
  //     alert("Ha ocurrido un error en la carga de los productos")
  // }

  // const filterProductsByParams = async (values) => {
  //   const filter = async () => {
  //     setIsLoadingProducts(true);
  //     const response = await filterProducts({...values});

  //     if (response.status === 200) {
  //       setProducts({items: response.data.data})
  //       setIsLoadingProducts(false);
  //       return
  //     } 

  //     alert("Ha ocurrido un error en la carga de los productos")
  //   }

  //   filter()
    
  //   let optionChosen = {}

  //   if (values.descripcion !== ""){
  //     optionChosen = {...optionChosen, descripcion: true}
  //   } 
  //   if (values.categoria !== ""){
  //     optionChosen = {...optionChosen, categoria: true}
  //   } 
  //   if (values.marca !== "") {
  //     optionChosen = {...optionChosen, marca: true}
  //   }
  //   if (values.precioEntre[0] !== 0 || values.precioEntre[1] !== 100000){
  //     optionChosen = {...optionChosen, precioEntre: true}
  //   }

  //   console.log(optionChosen)

  //   setFilterParams(values);
  //   setFilterActive({...initialStateFilterActive, ...optionChosen})

  // }

  return (
    <StyledProductsContainer style={{padding: "15px"}}>
      <h2 style={titleStyles}>¡Conocé nuestros productos!</h2>
      <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
        <FormControl style={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"20px"}}>
          <form onSubmit={(e)=>{e.preventDefault();filterProductsByParams({...filterParams, descripcion: searchRef.current.value})}} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Input placeholder='Buscar' size='md' maxW="300px" w="full" ref={searchRef} />
            <IconButton type="submit" mx="4px" icon={<FaSearch />}/>
          </form>
          {Object.values(filterActive).some(v => v === true)? <IconButton onClick={()=>{fetchAllProducts()}} icon={<FaFilterCircleXmark />} /> : <IconButton onClick={onOpen} icon={<FaFilter />}/>}
          {user?.rol === ROLES.admin && <IconButton mx="4px" onClick={onOpenNew} icon={<VscNewFile />} />}
        </FormControl>
      </div>
      {<List>
          Filtraste por:
          {filterActive.descripcion &&
            <ListItem>
            <ListIcon as={FaFilter} />
            {`Descripción: ${filterParams.descripcion}`}
          </ListItem>}
          {filterActive.categoria &&
            <ListItem>
            <ListIcon as={FaFilter} />
            {`Categoria: ${filterParams.categoria}`}
          </ListItem>}
          {filterActive.marca &&
            <ListItem>
            <ListIcon as={FaFilter} />
            {`Marca: ${filterParams.marca}`}
          </ListItem>}
          {filterActive.precioEntre &&
            <ListItem>
            <ListIcon as={FaFilter} />
            {`Precio: Entre ${filterParams.precioEntre[0]} y ${filterParams.precioEntre[1]}`}
          </ListItem>}
        </List>
      }
      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent maxW="min(400px,90%)">
          <ModalHeader py="10px" fontSize="md">Filtro</ModalHeader>
          <ModalCloseButton />
          
            <Formik
              initialValues={{
                categoria:"",
                marca: "",
                precioEntre: [0,100000],
              }}
              validationSchema={filterProductsSchema}
              onSubmit={(values, actions)=>{

                filterProductsByParams({...values, descripcion: searchRef.current.value})

                actions.setSubmitting(false)
                actions.resetForm();
                onClose();
              }}
            > 
            {
              (props) => (
                <Form style={{display:"flex", flexDirection:"column", width:"100%", alignItems:"center"}}>
                  <ModalBody px="25px" w="full">
                  <Field name='categoria'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.categoria && form.touched.categoria} my="15px">
                        <FormLabel fontSize="xs">Categoria</FormLabel>
                        <Select size="sm" {...field}>
                          <option value="">Todas</option>
                          {
                            filterData.categories?.map((category,index) => {
                              return <option key={index} value={category}>{category}</option>
                            })
                          }
                        </Select> 
                        <FormErrorMessage>{form.errors.categoria}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="marca"> 
                      {({field,form}) => (
                        <FormControl isInvalid={form.errors.marca && form.touched.marca} my="15px">
                        <FormLabel fontSize="xs">Marca</FormLabel>
                        <Select size="sm" {...field}>
                          <option value="">Todas</option>
                          {
                            filterData.brands?.map((brand,index) => {
                              return <option key={index} value={brand}>{brand}</option>
                            })
                          }
                        </Select> 
                        <FormErrorMessage>{form.errors.marca}</FormErrorMessage>
                      </FormControl>
                      )}
                  </Field>
                  <Field name="precioEntre"> 
                      {({field,form}) => (
                        <FormControl isInvalid={form.errors.precioEntre && form.touched.precioEntre} my="15px">
                        <FormLabel fontSize="xs">Precio</FormLabel>
                        <Text fontSize="sm">{`Entre $ ${field?.value[0]} y $ ${field?.value[1]}`}</Text>
                        <RangeSlider size="sm" colorScheme='giza' step={1000} min={0} max={100000} defaultValue={[field?.value[0], field?.value[1]]} onChange={(e)=>{props.setFieldValue("precioEntre", e)}}>
                          <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                          </RangeSliderTrack>
                          <RangeSliderThumb bg="giza.700" index={0} />
                          <RangeSliderThumb bg="giza.700" index={1} />
                        </RangeSlider>
                        <FormErrorMessage>{form.errors.precioEntre}</FormErrorMessage>
                      </FormControl>
                      )}
                  </Field>
                  </ModalBody>
                  <ModalFooter>
                    <Button size='sm' colorScheme='giza' _hover={{bg:"giza.700"}} mr={3} isLoading={props.isSubmitting} type="submit" onClick={onClose}>Aplicar</Button>
                    <Button size='sm' variant='ghost' onClick={() => {fetchAllProducts();setFilterParams(null); onClose()}}>Borrar</Button>
                  </ModalFooter>
                </Form>
              )
            }
            </Formik>
            
          
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenNew} onClose={onCloseNew} isCentered >
        <ModalOverlay />
        <ModalContent maxW="min(400px,90%)">
          <ModalHeader py="10px" fontSize="md">Nuevo producto</ModalHeader>
          <ModalCloseButton />
          
            <Formik
              initialValues={{
                descripcion: "",
                marca: "",
                categoria: "",
                imagen: "",
                precio: "",
                descuento: 0,
                estado: "Activo",
              }}
              validationSchema={newProductSchema}
              onSubmit={ async (values, actions)=>{
                try {
                  const response = await createProduct({...values},user) ;
            
                  console.log("El resultado de la respuesta es ==> ", response)
            
                  if (response.status === 201) {
                    toast({
                      title: ``,
                      description: `El producto se cargó exitosamente`,
                      status: "success",
                      duration: "2500",
                      isClosable: true,
                    })
  
                    onCloseNew();
  
                    const fetchAllProducts = async () => {
                      setIsLoadingProducts(true);
                      const response = await getProducts();
                
                      if (response.status === 200) {
                        setProducts({items: response.data.data})
                        
                        // en esta etapa actualizo los filtros, porque puede ser que se agregue una marca no existente
                        const marcas = response.data.data?.map(p=> p.marca).filter((brand, index, arr) => {
                          return arr.indexOf(brand) === index;
                        })
                        
                        const categorias = response.data.data?.map(p=> p.categoria).filter((category, index, arr) => {
                          return arr.indexOf(category) === index;
                        })
                        setFilterData({brands: marcas, categories: categorias})
  
                        setIsLoadingProducts(false);
                        return
                      } 
                
                      alert("Ha ocurrido un error en la carga de los productos")
                
                    }
                
                    fetchAllProducts();
                    return 
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
                onCloseNew();
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
                        <Input {...field} size="sm" placeholder='Descripción' type="text" />
                        <FormErrorMessage fontSize="xs">{form.errors.descripcion}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='marca'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.marca && form.touched.marca} my="5px">
                        <FormLabel fontSize="xs" my="2px">Marca</FormLabel>
                        <Input {...field} size="sm" placeholder='Marca' type="text" />
                        <FormErrorMessage fontSize="xs">{form.errors.marca}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='categoria'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.categoria && form.touched.categoria} my="5px">
                        <FormLabel fontSize="xs" my="2px">Categoria</FormLabel>
                        <Input {...field} size="sm" placeholder='Categoria' type="text" />
                        <FormErrorMessage fontSize="xs">{form.errors.categoria}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='imagen'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.imagen && form.touched.imagen} my="5px">
                        <FormLabel fontSize="xs" my="2px">Imagen</FormLabel>
                        <Input {...field} size="sm" placeholder='Imagen' type="text" />
                        <FormErrorMessage fontSize="xs">{form.errors.imagen}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 130px", gap:"15px"}}>
                    <Field name='precio'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.precio && form.touched.precio} my="5px">
                          <FormLabel fontSize="xs" my="2px">Precio</FormLabel>
                          <Input {...field} size="sm" placeholder='Precio' type="number" />
                          <FormErrorMessage fontSize="xs">{form.errors.precio}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='descuento'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.descuento && form.touched.descuento} my="5px">
                          <FormLabel fontSize="xs" my="2px">Descuento</FormLabel>
                          <InputGroup>
                            <Input {...field} size="sm" placeholder='Descuento' type="number" />
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
                    <Button size='sm' colorScheme='giza' _hover={{bg:"giza.700"}} mr={3} isLoading={props.isSubmitting} type="submit">Guardar</Button>
                    <Button size='sm' variant='ghost' onClick={onCloseNew}>Cancelar</Button>
                  </ModalFooter>
                </Form>
              )
            }
            </Formik>
            
          
        </ModalContent>
      </Modal>
      <div style={{width: "100%", maxWidth: "900px", display:"grid",placeItems:"center"}}>
        <StyledProductsWrapper>
          {isLoadingProducts ? 
          <Stack alignItems="center" justifyContent="center" w="full" direction={['column', 'row']} spacing="24px">
            <Skeleton w="full" maxW="200" height='250px' />
            <Skeleton w="full" maxW="200" height='250px' />
            <Skeleton w="full" maxW="200" height='250px' />
          </Stack>
          : (products.items?.length > 0 ? 
              (user?.rol === ROLES.admin ? 
              products.items.map(product => {return(<ProductCard key={product._id} {...product} />)}) :
              products.items.filter(product => { return product.estado !== "Bloqueado"}).map(product => (<ProductCard key={product._id} {...product} />)  ) 
              )
            : (<Alert status='info'>
                <AlertIcon />
                No hay productos que cumplan el filtro solicitado!
              </Alert>))}
        </StyledProductsWrapper>
      </div>
    </StyledProductsContainer>
  )
}

export default Products