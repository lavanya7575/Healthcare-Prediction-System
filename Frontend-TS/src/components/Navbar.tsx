
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
const Navbar = () => {
    const navigate = useNavigate();

    // Check if the user is logged in (e.g., by checking localStorage)
    const isLoggedIn = localStorage.getItem('uid') !== null;

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('uid'); // Clear the UID from localStorage
        navigate('/'); // Redirect to the login page
    };

    return (
        <nav className="navbar">
            <div >
                <Link to="/">Home</Link>
                {/* Add more links here later */}
            </div>
            <div >
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" >Profile</Link>
                        <button onClick={handleLogout} >Logout</button>
                    </>
                ) : (
                    <Link to="/login" >Login</Link>
                )}
            </div>
        </nav>
    );
};


export default Navbar;