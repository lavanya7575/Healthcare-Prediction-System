// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const isLoggedIn = localStorage.getItem('uid') !== null;

//     const handleLogout = () => {
//         localStorage.removeItem('uid');
//         navigate('/');
//     };

//     // State to manage hover effects
//     const [hoveredLink, setHoveredLink] = useState<string | null>(null);
//     const [hoveredButton, setHoveredButton] = useState<boolean>(false);

//     return (
//         <nav style={styles.navbar}>
//             <div style={styles.left}>
//                 <Link 
//                     to="/" 
//                     style={{ 
//                         ...styles.link, 
//                         ...(hoveredLink === 'home' ? styles.linkHover : {}) 
//                     }}
//                     onMouseEnter={() => setHoveredLink('home')}
//                     onMouseLeave={() => setHoveredLink(null)}
//                 >
//                     Home
//                 </Link>
//             </div>
//             <div style={styles.right}>
//                 {isLoggedIn ? (
//                     <>
//                         <Link 
//                             to="/profile" 
//                             style={{ 
//                                 ...styles.link, 
//                                 ...(hoveredLink === 'profile' ? styles.linkHover : {}) 
//                             }}
//                             onMouseEnter={() => setHoveredLink('profile')}
//                             onMouseLeave={() => setHoveredLink(null)}
//                         >
//                             Profile
//                         </Link>
//                         <button 
//                             onClick={handleLogout} 
//                             style={{ 
//                                 ...styles.button, 
//                                 ...(hoveredButton ? styles.buttonHover : {}) 
//                             }}
//                             onMouseEnter={() => setHoveredButton(true)}
//                             onMouseLeave={() => setHoveredButton(false)}
//                         >
//                             Logout
//                         </button>
//                     </>
//                 ) : (
//                     <Link 
//                         to="/login" 
//                         style={{ 
//                             ...styles.link, 
//                             ...(hoveredLink === 'login' ? styles.linkHover : {}) 
//                         }}
//                         onMouseEnter={() => setHoveredLink('login')}
//                         onMouseLeave={() => setHoveredLink(null)}
//                     >
//                         Login
//                     </Link>
//                 )}
//             </div>
//         </nav>
//     );
// };

// // Styles
// import { CSSProperties } from 'react';

// const styles: { [key: string]: CSSProperties } = {
//     navbar: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '25px 20px',
//         width: '100%',
//         top: 0,
//         zIndex: 10,
//         position: 'fixed',
//         backdropFilter: 'blur(10px)',
//         borderBottom: '2px solid #00f2fe',
//         backgroundColor: 'rgba(10, 10, 33, 0.7)',
//         boxShadow: '0 0 40px rgba(0, 242, 254, 0.6)',
//         fontFamily: '"Orbitron", sans-serif',
//     },
//     left: {
//         display: 'flex',
//         gap: '20px',
//     },
//     right: {
//         display: 'flex',
//         gap: '20px',
//         alignItems: 'center',
//     },
//     link: {
//         color: '#cfcfcf',
//         textDecoration: 'none',
//         fontSize: '1.2rem',
//         fontWeight: 500,
//         position: 'relative',
//         padding: '0.3rem 0',
//         transition: 'color 0.3s ease, text-shadow 0.3s ease',
//     },
//     linkHover: {
//         color: '#00f2fe',
//         textShadow: '0 0 10px #00f2fe, 0 0 20px #00f2fe',
//     },
//     button: {
//         backgroundColor: 'transparent',
//         border: 'none',
//         color: '#cfcfcf',
//         cursor: 'pointer',
//         fontSize: '1.2rem',
//         fontWeight: 500,
//         position: 'relative',
//         padding: '0.3rem 0',
//         transition: 'color 0.3s ease, text-shadow 0.3s ease',
//     },
//     buttonHover: {
//         color: '#00f2fe',
//         textShadow: '0 0 10px #00f2fe, 0 0 20px #00f2fe',
//     },
// };

// export default Navbar;
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css'; // Importing CSS for styles
import { FaHeart } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('uid') !== null;

    const handleLogout = () => {
        localStorage.removeItem('uid');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <div className="logo-circle">
                <FaHeart className="heart-icon" />
                </div>
                Healthcare
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li onClick={handleLogout}>Logout</li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
