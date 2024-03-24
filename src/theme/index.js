import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    giza: {
      0: "#ffffff",
      50: "#E2E8F0", //gris terciario para detalles
      70: "#ADB5BD", //gris mas oscuro para detalles
      100: "#0f0f0f",
      500: "#00B4D8", // azul principal guiza
      700: "#0087BF", //azul hover giza
      900: "#9627a5" //verde
    },
  }
});