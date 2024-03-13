import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, List, ListIcon, ListItem, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react';
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

  const toast = useToast();

  useEffect(() => {
    const fetchOrderByID = async () => {
      console.log("ingreso aca")
      try {
        const response = await findOrderByID(idPedido, currentUser);
  
        if (response.status === 200){
          setOrderData(response.data.order);
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
      <StyledProductsContainer>
        <Heading as="h2" style={{fontWeight:"500", fontSize:"1.2rem", textAlign:"center", marginBottom:"15px"}}>Pedido #{String(orderData._id).slice(2,7)}</Heading> 

        <Accordion w="full" maxW="min(95%,900px)"  defaultIndex={[0]} allowMultiple>
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
              <TableContainer>
                <Table size='sm'>
                  <Thead>
                    <Tr>
                      <Th>Descripcion</Th>
                      <Th >Pu</Th>
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
                            <Td>{`${formatPrice(item.precio)} - (${Number(item.descuento*100).toFixed(2)+"%"})`}</Td>
                            <Td isNumeric>{item.cantidad}</Td>
                            <Td isNumeric>{formatPrice(Number(item.cantidad * item.precio * (1-item.descuento)).toFixed(2))}</Td>
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
                          {formatPrice(orderData.monto)}
                        </Box>
                      </Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

      </StyledProductsContainer>   
    </>
  )
}

export default OrderDetail
