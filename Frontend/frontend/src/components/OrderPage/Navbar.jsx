import React from 'react';
import { Link } from 'react-router-dom';
import '../../components/OrderPage/Navbar.css'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/create-order">Create Order</Link></li>
                <li><Link to="/active-orders">Show Active Orders</Link></li>
                <li><Link to="/complete-orders">Show Complete Orders</Link></li>
                <li><Link to="/all-orders">Show All Orders</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;