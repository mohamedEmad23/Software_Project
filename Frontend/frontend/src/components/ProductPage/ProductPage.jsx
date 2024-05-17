import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

const url = `${process.env.REACT_APP_API_URL}/products`;

const ProductPage = () => {
    const userRole = useSelector((state) => state.user.role);
    console.log('User role:', userRole)
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({name: '', price: '', stock: '', description: '', line: '', model: '', year: ''});

    const getAllProducts = async () => {
        try {
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addNewProduct = async () => {
        try {
            await axios.post(url, product);
            getAllProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/products/${id}`;
            await axios.delete(url);
            getAllProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const updateProduct = async (id) => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/products/${id}`;
            await axios.put(url, product);
            getAllProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div>
            {userRole === '2' && <button onClick={addNewProduct}>Add New Product</button>}
            {products.map(product => (
                <div key={product._id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    {userRole === '2' && <button onClick={() => deleteProduct(product._id)}>Delete Product</button>}
                    {userRole === '2' && <button onClick={() => updateProduct(product._id)}>Update Product</button>}
                </div>
            ))}
            <button onClick={getAllProducts}>Get All Products</button>
        </div>
    );
};

export default ProductPage;