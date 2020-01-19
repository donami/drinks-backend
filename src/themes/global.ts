import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }

  a {
    color: #1976d2;
    text-decoration: none;
  }

  p {
    margin: 10px 0;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
