import React from 'react';
// pages
import Home from 'pages/Home/HomeContainer';
import Photos from 'pages/Photos/PhotosContainer';
// utils
import ErrorBoundary from 'utils/ErrorBoundary/ErrorBoundary';
// styles
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Home />
      <Photos />
    </ErrorBoundary>
  );
}

export default App;
