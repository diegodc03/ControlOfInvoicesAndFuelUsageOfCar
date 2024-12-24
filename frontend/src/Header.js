import './css/header.css';
import React, {useState} from 'react';
import FileUpload from './facturasCoche';
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';

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
              <li className="nav__item"><Link to="/repostaje">Inicio</Link></li>
              <li className="nav__item"><Link to="/repostaje">Repostaje</Link></li>
              <li className="nav__item"><Link to="/facturas">Facturas</Link></li>
              <li className="nav__item"><a href="#servicios">Servicios</a></li>
              <li className="nav__item"><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? "✖" : "☰"}
          </button>

          <Outlet />      {/* Para mostrar el contenido de las rutas hijas Conteedor donde se van a renderizar todas nuestras paginas*/}
        </header>
      );
    };
    
export default Header;
