import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import Logo from '../../Images/p3.png'; // Logo

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="menu-icon" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            <div className="logo">
                <a href="/home">
                    <img src={Logo} alt="Logo"/>
                </a>
            </div>
            <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <div className="close-icon" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                <ul className="menu-list">
                    <h5 className="title">Porsche</h5>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/main-orders-page">Orders</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
            <div className="login-icon">
                <a href="/login">
                    <FontAwesomeIcon icon={faUser}/>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
