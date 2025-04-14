
import { Link } from 'react-router-dom';
import './App.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { signInWithGoogle } from './api/googleAuth';
import { useEffect } from 'react';

function App() {
  const getUser = () => {
    console.log(signInWithGoogle());
  };

  // Animate buttons on load
  useEffect(() => {
    const buttons = document.querySelectorAll('.home button');
    buttons.forEach((btn, index) => {
      (btn as HTMLElement).style.animation = `fadeInUp 0.5s ease-out ${index * 0.1 + 0.3}s forwards`;
    });
  }, []);

  return (
    <div className="home">
      <h2 className="hero-title">Personalized Healthcare Decision Support System</h2>
      <div className="button-group">
        <Link to="/login">
          <button className="btn-login">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn-signup">Signup</button>
        </Link>
        <button className="btn-google" onClick={getUser}>
          <span className="google-icon">G</span> Sign in with Google
        </button>
      </div>
      <div className="floating-shapes">
        <div className="shape circle"></div>
        <div className="shape triangle"></div>
        <div className="shape plus"></div>
        <div className="shape square"></div>
        <div className="shape wave"></div>
      </div>
    </div>
  );
}

export default App;