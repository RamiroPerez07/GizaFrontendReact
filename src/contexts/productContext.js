import { createContext } from "react";
import { useState } from "react";
import { filterProducts, getProducts } from "../axios/products";
import { useToast } from "@chakra-ui/react";

export const ProductFilterContext = createContext();

export const ProductFilterContextProvider = ({children}) => {
  const [products , setProducts] = useState({items: []})

  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  const [isLoadingFilterData, setIsLoadingFilterData] = useState(false)

  const [filterData, setFilterData] = useState({brands: [], categories: []})

  const toast = useToast()

  const initialStateFilter = {categoria: "", marca: "", precioEntre: [0,250000], descripcion: ""}
  const [filterParams, setFilterParams] = useState(initialStateFilter)

  const initialStateFilterActive = {categoria: false, marca: false, precioEntre: false, descripcion: false}
  const [filterActive, setFilterActive] = useState(initialStateFilterActive)

  const updateFilterData = async () => {
      setIsLoadingFilterData(true);

      //actualizo filtros = Marcas y categorias

      const response = await getProducts();
      
      if (response.status === 200) {
        
        // en esta etapa actualizo los filtros, porque puede ser que se agregue una marca no existente
        const marcas = response.data.data?.map(p=> p.marca).filter((brand, index, arr) => {
          return arr.indexOf(brand) === index;
        })
        const categorias = response.data.data?.map(p=> p.categoria).filter((category, index, arr) => {
          return arr.indexOf(category) === index;
        })
        setFilterData({brands: marcas, categories: categorias})
        setIsLoadingFilterData(false);
        
      } else{
          toast({
            title: ``,
            description: `Ocurrió un error en la carga de los filtros`,
            status: "error",
            duration: "2500",
            isClosable: true,
          })
      }
  }

  const fetchAllProducts = async () => {
    setIsLoadingProducts(true);
      const response = await getProducts();

      if (response.status === 200) {
        setProducts({items: response.data.data})
        setIsLoadingProducts(false);
        setFilterParams(initialStateFilter);
        setFilterActive(initialStateFilterActive);
        return;
      }
      alert("Ha ocurrido un error en la carga de los productos")
  }

  const filterProductsByParams = async (values) => {
    const filter = async () => {
      setIsLoadingProducts(true);
      const response = await filterProducts({...values});

      if (response.status === 200) {
        setProducts({items: response.data.data})
        setIsLoadingProducts(false);
        return
      } 

      alert("Ha ocurrido un error en la carga de los productos")
    }

    filter()
    
    let optionChosen = {}

    if (values.descripcion !== ""){
      optionChosen = {...optionChosen, descripcion: true}
    } 
    if (values.categoria !== ""){
      optionChosen = {...optionChosen, categoria: true}
    } 
    if (values.marca !== "") {
      optionChosen = {...optionChosen, marca: true}
    }
    if (values.precioEntre[0] !== 0 || values.precioEntre[1] !== 250000){
      optionChosen = {...optionChosen, precioEntre: true}
    }

    setFilterParams(values);
    setFilterActive({...initialStateFilterActive, ...optionChosen})

  }

  return (
    <ProductFilterContext.Provider value={
      {
        products, 
        setProducts, 
        isLoadingProducts, 
        setIsLoadingProducts, 
        filterData, 
        setFilterData, 
        filterParams,
        filterActive,
        setFilterActive,
        setFilterParams,
        fetchAllProducts,
        filterProductsByParams,
        updateFilterData,
        isLoadingFilterData,
      }}>{children}</ProductFilterContext.Provider>
  )
}