import { createContext } from "react";
import { useState } from "react";
import { filterProducts, getProducts } from "../axios/products";

export const ProductFilterContext = createContext();

export const ProductFilterContextProvider = ({children}) => {
  const [products , setProducts] = useState({items: []})

  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  const [filterData, setFilterData] = useState({brands: [], categories: []})

  const initialStateFilter = {categoria: "", marca: "", precioEntre: [0,100000], descripcion: ""}
  const [filterParams, setFilterParams] = useState(initialStateFilter)

  const initialStateFilterActive = {categoria: false, marca: false, precioEntre: false, descripcion: false}
  const [filterActive, setFilterActive] = useState(initialStateFilterActive)

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
    if (values.precioEntre[0] !== 0 || values.precioEntre[1] !== 100000){
      optionChosen = {...optionChosen, precioEntre: true}
    }

    console.log(optionChosen)

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
      }}>{children}</ProductFilterContext.Provider>
  )
}