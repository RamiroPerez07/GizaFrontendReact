import React, { useEffect } from 'react'
import { StyledLoginContainer, StyledLoginFrame } from '../Login/Login.js'
import { Avatar, Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, Text, useToast, /*useToast*/ } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { restorePasswordSchema } from '../../validationSchemas'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getUserByTokenId, recoveryPassword } from '../../axios/users.js'
import { setCurrentUser } from '../../redux/actions/userActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { errors } from '../../errors/index.js'
import { BRAND_IMAGES } from '../../utils/constants.js'


const RestorePassword = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const user = useSelector(state => state.user.user)

  useEffect(() => {
    let token;
    if(user){
      dispatch(setCurrentUser(null))
      navigate("/olvide-mi-clave")
    }else{
      token = searchParams.get("token")
    }

    const findUserByTokenId = async () => {
      const response = await getUserByTokenId(token)
      if (response.status === 200){
        console.log("Respuesta exitosa", response.data.usuario)
        dispatch(setCurrentUser({...response.data.usuario,token: response.data.token}))
        searchParams.delete("token")
        setSearchParams(searchParams)
      }else{
        navigate("/olvide-mi-clave")
      }

    }

    findUserByTokenId();



  }, []) //solo cuando se monta el componente

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
              password: "",
              passwordConfirm: "" 
          }}
          validationSchema={restorePasswordSchema}
          onSubmit={ async (values, actions) => {
            const {password} = values

            const response = await recoveryPassword(password, user.token)
            

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
            if (response.data.msg === errors.CLAVE_IGUAL_A_ANTERIOR){
              
              toast({
                title: ``,
                description: `La contraseña no puede ser igual a la anterior`,
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
              <Button my="20px" colorScheme='giza' _hover={{bg:"giza.700"}} isLoading={props.isSubmitting} type='submit'>Aceptar</Button>
            </Form>
          )}
        </Formik>
      </StyledLoginFrame>
    </StyledLoginContainer>
  )
}

export default RestorePassword