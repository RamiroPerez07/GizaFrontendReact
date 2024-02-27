export const addProductToCart = (product, cartProducts) => {
  const existingProduct = cartProducts.find(cartProduct => cartProduct.id === product.id)
  if (existingProduct){
    return cartProducts.map(cartProduct => cartProduct.id === existingProduct.id ? {...cartProduct, quantity: cartProduct.quantity + 1} : cartProduct)
  }
  return [...cartProducts, {...product, quantity: 1}]
};

export const decreaseProductFromCart = (product, cartProducts) => {
  if (product.quantity === 1) {
    return removeProductFromCart(product, cartProducts);
  } else {
    return cartProducts.map(cartProduct => {
      return (cartProduct.id === product.id) ? 
      {...cartProduct, quantity: cartProduct.quantity - 1} :
      cartProduct;
    })
  }
};

export const removeProductFromCart = (product,cartProducts) => {
  return cartProducts.filter(cartProduct => cartProduct.id !== product.id)
}

export const removeAllProductsFromCart = () => {
  return [];
}