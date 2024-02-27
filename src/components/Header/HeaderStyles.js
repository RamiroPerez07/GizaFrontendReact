import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  min-height: 60px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  padding: 10px;
  position: sticky;
  top: 0px;
  z-index: 1;
`

export const StyledHeaderContent = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const StyledNavbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const StyledNavbarContent = styled.ul`
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;


    @media (max-width: 750px){
        display: none;
    }
    
`

export const StyledNavbarSummary = styled.ul`
    display: none;

    @media (max-width: 750px){
        display: flex;
        gap: 15px;
        align-items: center;
        justify-content: center;
    }
`

export const NavbarItem = styled(NavLink)`
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    color: #0f0f0f;

    &.active{
        font-weight: 800;
    }

`



