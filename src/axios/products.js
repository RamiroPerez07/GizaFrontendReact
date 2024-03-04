import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';

export const createProduct = async (product, currentUser) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/`, {
      descripcion: product.descripcion,
      marca: product.marca,
      categoria: product.categoria,
      precio: product.precio,
      imagen: product.imagen,
      descuento: product.descuento,
      estado: product.estado,
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

export const editProduct = async (product, currentUser) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/edit-product`, {
      _id: product._id,
      descripcion: product.descripcion,
      marca: product.marca,
      categoria: product.categoria,
      precio: product.precio,
      imagen: product.imagen,
      descuento: product.descuento,
      estado: product.estado,
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
}


export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/`)
    return response
  } catch (error) {
    return error
  }
}

export const filterProducts = async (parameters) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/filter-products`,{
      marca: parameters.marca,
      categoria: parameters.categoria,
      precioEntre: parameters.precioEntre,
      descripcion: parameters.descripcion,
    });
    return response;
  } catch (error) {
    return error
  }
}