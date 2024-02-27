import React, { useEffect } from 'react'
import { StyledLoginContainer, StyledLoginFrame } from '../Login/Login'
import { Avatar, Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { verifyUserSchema } from '../../validationSchemas'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { verifyUser } from '../../axios/users'

const VerifyUser = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const toast = useToast()

  useEffect(() => {
    if ( ! location.state){
      navigate("/registro")
    }
  }, [location.state, navigate])

  return (
    <StyledLoginContainer>
      <StyledLoginFrame>
      <Avatar src='https://res.cloudinary.com/dhnicvwkw/image/upload/v1673367275/Perfarm/bg_abstract_nkcbrw.png' name="Imagen de Giza" size="md" mt="10px"/>
        <Heading as="h2" my="15px" style={{fontSize:"1.2rem", fontWeight:"500"}}>Verificación de usuario</Heading>
        <Divider />
        <Formik
          initialValues={{ 
              code: ""
          }}
          validationSchema={verifyUserSchema}
          onSubmit={ async (values, actions) => {
            const {code} = values
            const email = location.state.email
            const response = await verifyUser(email,code);

            if (response.status === 200) {

              toast({
                title: ``,
                description: `Usuario verificado exitosamente`,
                status: "success",
                duration: "2500",
                isClosable: true,
              })

              navigate("/iniciar-sesion");
            }

            if (response.status === 404){
              toast({
                title: ``,
                description: `El mail ingresado no existe`,
                status: "error",
                duration: "2500",
                isClosable: true,
              })

              navigate("/registro");
            }

            if (response.status === 400){
              toast({
                title: ``,
                description: `El usuario ya se encuentra verificado`,
                status: "error",
                duration: "2500",
                isClosable: true,
              })

              navigate("/iniciar-sesion");
            }

            if (response.status === 401){
              toast({
                title: ``,
                description: `El código ingresado no es correcto`,
                status: "error",
                duration: "2500",
                isClosable: true,
              })
            }


            actions.setSubmitting(false);
            actions.resetForm();

          }}
        >
          {(props) => (
            <Form style={{display:"flex", flexDirection:"column", width:"90%", maxWidth:"320px", alignItems:"center"}}>
              <Field name='code'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.code && form.touched.code} my="15px">
                    <FormLabel>Código de verificación</FormLabel>
                    <Input {...field} placeholder='Código de verificación' />
                    <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button my="20px" colorScheme='teal' isLoading={props.isSubmitting} type='submit'>Verificar</Button>
              <div style={{marginBottom:"15px"}}>
                <p>¿Aun no recibiste el código de verificación? <Link to={"/iniciar-sesion"} style={{fontWeight:"700"}}>Enviar un código nuevo</Link></p>
              </div>
            </Form>
          )}
        </Formik>
      </StyledLoginFrame>
    </StyledLoginContainer>
  )
}

export default VerifyUser