import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';

import Main from './components/Main.tsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

