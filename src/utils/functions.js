export const formatPrice = (precio) => {
  return new Intl.NumberFormat("es-CL").format(precio)
}