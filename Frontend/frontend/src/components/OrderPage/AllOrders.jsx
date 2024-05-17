import React, { useEffect, useState } from 'react';
//import { token } from '../../../../../../../Desktop/token';
import moment from 'moment';
import '../../components/OrderPage/AllOrders.css'; // Import the CSS file



const AllOrders = ({ customerId }) => {
    const [orders, setOrders] = useState([]);
    const userRole = localStorage.getItem('role'); // Fetch the user's role from local storage

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/getAllOrders/${customerId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Fetch the token from local storage
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (customerId) {
            fetchOrders();
        }
    }, [customerId]);

    return (
        <div className="all-orders-container">
            <h2>All Orders</h2>
            <ul>
                {orders.map(order => (
                    <li className="order-block" key={order._id}>
                        <p>Order ID: {order._id}</p>
                        <p>Total Price: {order.totalPrice}</p>
                        <p>Status: {order.isComplete ? 'Complete' : 'Incomplete'}</p>
                        {/* Conditionally render the orders based on the user's role */}
                        {userRole === '1' && (
                            <>
                                <p>Date Created: {moment(order.createdAt).format('DD/MM/YY HH:mm')}</p>
                                <p>Last Updated: {moment(order.updatedAt).format('DD/MM/YY HH:mm')}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllOrders;
