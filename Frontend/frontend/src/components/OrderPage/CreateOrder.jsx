import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
//import { token } from '../../../../../../../Desktop/token';
import Alert from '../../components/OrderPage/Alert';
import '../../components/OrderPage/CreateOrder.css';


const CreateOrder = ({ customerId }) => {
    const [orderDetails, setOrderDetails] = useState({});
    const [availableProducts, setAvailableProducts] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState(null);
    const [orderCreated, setOrderCreated] = useState(false);
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role'); // Fetch the user's role from local storage

    const handleAlertClose = () => {
        setError(null);
    };

    const createOrder = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/createOrder/${customerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to create order');
            }

            setOrderDetails(data);
            setOrderId(data._id);
            setOrderCreated(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const addProductToOrder = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/order/addProduct/${orderId}/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to add product to order');
            }

            setOrderDetails(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const removeProductFromOrder = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/order/removeProduct/${orderId}/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to remove product from order');
            }

            setOrderDetails(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const placeOrder = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/placeOrder/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to place order');
            }

            setError("Order Was Placed Successfully");

            setTimeout(() => {
                navigate('/main-orders-page');
            }, 1000);

        } catch (error) {
            setError(error.message);
        }
    };

    const deleteOrder = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/deleteOrder/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete order');
            }

            setError("Order Was Cancelled Successfully");
            setTimeout(() => {
                navigate('/main-orders-page');
            }, 1000);

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const fetchAvailableProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/viewProducts', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch available products');
                }

                setAvailableProducts(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAvailableProducts();
    }, []);

    return (
        <div className="create-order-container">
            <div className="create-order-content">
                <h1>Create Order</h1>
                <Alert message={error} onClose={handleAlertClose} /> {/* Display the Alert component */}
                {!orderCreated && (
                    <button className="create-order-button" onClick={createOrder}>Click to Create an Order</button>
                )}
                {orderCreated && (
                    <div className="order-details">
                        <h3>My Order: {orderDetails.name}</h3>
                        <p>Number of Products: {orderDetails.numOfProducts}</p>
                        <p>Total Price: {orderDetails.totalPrice}</p>
                        <ul>
                            <p>The products: </p>
                            {orderDetails.products && orderDetails.products.map((product, index) => {
                                console.log("Product ID:", product);
                                const availableProduct = availableProducts.find(p => p._id === product);
                                console.log("Available Product:", availableProduct);
                                return (
                                    <li key={product}>
                                        {index + 1}. {availableProduct ? availableProduct.name : 'Unknown'} - ${availableProduct ? availableProduct.price : 'N/A'}
                                        <button className="add-product-button" onClick={() => removeProductFromOrder(product)}>Remove</button>
                                    </li>
                                );
                            })}
                        </ul>
                        <button className="place-order-button" onClick={placeOrder}>Place Order</button>
                        <button className="delete-order-button" onClick={deleteOrder}>Delete Order</button>
                    </div>
                )}
            </div>
            <div className="available-products">
                <h2>Available Products</h2>
                <ul>
                    {availableProducts.map((product) => (
                        <li key={product._id}>
                            {product.name} - ${product.price}
                            <button className="add-product-button" onClick={() => addProductToOrder(product._id)}>Add To Order</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CreateOrder;
