import styled from "styled-components"

export const StyledCarouselContainer = styled.div`
  overflow: auto;
  display: grid;
  grid-auto-flow: column;
  padding: 10px;
  gap: 10px;
  width: 100%;
  touch-action: pan-y;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none; 
  min-height: 250px;


   &.carousel-container::-webkit-scrollbar {
    display: none;
  } 

`