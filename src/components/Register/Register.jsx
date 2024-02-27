import React from 'react'
import { StyledLoginContainer, StyledLoginFrame } from '../Login/Login'
import { Avatar, Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { registerSchema } from '../../validationSchemas'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../axios/users'
import { errors } from '../../errors'

const Register = () => {

  const navigate = useNavigate();

  const toast = useToast()

  return (
    <StyledLoginContainer>
      <StyledLoginFrame>
      <Avatar src='https://res.cloudinary.com/dhnicvwkw/image/upload/v1673367275/Perfarm/bg_abstract_nkcbrw.png' name="Imagen de Giza" size="md" mt="10px"/>
        <Heading as="h2" my="15px" style={{fontSize:"1.2rem", fontWeight:"500"}}>Registro</Heading>
        <Divider />
        <Formik
          initialValues={{ 
              usuarioNombre: "",
              email: "", 
              password: "",
              passwordConfirm: "" 
          }}
          validationSchema={registerSchema}
          onSubmit={ async (values, actions) => {
            const {usuarioNombre,email,password} = values

            const response = await createUser(usuarioNombre,email,password)
            
            console.log(response)

            if (response.status === 201) {
              navigate("/verificar-usuario", {state: {email:email}});
            }

            if (response.data.msg === errors.USUARIO_EXISTENTE_NO_VERIFICADO){
              toast({
                title: ``,
                description: `El mail ${response.data.usuario.email} ya se encuentra registrado. Se envío nuevamente el código de verificación`,
                status: "info",
                duration: "2500",
                isClosable: true,
              })
              navigate("/verificar-usuario", {state: {email:email}});
            }

            if (response.data.msg === errors.USUARIO_EXISTENTE_VERIFICADO){
              toast({
                title: ``,
                description: `El mail ${response.data.usuario.email} ya se encuentra registrado.`,
                status: "info",
                duration: "2500",
                isClosable: true,
              })
              navigate("/iniciar-sesion");
            }
            
            
            actions.setSubmitting(false);
            actions.resetForm();
            
          }}
        >
          {(props) => (
            <Form style={{display:"flex", flexDirection:"column", width:"90%", maxWidth:"320px", alignItems:"center"}}>
              <Field name='usuarioNombre'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.usuarioNombre && form.touched.usuarioNombre} my="15px">
                    <FormLabel>Nombre de usuario</FormLabel>
                    <Input {...field} placeholder='Nombre de usuario' />
                    <FormErrorMessage>{form.errors.usuarioNombre}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
              <Field name='passwordConfirm'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.passwordConfirm && form.touched.passwordConfirm} my="15px">
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <Input {...field} placeholder='Confirmar contraseña' type="password" />
                    <FormErrorMessage>{form.errors.passwordConfirm}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button my="20px" colorScheme='teal' isLoading={props.isSubmitting} type='submit'>Ingresar</Button>
              <div style={{marginBottom:"15px"}}>
                <p>¿Ya tienes una cuenta? <Link to={"/iniciar-sesion"} style={{fontWeight:"700"}}>Iniciar</Link></p>
              </div>
            </Form>
          )}
        </Formik>
      </StyledLoginFrame>
    </StyledLoginContainer>
  )
}

export default Register