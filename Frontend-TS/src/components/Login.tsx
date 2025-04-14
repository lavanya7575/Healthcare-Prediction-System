// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { login } from '../api/auth.js';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import '../styles/login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            console.log('Login successful:', response);

            // Store Firebase UID in localStorage
            localStorage.setItem('uid', response.user.localId);
            console.log("User UID:", localStorage.getItem('uid'));

            // Redirect to home page
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error);
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
        <div className='auth'>
        <div className="auth-container">
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Sign In</button>
            </form>
            <p>
                Already have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
        </div>
        </section>
    );
};

export default Login;