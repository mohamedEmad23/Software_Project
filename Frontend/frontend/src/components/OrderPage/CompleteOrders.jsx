import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../../components/OrderPage/CompleteOrders.css'; // Import the CSS file

const CompleteOrders = ({ customerId }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (customerId) {
                try {
                    const response = await fetch(`http://localhost:5000/api/v1/getCompleteOrders/${customerId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setOrders(data);
                    setError(null)
                } catch (error) {
                    console.error('Error fetching complete orders:', error);
                }
            }
        };
        fetchOrders();
    }, [customerId]);

    return (
        <div className="complete-orders-container">
            <h2>Complete Orders</h2>
            <div className="order-list">
                {orders.map(order => (
                    <div className="order-block" key={order._id}>
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Total Price:</strong> {order.totalPrice}</p>
                        <p><strong>Status:</strong> {order.isComplete ? 'Complete' : 'Incomplete'}</p>
                        <p><strong>Date Created:</strong> {moment(order.createdAt).format('DD/MM/YY HH:mm')}</p>
                        <p><strong>Placed At:</strong> {moment(order.updatedAt).format('DD/MM/YY HH:mm')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompleteOrders;
