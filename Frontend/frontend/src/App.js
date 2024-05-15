import React from 'react';
import './App.css';
import RegisterPage from './components/RegisterPage/RegisterPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;