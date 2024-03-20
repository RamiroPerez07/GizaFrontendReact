import React from 'react'
import { StyledHeroContainer } from './HeroStyles'
import { Box, Image } from '@chakra-ui/react'
import { BRAND_IMAGES } from '../../utils/constants'
import Carousel from '../Carousel/Carousel.jsx'

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

  const frameStyle = {
    marginTop: "25px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  return (
    <StyledHeroContainer>
      <Box style={frameStyle}>
        <Image src={BRAND_IMAGES.logoVerticalCompleto} alt='Logo Giza Completo' objectFit="contain" mb="20px" boxSize="3xs"/>
        <Carousel />
      </Box>
    </StyledHeroContainer>
  )
}

export default Hero