// src/components/Header.js

import React from 'react';

function Header({ activeCategory, setActiveCategory, onCategoryClick }) {
  return (
    <div className="Header">
      {['Pending', 'Completed', 'Overdue'].map((category) => (
        <button
          key={category}
          className={activeCategory === category ? 'active' : ''}
          onClick={() => {
            setActiveCategory(category);
            onCategoryClick(); // Call the function to cancel the form
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Header;
