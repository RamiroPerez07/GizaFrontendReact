import React, { useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@chakra-ui/react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { ProductFilterContext } from '../../contexts/productContext';
import { ROLES } from '../../utils/constants';

const Carousel = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 12000,
    pauseOnFocus: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          arrows: false,
        }
      }
    ]
  }

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
    fetchAllProducts(); //llamo en principio a todos los productos
  },[])

  const user = useSelector(state => state.user.user)

  return (
      <Slider {...settings}>
        {
          products.items?.length > 0 && 
            (user?.rol === ROLES.admin ? 
            products.items.slice(0,9).map(product => {
              return(
                    <ProductCard key={product._id} {...product} />
              )
            }) :
            products.items.slice(0,9).filter(product => { 
              return product.estado !== "Bloqueado"}).map(product => {
                return (
                    <ProductCard key={product._id} {...product} />
                )  
              } 
            )
            )
        }      
      </Slider>
  )
}

export default Carousel