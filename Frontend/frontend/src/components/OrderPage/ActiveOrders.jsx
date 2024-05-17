import React, { useEffect, useState } from 'react';
import '../../components/OrderPage/ActiveOrders.css';
//import moment from 'moment';

const ActiveOrders = ({ customerId }) => {
    const [orders, setOrders] = useState([]);
    const userRole = localStorage.getItem('role'); // Fetch the user's role from local storage

    const getActiveOrders = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/getActiveOrders/${customerId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Fetch the token from local storage
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch active orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getActiveOrders();
    }, [customerId]);

    // FUNCTION TO DELETE ORDER
    const deleteOrder = async (orderId) => {
        try {
            await fetch(`http://localhost:5000/api/v1/deleteOrder/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Fetch the token from local storage
                }
            });
            getActiveOrders();
        } catch (error) {
            console.error(error);
        }
    };

    // FUNCTION TO PLACE AN ORDER
    const placeOrder = async (orderId) => {
        try {
            await fetch(`http://localhost:5000/api/v1/placeOrder/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Fetch the token from local storage
                }
            });
            getActiveOrders();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="active-orders-container">
            <h2>Active Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id} className="order-block">
                        <p>Order ID: {order._id}</p>
                        <p>Total Price: {order.totalPrice}</p>
                        <p>Status: {order.isComplete ? 'Complete' : 'Incomplete'}</p>
                        {/* Buttons for placing and deleting orders */}
                        {userRole === '1' && (
                            <>
                                <button className="place-order-button" onClick={() => placeOrder(order._id)}>Place Order</button>
                                <button className="delete-order-button" onClick={() => deleteOrder(order._id)}>Delete Order</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveOrders;