import React from 'react'
import { StyledHeroContainer } from './HeroStyles'
import { Box, Center, Image } from '@chakra-ui/react'
import { BRAND_IMAGES } from '../../utils/constants'
import Carousel from '../Carousel/Carousel.jsx'

const Hero = () => {

  return (
    <StyledHeroContainer>
        <Image src={BRAND_IMAGES.logoVerticalCompleto} alt='Logo Giza Completo' objectFit="contain" mb="20px" boxSize="3xs" m="auto" />

        <div style={{width:"100%", maxWidth:"100vw"}}>
          <Carousel />  

        </div>



        


    </StyledHeroContainer>
  )
}

export default Hero