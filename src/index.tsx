import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-mono/400.css';
import './index.css';
import 'styles/colors.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Providers from 'providers';
import Router from './pages/router';

ReactDOM.render(
  <StrictMode>
    <Providers>
      <Router />
    </Providers>
  </StrictMode>,
  document.getElementById('root'),
);
