// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from "react-redux";
//
// const url = `${process.env.REACT_APP_API_URL}/products`;
//
// const ProductPage = () => {
//     const userRole = useSelector((state) => state.user.role);
//     console.log('User role:', userRole)
//     const [products, setProducts] = useState([]);
//     const [product, setProduct] = useState({name: '', price: '', stock: '', description: '', line: '', model: '', year: ''});
//
//     const getAllProducts = async () => {
//         try {
//             const response = await axios.get(url);
//             setProducts(response.data);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
//
//     const addNewProduct = async () => {
//         try {
//             await axios.post(url, product);
//             getAllProducts();
//         } catch (error) {
//             console.error('Error adding product:', error);
//         }
//     };
//
//     const deleteProduct = async (id) => {
//         try {
//             const token = localStorage.getItem('token'); // Get the token from local storage
//             const url = `${process.env.REACT_APP_API_URL}/products/${id}`;
//             await axios.delete(url, {
//                 headers: {
//                     'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
//                 }
//             });
//             getAllProducts();
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         }
//     };
//
//     const updateProduct = async (id) => {
//         try {
//             const url = `${process.env.REACT_APP_API_URL}/products/${id}`;
//             await axios.put(url, product);
//             getAllProducts();
//         } catch (error) {
//             console.error('Error updating product:', error);
//         }
//     };
//
//     useEffect(() => {
//         getAllProducts();
//     }, []);
//
//     return (
//         <div>
//             {userRole == 2 && <button onClick={addNewProduct}>Add New Product</button>}
//             {products.map(product => (
//                 <div key={product._id}>
//                     <h2>{product.name}</h2>
//                     <p>{product.description}</p>
//                     {userRole == 2 && <button onClick={() => deleteProduct(product._id)}>Delete Product</button>}
//                     {userRole == 2 && <button onClick={() => updateProduct(product._id)}>Update Product</button>}
//                 </div>
//             ))}
//             <button onClick={getAllProducts}>Get All Products</button>
//         </div>
//     );
// };
//
//
// export default ProductPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ProductPage.css';

// Function to decode base64 URL
const base64UrlDecode = (str) => {
    try {
        return JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));
    } catch (e) {
        return null;
    }
};

// Function to decode JWT token
const decodeToken = (token) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
    }
    const payload = parts[1];
    return base64UrlDecode(payload);
};

// Component to display car information
const CarCard = ({ car, userRole, onDelete, onEdit }) => {
    return (
        <div className="card">
            <h2>{car.name}</h2>
            <p>Model: {car.model}</p>
            <p>Year: {car.year}</p>
            <p>Price: {car.price}</p>
            <p>Stock: {car.stock}</p>
            <p>Description: {car.description}</p>
            {userRole === 'admin' && (
                <>
                    <button onClick={() => onDelete(car._id)}>Delete</button>
                    <button onClick={() => onEdit(car)}>Edit</button>
                </>
            )}
        </div>
    );
};

// Form component to add new product
const AddProductForm = ({ onClose, onAdd }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        line: '',
        model: '',
        year: '',
        specs: {
            color: 'Default Color',
            engine: 'Default Engine',
            HP: 300,
            torque: 280,
            acceleration: 4.9,
            top_speed: 275,
            fuel_type: 'Gasoline',
            transmission: 'Automatic',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSpecsChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            specs: {
                ...prevProduct.specs,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Product:', product);
        try {
            const response = await axios.post('http://localhost:5000/api/v1/addProduct', product);
            console.log('Product added:', response.data);
            onAdd(response.data);
            onClose(); // Close the form after submission
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="add-product-form">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
                <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
                <input type="text" name="line" placeholder="Line" value={product.line} onChange={handleChange} required />
                <input type="text" name="model" placeholder="Model" value={product.model} onChange={handleChange} required />
                <input type="number" name="year" placeholder="Year" value={product.year} onChange={handleChange} required />
                <input type="text" name="color" placeholder="Color" value={product.specs.color} onChange={handleSpecsChange} />
                <input type="text" name="engine" placeholder="Engine" value={product.specs.engine} onChange={handleSpecsChange} />
                <input type="number" name="HP" placeholder="HP" value={product.specs.HP} onChange={handleSpecsChange} />
                <input type="number" name="torque" placeholder="Torque" value={product.specs.torque} onChange={handleSpecsChange} />
                <input type="number" name="acceleration" placeholder="Acceleration" value={product.specs.acceleration} onChange={handleSpecsChange} />
                <input type="number" name="top_speed" placeholder="Top Speed" value={product.specs.top_speed} onChange={handleSpecsChange} />
                <select name="fuel_type" value={product.specs.fuel_type} onChange={handleSpecsChange}>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
                <select name="transmission" value={product.specs.transmission} onChange={handleSpecsChange}>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="CVT">CVT</option>
                </select>
                <button type="submit">Add Product</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

// Form component to edit product
const EditProductForm = ({ product, onClose, onUpdate }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        ...product,
        specs: {
            color: product.specs?.color || 'Default Color',
            engine: product.specs?.engine || 'Default Engine',
            HP: product.specs?.HP || 300,
            torque: product.specs?.torque || 280,
            acceleration: product.specs?.acceleration || 4.9,
            top_speed: product.specs?.top_speed || 275,
            fuel_type: product.specs?.fuel_type || 'Gasoline',
            transmission: product.specs?.transmission || 'Automatic',
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSpecsChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevProduct => ({
            ...prevProduct,
            specs: {
                ...prevProduct.specs,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Updated Product:', updatedProduct);
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/updateProduct/${updatedProduct._id}`, updatedProduct);
            console.log('Product updated:', response.data);
            onUpdate(response.data);
            onClose(); // Close the form after submission
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="edit-product-form">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={updatedProduct.name} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={updatedProduct.price} onChange={handleChange} required />
                <input type="number" name="stock" placeholder="Stock" value={updatedProduct.stock} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" value={updatedProduct.description} onChange={handleChange} required />
                <input type="text" name="line" placeholder="Line" value={updatedProduct.line} onChange={handleChange} required />
                <input type="text" name="model" placeholder="Model" value={updatedProduct.model} onChange={handleChange} required />
                <input type="number" name="year" placeholder="Year" value={updatedProduct.year} onChange={handleChange} required />
                <input type="text" name="color" placeholder="Color" value={updatedProduct.specs.color} onChange={handleSpecsChange} />
                <input type="text" name="engine" placeholder="Engine" value={updatedProduct.specs.engine} onChange={handleSpecsChange} />
                <input type="number" name="HP" placeholder="HP" value={updatedProduct.specs.HP} onChange={handleSpecsChange} />
                <input type="number" name="torque" placeholder="Torque" value={updatedProduct.specs.torque} onChange={handleSpecsChange} />
                <input type="number" name="acceleration" placeholder="Acceleration" value={updatedProduct.specs.acceleration} onChange={handleSpecsChange} />
                <input type="number" name="top_speed" placeholder="Top Speed" value={updatedProduct.specs.top_speed} onChange={handleSpecsChange} />
                <select name="fuel_type" value={updatedProduct.specs.fuel_type} onChange={handleSpecsChange}>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
                <select name="transmission" value={updatedProduct.specs.transmission} onChange={handleSpecsChange}>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="CVT">CVT</option>
                </select>
                <button type="submit">Update Product</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

// Main Product Page component
const ProductPage = () => {
    const [cars, setCars] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/products');
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchProducts();

        // Retrieve the role from sessionStorage
        const storedRole = sessionStorage.getItem('role');
        if (storedRole) {
            setUserRole(storedRole);
        } else {
            // Decode the token and get the user role as fallback
            const token = Cookies.get('token');
            if (token) {
                try {
                    const decodedToken = decodeToken(token);
                    console.log('Decoded token:', decodedToken); // Log decoded token
                    if (decodedToken && decodedToken.role !== undefined) {
                        setUserRole(decodedToken.role.toString()); // Ensure the role is stored as a string
                    } else {
                        console.error('Role not found in token');
                        setUserRole(null);
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    setUserRole(null);
                }
            }
        }
    }, []);

    const handleAddProduct = (newProduct) => {
        setCars((prevCars) => [...prevCars, newProduct]); // Add new product to the list
    };

    const handleUpdateProduct = (updatedProduct) => {
        setCars((prevCars) =>
            prevCars.map(car => car._id === updatedProduct._id ? updatedProduct : car)
        ); // Update the product in the list
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/deleteProduct/${productId}`);
            if (response.status === 200) {
                setCars(cars.filter(car => car._id !== productId)); // Remove the deleted product from the list
            } else {
                console.error('Failed to delete product:', response.status);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowEditForm(true);
    };

    useEffect(() => {
        if (showAddForm === false && showEditForm === false) {
            fetchProducts();
        }
    }, [showAddForm, showEditForm]);

    return (
        <div className="product-page">
            <h1>Product Page</h1>
            {userRole === 'admin' && ( // Conditionally render the Add Product button
                <button onClick={() => setShowAddForm(true)}>Add Product</button>
            )}
            {showAddForm && <AddProductForm onClose={() => setShowAddForm(false)} onAdd={handleAddProduct} />}
            {showEditForm && selectedProduct && (
                <EditProductForm
                    product={selectedProduct}
                    onClose={() => setShowEditForm(false)}
                    onUpdate={handleUpdateProduct}
                />
            )}
            <div className="car-list">
                {cars.map(car => (
                    <CarCard key={car._id} car={car} userRole={userRole} onDelete={handleDeleteProduct} onEdit={handleEditProduct} />
                ))}
            </div>
        </div>
    );
};

export default ProductPage;



