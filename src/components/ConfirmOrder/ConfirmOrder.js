import styled from "styled-components"
export const StyledConfirmWrapper = styled.div`
  display:flex;
  flex-direction:row;
  width:100%; 
  padding:10px;
  justify-content:center;
  align-items: start;
  margin-bottom: 15px;

  @media (max-width: 950px){
    flex-direction: column-reverse;
    align-items: center;
  } 
`