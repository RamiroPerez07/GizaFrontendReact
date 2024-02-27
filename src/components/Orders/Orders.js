import styled from "styled-components"

export const StyledOrdersWrapper = styled.div`
  width: 100%;
  /*max-width:900px;*/
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(230px, 1fr));
  justify-items:center;
  align-items: center; 
  padding: 15px;
  gap: 20px;
`