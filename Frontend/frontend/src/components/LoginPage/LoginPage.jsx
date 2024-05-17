import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import { useDispatch } from "react-redux";
import { setRole } from "../../redux/userSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
            console.log('Token from response:', res.data.token); // Log the token from the response
            console.log('Response from server:', res); // Log the response from the server
            if (res.status === 200) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', res.data.token);
                }
                console.log('Response from server:', res); // Log the response from the server
                console.log('Token from response:', res.data.token); // Log the token from the response
                localStorage.setItem('token', res.data.token); // Store the token in local storage
                console.log('Token stored in local storage:', localStorage.getItem('token')); // Log the token

                const roleRes = await axios.get(`${process.env.REACT_APP_API_URL}/user/role/${res.data.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('Role response from server:', roleRes); // Log the role response from the server

                dispatch(setRole(roleRes.data.role));
                setMessage('User Logged in successfully');
                setIsSuccess(true);
                setTimeout(() => {
                    window.location.href = '/home';
                }, 2000);
            } else {
                setMessage('Login failed');
                setIsSuccess(false);
            }
        } catch (err) {
            console.error('Error message:', err.message);
            if (err.response) {
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
            }
            setMessage('An error occurred');
            setIsSuccess(false);
        }
    };

    return (
        <div className="container3">
            <h2 className="title">Login</h2>
            <form className="form" onSubmit={handleLogin}>
                <div className="input-group">
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="label">Email</label>
                </div>
                <div className="input-group">
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className="label">Password</label>
                </div>
                <button className="button" type="submit">
                    Login
                </button>
                <p className="text">Don't Have an Account?</p>
                <button className="button">
                    <Link to="/register" className='plain-text-button'>
                        Register
                    </Link>
                </button>
            </form>
            {message && <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>}
        </div>
    );
};

export default LoginPage;