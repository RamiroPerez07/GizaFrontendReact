import { CART_TYPES } from "../types/types";

export const addProductToCart = (product) => {
  return {
    type: CART_TYPES.ADD_PRODUCT_TO_CART, 
    payload: product,
  };
};

export const decreaseProductFromCart = (product) => {
  return {
    type: CART_TYPES.DECREASE_PRODUCT_FROM_CART,
    payload: product,
  };
};

export const removeProductFromCart = (product) => {
  return {
    type: CART_TYPES.REMOVE_PRODUCT_FROM_CART,
    payload: product,
  }
}

export const removeAllProductsFromCart = () => {
  return {
    type: CART_TYPES.REMOVE_ALL_PRODUCTS_FROM_CART,
  }
}