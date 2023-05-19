import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { desktopRouter, mobileRouter } from './routes/index.tsx';

const theme = extendTheme({
  colors: {
    backgorund: '#F5F5F5',
    detail: '#16120B',
    primary: '#EC5F82',
    secondary: '#EC5F82'
  }
});

const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {isDesktop ? (
        <RouterProvider router={desktopRouter} />
      ) : (
        <RouterProvider router={mobileRouter} />
      )}
    </ChakraProvider>
  </React.StrictMode>
);
