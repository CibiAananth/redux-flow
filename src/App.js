import React from 'react';
// pages
import Photos from 'pages/Photos/PhotosContainer';
// utils
import ErrorBoundary from 'utils/ErrorBoundary/ErrorBoundary';
// styles
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Photos />
    </ErrorBoundary>
  );
}

export default App;
