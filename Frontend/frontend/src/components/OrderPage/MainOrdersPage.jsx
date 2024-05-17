import React from 'react';
import Navbar from '../../components/OrderPage/Navbar';
import Routes from './Route';
import '../../components/OrderPage/MainOrdersPage.css';

//NEED TO IMPORT CUSTOMER ID FROM LOGIN

//NEED TO IMPORT THE TOKEN

const MainOrdersPage = () => {
    
    return (
        <div className="main-page-container">
            <h1>WELCOME TO THE ORDERS SECTION</h1>
            <Navbar />
            
        </div>
    );
}

export default MainOrdersPage;
