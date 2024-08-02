import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}

:root {
  background-color: ${({ theme }) => theme.colors.BG900};
  font-family: 'Freesentation R';
}

* {
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white};
}

body {
  margin: 0;
}

a {
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  text-decoration: none;
}
a:hover, a:active {
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
}

button {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

`;

export default GlobalStyle;
