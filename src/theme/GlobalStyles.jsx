import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1 {
    font: 700 35px poppins;
    color: white;
  }

  h2 {
    color: white;
    font: 700 25px poppins;
  }

  body {
    background: ${({theme}) => theme.color.bg};
  }
`

export default GlobalStyle