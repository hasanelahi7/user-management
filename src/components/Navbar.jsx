import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="bg-green-900 p-4 mb-8 text-white text-right">
      <Link to="/" className="text-white ml-4 no-underline hover:text-gray-300">
        Table
      </Link>
      <Link to="/about" className="text-white ml-4 no-underline hover:text-gray-300">
        About Us
      </Link>
      <Link to="/contact" className="text-white ml-4 no-underline hover:text-gray-300">
        Contact Us
      </Link>
    </nav>
  );
};

export default Navbar;