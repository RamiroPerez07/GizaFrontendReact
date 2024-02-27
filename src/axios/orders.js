import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';

export const createOrder = async (order, currentUser) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders/`, {
      items: order.items, //un array que se pasa con id, descripcion, precio y cantidad
      detalleContacto : order.detalleContacto,
      monto: order.monto,
    },
    {
      headers: {
        "x-token" : currentUser.token,
      }
    })

    return response
  } catch (error) {
    return error
  }
};

export const getOrders = async (currentUser) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/`,
    {
      headers: {
        "x-token" : currentUser.token,
      }
    })

    return response
  } catch (error) {
    return error
  }
}