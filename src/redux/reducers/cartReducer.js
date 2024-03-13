import { CART_TYPES } from "../types/types";
import { addProductToCart, decreaseProductFromCart, removeAllProductsFromCart, removeProductFromCart } from "../utils/cartUtils.js";



const initial_state = {
  productsCart : [],
}

export const cartReducer = (state=initial_state,action) => {
  switch(action.type){
    case CART_TYPES.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        productsCart: addProductToCart(action.payload, state.productsCart) ,
      }
    case CART_TYPES.DECREASE_PRODUCT_FROM_CART:
      return {
        ...state,
        productsCart: decreaseProductFromCart(action.payload, state.productsCart)
      }
    case CART_TYPES.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        productsCart: removeProductFromCart(action.payload, state.productsCart),
      }
    case CART_TYPES.REMOVE_ALL_PRODUCTS_FROM_CART:
      return {
        ...state,
        productsCart: removeAllProductsFromCart(),
      }
    default:
      return state;
  }
}