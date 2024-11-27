import './css/header.css';
import React, {useState} from 'react';

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <header className="header">
          <div className="logo">Gestión de Facturas y Repostajes</div>
          <nav className={`nav ${isMenuOpen ? "nav--open" : ""}`}>
            <ul className="nav__list">
              <li className="nav__item"><a href="#inicio">Inicio</a></li>
              <li className="nav__item"><a href="#servicios">Servicios</a></li>
              <li className="nav__item"><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </header>
      );
    };
    
export default Header;
