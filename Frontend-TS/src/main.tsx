import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './App.css';
import App from './App.jsx'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import UserDetails from "./components/UserDetails.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";


createRoot(document.getElementById('root')!).render(
    <div className="sparkles">
    <StrictMode>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    </StrictMode>
    </div>
)