import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5 navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand mb-0 h1 mx-auto" href="/">XMEME</a>
          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
            </ul>
          </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
