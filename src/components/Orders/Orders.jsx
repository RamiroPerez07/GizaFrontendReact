import React, { useState } from 'react'
import { Alert, AlertIcon, Heading, Skeleton, Stack, useToast } from '@chakra-ui/react'
import OrderCard from '../OrderCard/OrderCard.jsx'
import { StyledOrdersWrapper } from './Orders.js'
import { StyledProductsContainer } from '../Products/ProductsStyles.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getOrders } from '../../axios/orders.js'
import { errors } from '../../errors/index.js'


const Orders = () => {

  // const orders = [
  //   {
  //     id: 1,
  //     total: 12500,
  //     estado: "En preparación",
  //     fecha: "09/12/2023"
  //   },
  //   {
  //     id: 2,
  //     total: 7500,
  //     estado: "Para retirar",
  //     fecha: "07/12/2023"
  //   },
  //   {
  //     id: 3,
  //     total: 15500,
  //     estado: "Para retirar",
  //     fecha: "07/12/2023"
  //   },
  //   {
  //     id: 4,
  //     total: 25500,
  //     estado: "Para retirar",
  //     fecha: "07/12/2023"
  //   }
  // ]

  const toast = useToast()

  const currentUser = useSelector(state => state.user.user)

  const navigate = useNavigate()

  useEffect(()=>{
    if (!currentUser){
      navigate("/iniciar-sesion");
    }
  }, [currentUser, navigate])


  const [orders , setOrders] = useState({details:[]})

  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    
    const fetchOrders = async () => {
      setIsLoading(true); //se setea el estado en true para que aparezca el skeleton
      if (!currentUser) return
      const response = await getOrders(currentUser)

      setIsLoading(false)

      if (response.status === 200) {
        setOrders({details: response.data.data})
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
    }
    fetchOrders()
  },[currentUser, navigate, toast]) //array vacio para que se ejecute solo al comienzo (cuando se renderiza el componente)

  return (
    <StyledProductsContainer>
      <Heading as="h2" style={{fontWeight:"500", fontSize:"1.2rem", textAlign:"center", marginBottom:"10px"}}>Tus pedidos</Heading>
      <div style={{width: "100%", maxWidth: "900px", display:"grid",placeItems:"center"}}>
        <StyledOrdersWrapper>
          {isLoading &&
          <Stack direction={{base:"column",md:"row"}}>
            <Skeleton style={{minWidth:"230px", height:'164px'}} />
            <Skeleton style={{minWidth:"230px", height:'164px'}} />
            <Skeleton style={{minWidth:"230px", height:'164px'}} />
          </Stack>
          }
          {
            !isLoading &&
            orders.details.length === 0 ?
            (<Alert status='info'>
              <AlertIcon />
              Aun no realizaste ningun pedido!
            </Alert>) :
            orders.details.map(order => (<OrderCard key={order._id} {...order} />))
          }
        </StyledOrdersWrapper>
      </div>
    </StyledProductsContainer>
  )
}

export default Orders