import React from 'react';
import axios from "axios";
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./redux/store";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Set withCredentials to true for all axios requests
axios.defaults.withCredentials = true;

const root = document.getElementById('root');
createRoot(root).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();