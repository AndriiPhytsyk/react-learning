import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import Stars from './Stars';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Stars maxRating={4}></Stars> */}
  </React.StrictMode>
);
