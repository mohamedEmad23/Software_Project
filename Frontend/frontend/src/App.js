import React, { useEffect } from 'react';
import './App.css';
import RegisterPage from './components/RegisterPage/RegisterPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ContactPage from "./components/ContactPage/ContactPage";
import AboutPage from "./components/AboutPage/AboutPage";
import Homepage from "./components/Homepage/Homepage";
import LoginPage from "./components/LoginPage/LoginPage";
import ProductPage from "./components/ProductPage/ProductPage";
import Navbar from "./components/Navbar/Navbar";
import {Provider} from "react-redux";
import store from "./redux/store";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setRole} from "./redux/userSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserRole = async () => {
            const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in local storage
            if (userId) {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/role/${userId}`);
                    dispatch(setRole(res.data.role));
                } catch (err) {
                    console.error('Error fetching user role:', err);
                }
            }
        };

        fetchUserRole();
    }, [dispatch]);

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    {/*<Route path="/about" element={<AboutPage />} />*/}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="*" element={<Homepage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;