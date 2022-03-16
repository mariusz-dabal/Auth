import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/app.css';
import App from './components/App';
import { ProvideAuth } from "./utils/use-auth";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <Router>
        <App />
      </Router>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
);
