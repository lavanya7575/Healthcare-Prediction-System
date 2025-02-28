import { useState } from 'react';
import { signup } from '../api/auth';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const handleSignup = async (e) => {
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
            alert(`Signup failed: ${error.error}`);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;