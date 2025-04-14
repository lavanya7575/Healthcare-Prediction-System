
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { signup } from '../api/auth.js';
import {Link, useNavigate} from "react-router-dom";

import { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await signup(email, password);
            console.log('Signup successful:', response);
            console.log(response.user);

            localStorage.setItem('uid', response.user.localId);
            console.log("User UID:", localStorage.getItem('uid'));

            alert('Signup successful!');
            navigate("/userDetails");
        } catch (error) {
            console.error('Signup failed:', error);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            alert(`Signup failed: ${error.error}`);
        }
    };

    return (
        <section className="hero">
        <div className="sparkles"></div>
  <div className="background-icons">
    <div className="icon icon1">💊</div>
    <div className="icon icon2">🩺</div>
    <div className="icon icon3">❤️</div>
    <div className="icon icon4">💉</div>
  </div>

        <div className="auth">
        <div className="auth-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Don't have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
        </div>
    </section>
    );
};

export default Signup;