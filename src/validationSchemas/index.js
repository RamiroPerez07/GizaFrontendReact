import * as Yup from 'yup';

export const loginSchema = Yup.object().shape(
  {
    email: Yup.string().email("Debes ingresar un mail válido").required("El mail es requerido"),
    password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[0-9]/, 'La contraseña requiere un número')
    .matches(/[a-z]/, 'La contraseña requiere al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña requiere al menos una letra mayúscula')
  }
)

export const registerSchema = Yup.object().shape(
  {
    usuarioNombre: Yup.string().required("El nombre de usuario es requerido").min(6, "El nombre de usuario debe ser de 6 caracteres como mínimo"),
    email: Yup.string().email("Debes ingresar un mail válido").required("El mail es requerido"),
    password: Yup.string().required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[0-9]/, 'La contraseña requiere un número')
    .matches(/[a-z]/, 'La contraseña requiere al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña requiere al menos una letra mayúscula'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required("Debes confirmar la contraseña")
  }
)

export const verifyUserSchema = Yup.object().shape(
  {
    code: Yup.string().required("El código de verificación es requerido").matches(/^[A-Za-z0-9]{6}$/,"El código debe contener 6 caracteres")
  }
)

export const confirmOrderSchema = Yup.object().shape(
  {
    contacto: Yup.string().required("El nombre de contacto es requerido"),
    documento: Yup.string().required("El documento es requerido").matches(/^[0-9]{7,8}$/, 'Ingresá un DNI válido'),
    telefono: Yup.string().required("El teléfono o celular es requerido").matches(/^[0-9]{7,15}$/, 'Ingresá un número válido'), 
  }
)

export const forgotPasswordSchema = Yup.object().shape(
  {
    email: Yup.string().email("Debes ingresar un mail válido").required("El mail es requerido"),
  }
)

export const restorePasswordSchema = Yup.object().shape(
  {
    password: Yup.string().required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[0-9]/, 'La contraseña requiere un número')
    .matches(/[a-z]/, 'La contraseña requiere al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña requiere al menos una letra mayúscula'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required("Debes confirmar la contraseña")
  }
)

export const changePasswordSchema = Yup.object().shape(
  {
    oldpassword: Yup.string().required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[0-9]/, 'La contraseña requiere un número')
    .matches(/[a-z]/, 'La contraseña requiere al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña requiere al menos una letra mayúscula'),
    newpassword: Yup.string().notOneOf([Yup.ref('oldpassword'), null], 'La contraseña no puede ser igual a la anterior').required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[0-9]/, 'La contraseña requiere un número')
    .matches(/[a-z]/, 'La contraseña requiere al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña requiere al menos una letra mayúscula'),
    newpasswordConfirm: Yup.string().oneOf([Yup.ref('newpassword'), null], 'Las contraseñas no coinciden').required("Debes confirmar la contraseña")
  }
)

export const filterProductsSchema = Yup.object().shape(
  {
    categoria: Yup.string(),
    marca: Yup.string(),
    precioEntre: Yup.array().of(Yup.number()),
  }
)

export const newProductSchema = Yup.object().shape(
  {
    descripcion: Yup.string().required("La descripción es requerida"),
    marca: Yup.string().required("La marca es requerida"),
    categoria: Yup.string().required("La categoria es requerida"),
    precio: Yup.number().required("El precio es requerido"),
    imagen: Yup.string(),
    descuento: Yup.number(),
    estado: Yup.string(),
  }
) 

export const editProductSchema = Yup.object().shape(
  {
    descripcion: Yup.string().required("La descripción es requerida"),
    marca: Yup.string().required("La marca es requerida"),
    categoria: Yup.string().required("La categoria es requerida"),
    precio: Yup.number().required("El precio es requerido"),
    imagen: Yup.string(),
    descuento: Yup.number(),
    estado: Yup.string(),
  }
) 