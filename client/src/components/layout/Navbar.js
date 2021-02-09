import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5 navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand mb-0 h1 mx-auto" to="/">XMEME</Link>
      </div>
    </nav>
  );
};

export default Navbar;
