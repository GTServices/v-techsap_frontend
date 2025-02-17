import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  </Provider>
);
