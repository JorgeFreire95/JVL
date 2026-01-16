import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Church } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Anuncios', path: '/anuncios' },
    { name: 'Contactos', path: '/contactos' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Church size={32} />
          <span>Presbiteriana</span>
        </Link>

        <div className="navbar-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="btn btn-primary btn-sm">
            Acceso
          </Link>
        </div>

        <button className="navbar-mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${isOpen ? 'open' : ''}`}>
        <div className="navbar-mobile-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="btn btn-primary mobile-btn" onClick={() => setIsOpen(false)}>
            Acceso
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
