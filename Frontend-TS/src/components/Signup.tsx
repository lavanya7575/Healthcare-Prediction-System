
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { signup } from '../api/auth.js';
import {Link, useNavigate} from "react-router-dom";
import '../styles/Auth.css';
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
    );
};

export default Signup;