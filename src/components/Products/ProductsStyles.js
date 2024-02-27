import styled from "styled-components";

export const StyledProductsContainer = styled.div`
  margin-top: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledProductsWrapper = styled.div`
  width: 100%;
  /*max-width:900px;*/
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(230px, 1fr));
  justify-items:center;
  align-items: center; 
  padding: 15px;
  gap: 20px;
`