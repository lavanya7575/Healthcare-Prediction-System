import { Link } from 'react-router-dom';
import './App.css';


function App() {
    return (
        <>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Signup</button>
            </Link>
        </>
    );
}

export default App;