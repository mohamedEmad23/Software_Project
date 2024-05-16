import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
            if (res.status === 200) {
                setMessage('User Logged in successfully');
                setIsSuccess(true);
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
        <div className="container2::before">
            <div className="container2">
                <h2 className="title">Login</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            className="input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
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
                            placeholder="Password"
                            required
                        />
                        <label className="label">Password</label>
                    </div>
                    <button className="button" type="submit">
                        Login
                    </button>
                </form>
                {message && <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
