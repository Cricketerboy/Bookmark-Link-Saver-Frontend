// src/styles/globalStyles.js

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => (theme.isDarkMode ? '#121212' : '#fff')};
    color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#121212')};
    font-family: Arial, Helvetica, sans-serif;
    transition: all 0.3s ease;
  }
`;
