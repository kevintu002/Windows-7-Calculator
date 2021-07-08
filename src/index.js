import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Calculator from './components/Calculator';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Calculator />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
