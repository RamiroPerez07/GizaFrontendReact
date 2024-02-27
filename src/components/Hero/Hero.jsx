import React from 'react'
import { StyledHeroContainer } from './HeroStyles'

const Hero = () => {

  const titleStyle = {
    fontSize: "2.4rem",
    textAlign: "center",
    fontWeight: "600",
    color: "#0f0f0f",
    marginBottom: "15px"
  }

  const textStyle = {
    fontSize: "0.9rem",
    color: "#5c5b5b",
  }

  return (
    <StyledHeroContainer>
      <h1 style={titleStyle}>Giza</h1>
      <p style={textStyle}>Perfumería y cosmética</p>
    </StyledHeroContainer>
  )
}

export default Hero