import React from 'react'
import { StyledLoginContainer, StyledLoginFrame } from './Login'
import { Divider, Heading, Button, FormControl, FormLabel, Input, FormErrorMessage, useToast, Text, Image } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { loginSchema } from '../../validationSchemas'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../axios/users'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/actions/userActions'
import { removeAllProductsFromCart } from '../../redux/actions/cartActions'
import { BRAND_IMAGES } from '../../utils/constants'

const Login = () => {

  const navigate = useNavigate()

  const toast = useToast()

  const dispatch = useDispatch()

  return (
    <StyledLoginContainer>
      <StyledLoginFrame>
        <Image src={BRAND_IMAGES.logoVertical} alt="Imagen de Giza" h="3rem" mt="10px"/>
        <Heading as="h2" my="15px" style={{fontSize:"1.2rem", fontWeight:"500"}}>Iniciar Sesión</Heading>
        <Divider borderColor="giza.50" />
        <Formik
          initialValues={{ 
              email: "", 
              password: "" 
          }}
          validationSchema={loginSchema}
          onSubmit={async (values, actions) => {
            const {email, password} = values

            const response = await loginUser(String(email).toLowerCase(), password);

            if (response.status === 202){
              dispatch(setCurrentUser({...response.data.usuario,token: response.data.token}));
              dispatch(removeAllProductsFromCart())
              navigate("/");
              toast({
                title: ``,
                description: `Bienvenido ${response.data.usuario.usuarioNombre}`,
                status: "success",
                duration: "2500",
                isClosable: true,
              })
            }

            if (response.status === 404) {
              toast({
                title: ``,
                description: `El usuario no existe: verifique el mail ingresado`,
                status: "error",
                duration: "2500",
                isClosable: true,
              })
            }

            if (response.status === 401) {
              toast({
                title: ``,
                description: `La contraseña ingresada es incorrecta`,
                status: "error",
                duration: "2500",
                isClosable: true,
              })
            }


            actions.setSubmitting(false)
            actions.resetForm();
          }}
        >
          {(props) => (
            <Form style={{display:"flex", flexDirection:"column", width:"90%", maxWidth:"320px", alignItems:"center"}}>
              <Field name='email'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email} my="15px">
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder='Email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='password'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password} my="15px">
                    <FormLabel>Contraseña</FormLabel>
                    <Input {...field} placeholder='Contraseña' type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button my="20px" colorScheme='giza' _hover={{bg:"giza.700"}} isLoading={props.isSubmitting} type='submit'>Ingresar</Button>
              <div style={{marginBottom:"15px", display: "grid", placeItems:"center"}}>
                <Link to={"/olvide-mi-clave"} style={{margin:"8px auto", fontSize:"0.8rem"}}>Olvidé mi contraseña</Link>
                <Text fontSize="0.9rem">¿Aun no tienes una cuenta? <Link to={"/registro"} style={{fontWeight:"700"}}>Registrate</Link></Text>
              </div>
            </Form>
          )}
        </Formik>
      </StyledLoginFrame>
    </StyledLoginContainer>
  )
}

export default Login