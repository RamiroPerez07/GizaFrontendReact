import React from 'react'
import { StyledLoginContainer, StyledLoginFrame } from '../Login/Login.js'
import {  Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, Text, useToast, /*useToast*/ } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { changePasswordSchema } from '../../validationSchemas'
import { useNavigate} from 'react-router-dom'
import { changePassword } from '../../axios/users.js'
import { useSelector } from 'react-redux'
import { errors } from '../../errors/index.js'
import { BRAND_IMAGES } from '../../utils/constants.js'


const ChangePassword = () => {

  const navigate = useNavigate();

  const user = useSelector(state => state.user.user)

  const toast = useToast()

  return (
    <StyledLoginContainer>
      <StyledLoginFrame>
      <Image src={BRAND_IMAGES.logoVertical} alt="Imagen de Giza" h="3rem" mt="10px"/>
        <Heading as="h2" my="15px" style={{fontSize:"1.2rem", fontWeight:"500"}}>Restablecer contraseña</Heading>
        {user && <Text my="5px" fontWeight="300" fontSize="0.9rem">{user.email}</Text>}
        <Divider />
        <Formik
          initialValues={{ 
              oldpassword: "",
              newpassword: "",
              newpasswordConfirm: "" 
          }}
          validationSchema={changePasswordSchema}
          onSubmit={ async (values, actions) => {
            const {oldpassword, newpassword} = values

            const response = await changePassword(oldpassword,newpassword, user.token)
            

            if (response.status === 200) {
              toast({
                    title: ``,
                    description: `La contraseña se cambió exitosamente`,
                    status: "success",
                    duration: "2500",
                    isClosable: true,
                  })
              navigate("/");
              actions.setSubmitting(false);
              actions.resetForm();
              return
            }
            console.log(response.data.msg)
            if (response.data.msg === errors.CLAVE_NO_COINCIDENTE){
              
              toast({
                title: ``,
                description: `La contraseña ingresada no coincide con la actual`,
                status: "error",
                duration: "2500",
                isClosable: true,
              })
              actions.resetForm();
              return
            }
            toast({
              title: ``,
              description: `Algo salió mal, no se ha podido cambiar tu clave`,
              status: "error",
              duration: "2500",
              isClosable: true,
            })


          }}
        >
          {(props) => (
            <Form style={{display:"flex", flexDirection:"column", width:"90%", maxWidth:"320px", alignItems:"center"}}>
              <Field name='oldpassword'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.oldpassword && form.touched.oldpassword} my="15px">
                    <FormLabel>Contraseña Actual</FormLabel>
                    <Input {...field} placeholder='Contraseña Actual' type="password" />
                    <FormErrorMessage>{form.errors.oldpassword}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='newpassword'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.newpassword && form.touched.newpassword} my="15px">
                    <FormLabel>Contraseña Nueva</FormLabel>
                    <Input {...field} placeholder='Contraseña Nueva' type="password" />
                    <FormErrorMessage>{form.errors.newpassword}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='newpasswordConfirm'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.newpasswordConfirm && form.touched.newpasswordConfirm} my="15px">
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <Input {...field} placeholder='Confirmar contraseña' type="password" />
                    <FormErrorMessage>{form.errors.newpasswordConfirm}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button my="20px" colorScheme='giza' _hover={{bg:"giza.700"}} isLoading={props.isSubmitting} type='submit'>Aceptar</Button>
            </Form>
          )}
        </Formik>
      </StyledLoginFrame>
    </StyledLoginContainer>
  )
}

export default ChangePassword