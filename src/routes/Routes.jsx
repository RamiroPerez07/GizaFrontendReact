import React from 'react'
import { Route,Routes as ReactDomRoutes } from 'react-router-dom';
import Hero from "../components/Hero/Hero.jsx"
import Products from "../components/Products/Products.jsx"
import ConfirmOrder from "../components/ConfirmOrder/ConfirmOrder.jsx"
import Login from "../components/Login/Login.jsx"
import Register from "../components/Register/Register.jsx"
import VerifyUser from "../components/VerifyUser/VerifyUser.jsx"
import Orders from "../components/Orders/Orders.jsx"
import ForgotPassword from "../components/ForgotPassword/ForgotPassword.jsx"
import RestorePassword from "../components/RestorePassword/RestorePassword.jsx"
import ChangePassword from "../components/ChangePassword/ChangePassword.jsx"
import  OrderDetail  from '../components/OrderDetail/OrderDetail.jsx';



const Routes = () => {
  return (
    <ReactDomRoutes>
      <Route path="/" element={<Hero />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/confirmar-orden" element={<ConfirmOrder />} />
      <Route path="/iniciar-sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/verificar-usuario" element={<VerifyUser />} />

      {/*pedidos*/}
      <Route path="/pedidos" element={<Orders />} />
      <Route path="/pedidos/:idPedido" element={<OrderDetail />} />
      <Route path="/olvide-mi-clave" element={<ForgotPassword />} />
      <Route path="/restablecer-clave" element={<RestorePassword />} />
      <Route path="/cambiar-clave" element={<ChangePassword />} />
    </ReactDomRoutes>
  )
}

export default Routes