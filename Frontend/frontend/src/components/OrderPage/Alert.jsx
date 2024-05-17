import React from 'react';
//import './'; 

const Alert = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="alert">
            <div className="alert-content">
                <span>{message}</span>
                <button onClick={onClose} className="alert-close">X</button>
            </div>
        </div>
    );
};

export default Alert;
