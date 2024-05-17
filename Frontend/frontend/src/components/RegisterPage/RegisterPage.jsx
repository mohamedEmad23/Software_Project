import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import Navbar from '../Navbar/Navbar.css';
const Logo = "../../Images/p3.png"

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, { name, email, password, phone });
            if (res.status === 200) {
                setMessage('User registered successfully');
                setIsSuccess(true);
                setTimeout(() => {
                    window.location.href = '/login'; // Redirect to login page after 3 seconds
                }, 2000); // Wait for 3 seconds
            } else {
                setMessage('Registration failed');
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
        <div className="container">
            <h2 className="title">Register</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        className="input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label className="label">Name</label>
                </div>
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
                <div className="input-group">
                    <input
                        className="input"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <label className="label">Phone</label>
                </div>
                <button className="button" type="submit">
                    Register
                </button>
            </form>
            {message && <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>}
        </div>
    );
};
export default RegisterPage;
