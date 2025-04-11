import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}

:root {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.BG900};
  font-family: 'Freesentation R';
}

* {
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white};

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.BG900};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.normal};
    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.BG900};
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.normal_hover};
  }
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

.sb-main-centered {
  overflow-x: hidden;
}

#storybook-root {
  padding: 0 !important;
}

`;

export default GlobalStyle;
