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

  .completed {
    border: 1px solid ${({theme}) => theme.color.primary};
    color: ${({theme}) => theme.color.primary};
    background-color: ${({theme}) => theme.color.primary50};
  }

  .activeLink {
    background: ${({theme}) => theme.color.primary50};
  }
`

export default GlobalStyle