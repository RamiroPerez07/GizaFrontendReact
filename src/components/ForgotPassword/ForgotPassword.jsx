import React from 'react'
import { StyledLoginContainer, StyledLoginFrame } from '../Login/Login.js'
import { Divider, Heading, Button, FormControl, FormLabel, Input, FormErrorMessage, Avatar, useToast, Text, Stack } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { forgotPasswordSchema } from '../../validationSchemas'
import { forgotPassword } from '../../axios/users'


const ForgotPassword = () => {

  const toast = useToast()

  return (
    <StyledLoginContainer>
      <StyledLoginFrame>
        <Avatar src='https://res.cloudinary.com/dhnicvwkw/image/upload/v1673367275/Perfarm/bg_abstract_nkcbrw.png' name="Imagen de Giza" size="md" mt="10px"/>
        <Heading as="h2" my="15px" style={{fontSize:"1.2rem", fontWeight:"500"}}>Recuperar Clave</Heading>
        <Stack my="5px" p="5px">
          <Text fontSize="0.8rem" textAlign="center">Te enviaremos un correo al siguiente mail para recuperar tu contraseña. Por favor, revisá la casilla "No deseados".</Text>
        </Stack>
        <Divider />
        <Formik
          initialValues={{ 
              email: "", 
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={async (values, actions) => {
            const {email} = values

            const response = await forgotPassword(email);

            if (response.status === 200){

              toast({
                title: ``,
                description: `Se envió el correo de recuperación a ${email}`,
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

            if (response.status === 400) {
              toast({
                title: ``,
                description: `El usuario aun no se encuentra verificado`,
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
              <Button my="20px" colorScheme='teal' isLoading={props.isSubmitting} type='submit'>Enviar</Button>
            </Form>
          )}
        </Formik>
      </StyledLoginFrame>
    </StyledLoginContainer>
  )
}

export default ForgotPassword