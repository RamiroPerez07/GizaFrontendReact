import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Heading, Image, List, ListIcon, ListItem, Skeleton, Stack, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { findOrderByID } from '../../axios/orders';
import { useSelector } from 'react-redux';
import { StyledProductsContainer } from '../Products/ProductsStyles';
import { errors } from '../../errors';
import { AiFillContacts } from "react-icons/ai";
import { HiIdentification } from "react-icons/hi2";
import { MdContactPhone } from "react-icons/md";
import { formatPrice } from '../../utils/functions';


const OrderDetail = () => {

  const {idPedido} = useParams()

  const [isLoading, setIsLoading] = useState(false);

  const [orderData, setOrderData] = useState({})

  const currentUser = useSelector(state => state.user.user)

  const [isLargerThan750] = useMediaQuery('(min-width: 750px)')

  const toast = useToast();

  useEffect(() => {
    const fetchOrderByID = async () => {
      
      try {
        setIsLoading(true)
        const response = await findOrderByID(idPedido, currentUser);
  
        if (response.status === 200){
          setOrderData(response.data.order);
          setIsLoading(false)
          return
        }
  
        if (response.response.data.msg === errors.NO_ENCONTRADO){
          toast({
            title: ``,
            description: `Producto no encontrado`,
            status: "error",
            duration: "2500",
            isClosable: true,
          })
          return
        }

      } catch (error){
        console.log(error)
        toast({
          title: ``,
          description: `Ocurrió un error`,
          status: "error",
          duration: "2500",
          isClosable: true,
        })

      }
    }
    
    fetchOrderByID()


  }
    ,[])

  return (
    <>
      <StyledProductsContainer >
        { 
          isLoading ?
          <Stack w="full" alignItems="center" justifyContent="center">

            <Skeleton w="full" maxW="min(95%,100px)" height='40px' />
            <Skeleton w="full" maxW="min(95%,900px)" height='40px' />
            <Skeleton w="full" maxW="min(95%,900px)" height='40px' />
            <Skeleton w="full" maxW="min(95%,900px)" height='40px' />
          </Stack>:
          <>
            <Heading as="h2" style={{fontWeight:"500", fontSize:"1.2rem", textAlign:"center", marginBottom:"15px"}}>Pedido #{String(orderData._id).slice(2,7)}</Heading> 

            <Accordion w="full" maxW="min(95%,900px)" p="10px" m="5px" defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>Detalle de contacto</Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={AiFillContacts} color='giza.500' />
                      {`Contacto: ${orderData.detalleContacto?.contacto}`}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdContactPhone} color='giza.500' />
                      {`Teléfono: ${orderData.detalleContacto?.telefono}`}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={HiIdentification} color='giza.500' />
                      {`Documento: ${orderData.detalleContacto?.documento}`}
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>Productos</Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {
                    isLargerThan750 ?
                      <TableContainer>
                        <Table size='sm'>
                          <Thead>
                            <Tr>
                              <Th>Descripcion</Th>
                              <Th isNumeric>Pu</Th>
                              <Th isNumeric>Cantidad</Th>
                              <Th isNumeric>Subtotal</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {
                              orderData.items?.map(item =>{
                                return (
                                  <Tr key={item._id}>
                                    <Td>{`${item.descripcion} - ${item.marca}`}</Td>
                                    <Td isNumeric>{`$ ${formatPrice(item.precio)} - (${Number(item.descuento).toFixed(2)+"%"})`}</Td>
                                    <Td isNumeric>{item.cantidad}</Td>
                                    <Td isNumeric>{"$ " + formatPrice(Number(item.cantidad * item.precio * (1-item.descuento/100)).toFixed(2))}</Td>
                                  </Tr>
                                )
                              })
                            }
                          </Tbody>
                          <Tfoot >
                            <Tr py="35px">
                              <Th>
                                <Box mt="10px">
                                  Total
                                </Box>
                              </Th>
                              <Th></Th>
                              <Th isNumeric></Th>
                              <Th isNumeric>
                                <Box mt="10px">
                                  {"$ "+formatPrice(orderData.monto)}
                                </Box>
                              </Th>
                            </Tr>
                          </Tfoot>
                        </Table>
                      </TableContainer>
                      :
                      orderData.items?.map(item => {
                        return (
                          <div style={{padding:"2px 5px",marginBottom:"10px",width:"100%",minHeight:"60px",display:"grid",alignItems:"center",gridTemplateColumns:"auto 1fr 20px",gap:"10px",boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",borderRadius: "0.375rem"}}>
                            <Image boxSize="45px" src= {item.imagen} alt="Imagen del producto" objectFit="contain" />
                            <div>
                              <Text fontSize='xs' style={{marginLeft:"5px"}}>{item.descripcion}</Text>
                              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0px 5px"}}>
                                {
                                  (item.descuento > 0) ?
                                  <div style={{display:"flex"}}>
                                    <Text fontSize='xs' mr="5px"  style={{textDecoration: "line-through", textDecorationColor: "#a79d9d"}}>{"Precio/u: $"+formatPrice(item.precio)}</Text> 
                                    <Text color="giza.700" fontSize='xs' fontWeight="500">{`Precio/u: $${formatPrice(Number(item.precio*(1-item.descuento/100)).toFixed(2))}`}</Text> 
                                  </div>  
                                  :
                                  <Text color="giza.700" fontSize='xs' fontWeight="500">{"Precio/u: $"+formatPrice(item.precio)}</Text>
                                }
                              </div>
                              <div style={{display:"flex", alignItems:"center"}}>
                                <Text fontSize='xs' ml="5px">Cantidad: {item.cantidad}</Text>
                              </div>
                              <Divider my="3px" />
                              <div style={{display:"flex", alignItems:"center"}}>
                                <Text fontSize='xs' mb="3px" ml="5px">Subtotal: {"$ " + formatPrice(Number(item.cantidad * item.precio * (1-item.descuento/100)).toFixed(2))}</Text>
                              </div>
                            </div>
                        </div>
                        )
                      })
                      

                  }
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </>
        }

      </StyledProductsContainer>   
    </>
  )
}

export default OrderDetail
