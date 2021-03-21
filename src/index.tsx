import React from 'react';
import ReactDOM from 'react-dom';
import App from './web/App';
import { StoreProvider } from "./web/store";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
