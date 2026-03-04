import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #ffffff;
    color: #0d0d0d;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`;
