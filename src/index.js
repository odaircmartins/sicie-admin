import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './config/app';

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('rendered');
  });

  return <App tab="home" />
}

const containerReact = document.getElementById('root');
const root = ReactDOM.createRoot(containerReact);
root.render(<AppWithCallbackAfterRender />);