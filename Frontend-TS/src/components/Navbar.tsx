
import { Link, useNavigate } from 'react-router-dom';

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
        <nav style={styles.navbar}>
            <div style={styles.left}>
                <Link to="/" style={styles.link}>Home</Link>
                {/* Add more links here later */}
            </div>
            <div style={styles.right}>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" style={styles.link}>Profile</Link>
                        <button onClick={handleLogout} style={styles.button}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" style={styles.link}>Login</Link>
                )}
            </div>
        </nav>
    );
};

// Styles
const styles = {


    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    left: {
        display: 'flex',
        gap: '20px',
    },
    right: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Navbar;