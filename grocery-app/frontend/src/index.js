import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Auth0Provider
    domain="dev-9igcu2ad.us.auth0.com"
    clientId="iLWGQZuPBGcIFjrQDFb0NvzDGPq8EHQo"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
/*
  <React.StrictMode>>
    <App />
  </React.StrictMode>
  document.getElementById("root")*/