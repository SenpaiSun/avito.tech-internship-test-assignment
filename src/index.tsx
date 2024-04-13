import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { DEFAULT_THEME } from '@mantine/core';
import { store } from './store/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={DEFAULT_THEME}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
