import { Router } from 'react-router-dom';

import { AuthProvider } from '../context/authContext';
import GlobalStyle from './globalStyle';
import Routes from './routes';
import history from "./history";

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <GlobalStyle />              
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
