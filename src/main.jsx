import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App.jsx";
import {AuthProvider} from "./services/authContext.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </LocalizationProvider>
    </React.StrictMode>
)

