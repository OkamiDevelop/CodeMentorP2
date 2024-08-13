// src/SplashScreen.js

import React from 'react';
import './SplashScreen.css'; // Optional, if you want custom styling

function SplashScreen() {
  return (
    <div className="SplashScreen">
      <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="Splash Logo" className="SplashScreen-logo" />
      <h1>Loading...</h1>
    </div>
  );
}

export default SplashScreen;
