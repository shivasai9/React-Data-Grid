import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppStateProvider } from './providers'

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('rendered');
  });

  return <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppWithCallbackAfterRender />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
