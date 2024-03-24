import styled from "styled-components";

export const StyledHeroContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  max-width: 1200px;
  display: block;
`

export const StyledCategoryCard = styled.div`
  padding:2px;
  width: 95%;
  font-weight:500;
  font-size:0.8rem;
  text-align:center;
  cursor:pointer;
  min-height:50px;
  border-radius:5px;
  background:var(--chakra-colors-giza-70);
  color:white;
  display:grid;
  place-items:center;
  filter: drop-shadow(0 0 0.10rem var(--chakra-colors-giza-50));

  &.active-category{
    background:var(--chakra-colors-giza-500);
    transition: 200ms;
  }
`