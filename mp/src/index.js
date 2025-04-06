import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Silence console warnings (especially for deprecated Sass warnings)
const originalConsoleWarn = console.warn;
console.warn = function(msg) {
  if (msg && msg.includes && (
      msg.includes('Sass') || 
      msg.includes('deprecat') || 
      msg.includes('legacy')
  )) {
    return;
  }
  originalConsoleWarn.apply(console, arguments);
};

// Silence console errors in production
const originalConsoleError = console.error;
console.error = function(msg) {
  // Ignore React errors related to prop types, keys, etc.
  if (typeof msg === 'string' && (
      msg.includes('Warning:') || 
      msg.includes('React') ||
      msg.includes('component')
  )) {
    return;
  }
  originalConsoleError.apply(console, arguments);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 