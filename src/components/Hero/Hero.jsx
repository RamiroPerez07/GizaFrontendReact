import React from 'react'
import { StyledHeroContainer } from './HeroStyles'
import { Box, Image } from '@chakra-ui/react'

const Hero = () => {

  const titleStyle = {
    fontSize: "2.4rem",
    textAlign: "center",
    fontWeight: "600",
    color: "#0f0f0f",
    marginBottom: "15px"
  }

  const textStyle = {
    fontSize: "0.9rem",
    color: "#5c5b5b",
  }

  return (
    <StyledHeroContainer>
      <Box boxSize='3xs' mt="15px">
        <Image src='https://res.cloudinary.com/dhnicvwkw/image/upload/v1709693837/logo_Giza_Completo_nlkgrr.png' alt='Logo Giza Completo' objectFit="contain" />
      </Box>
    </StyledHeroContainer>
  )
}

export default Hero