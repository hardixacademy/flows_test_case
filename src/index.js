import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './components';
import { TablePage } from './Pages/TablePage';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <TablePage />
  </React.StrictMode>,
  document.getElementById('root')
);