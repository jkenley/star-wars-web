import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    black: '#000',
    kenley: '#FFC107',
    white: '#fff',
  },

  fonts: {
    body: "Montserrat, ans-serif",
    heading: "Montserrat, ans-serif",
    mono: "Menlo, monospace"
  }
});

export default theme;
