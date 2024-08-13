// src/components/Footer.js

import React from 'react';

function Footer({ onAdd }) {
  return (
    <div className="Footer" onClick={onAdd}>
      <button className="Footer-button" >Add</button>
    </div>


  );
}

export default Footer;
