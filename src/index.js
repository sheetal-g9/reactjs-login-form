import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.sass';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <App /> 	
  </BrowserRouter>
  ), document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
