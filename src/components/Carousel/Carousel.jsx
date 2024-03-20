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
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 12000,
    responsive: [
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
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
    <div className='slider-container' style={{width:"100%", maxWidth:"min(850px, 80vw)"}}>
      <Slider {...settings}>
        {
          products.items?.length > 0 && 
            (user?.rol === ROLES.admin ? 
            products.items.slice(0,9).map(product => {return(<ProductCard key={product._id} {...product} />)}) :
            products.items.slice(0,9).filter(product => { return product.estado !== "Bloqueado"}).map(product => (<ProductCard key={product._id} {...product} />)  ) 
            )
        }      
      </Slider>
    </div>
  )
}

export default Carousel