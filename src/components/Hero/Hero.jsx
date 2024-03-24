import React, { useContext, useEffect, useState } from 'react'
import { StyledCategoryCard, StyledHeroContainer } from './HeroStyles'
import { Box, Button, Heading, Image } from '@chakra-ui/react'
import { BRAND_IMAGES } from '../../utils/constants'
import Carousel from '../Carousel/Carousel.jsx'
import { useNavigate } from 'react-router-dom'
import { ProductFilterContext } from '../../contexts/productContext.js'

const Hero = () => {

  const navigate = useNavigate();

  const productFilterData = useContext(ProductFilterContext);
  const { products, 
    setProducts, 
    isLoadingProducts, 
    setIsLoadingProducts, 
    filterData, 
    setFilterData, 
    filterParams,
    filterActive,
    updateFilterData,
    isLoadingFilterData,
    setFilterParams,
    fetchAllProducts,
    filterProductsByParams,
  } = productFilterData;

  useEffect(()=>{
    updateFilterData();
  },[])

  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <StyledHeroContainer>
    
        <Image src={BRAND_IMAGES.logoVerticalCompleto} alt='Logo Giza Completo' objectFit="contain" mb="20px" boxSize="3xs" m="15px auto 30px" />
        <Box w="full" py="15px" style={{display:"grid", placeItems:"center"}}>
          <Button colorScheme='giza'  _hover={{bg:"#0087BF"}} m="0 auto" onClick={() => {navigate("/productos")}}>Nuestros productos</Button>
        </Box>
        <Heading as="h2" size="md" m="30px auto 15px" textAlign="center">Destacados</Heading>
        <Carousel />
        <Heading as="h2" size="md" m="30px auto 15px" textAlign="center">Descuentos</Heading>
        <Carousel />
        <Heading as="h2" size="md" m="30px auto 15px" textAlign="center">Categorias</Heading>
        <Box w="full" maxW="800px" style={{margin:"0 auto", padding:"0px 15px 15px",display:"grid", gap:"20px",gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))"}}>
          {
            filterData.categories.map((category, index) => {
              return (
                <StyledCategoryCard key={index} onClick={()=>{setActiveCategory(category)}} className={activeCategory==category?"active-category":""}>{category}</StyledCategoryCard>
              )              
            })
          }
        </Box>
     





        


    </StyledHeroContainer>
  )
}

export default Hero