import { Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { formatPrice } from '../../utils/functions'

const OrderCard = (props) => {

  const {_id,monto,createdAt,estado} = props

  return (
    <div style={{width:"90%", maxWidth:"230px",padding:"15px",display:"flex",flexDirection:"column", alignItems:"center", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",borderRadius: "0.375rem"}}>
      <Heading as="h3" my="5px" style={{textAlign:"center", fontSize:"0.9rem", fontWeight:"500"}} >Pedido #{String(_id).slice(2,7)}</Heading>
      <div style={{margin:"5px 0px", width:"90%"}}>
        <Text my="2px" fontSize="0.9rem">{createdAt}</Text>
        <Text fontSize="0.9rem">{`Total: $ ${formatPrice(monto)}`}</Text>
        <Text my="2px" fontSize="0.9rem">{estado}</Text>
      </div>
      <Button colorScheme='teal' size="xs">Ver</Button>
    </div>  
  )
}

export default OrderCard