import React from 'react'
import { Route,Routes as ReactDomRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../components/Products/Products';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VerifyUserPage from '../pages/VerifyUserPage';
import ConfirmOrderPage from '../pages/ConfirmOrderPage';
import OrdersPage from '../pages/OrdersPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import RestorePasswordPage from '../pages/RestorePasswordPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';

const Routes = () => {
  return (
    <ReactDomRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/confirmar-orden" element={<ConfirmOrderPage />} />
      <Route path="/iniciar-sesion" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/verificar-usuario" element={<VerifyUserPage />} />
      <Route path="/pedidos" element={<OrdersPage />} />
      <Route path="/olvide-mi-clave" element={<ForgotPasswordPage />} />
      <Route path="/restablecer-clave" element={<RestorePasswordPage />} />
      <Route path="/cambiar-clave" element={<ChangePasswordPage />} />
    </ReactDomRoutes>
  )
}

export default Routes