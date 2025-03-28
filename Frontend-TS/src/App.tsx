import { Link } from 'react-router-dom';
import './App.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {signInWithGoogle} from './api/googleAuth';
function App() {
    const getUser = () => {
        console.log(signInWithGoogle());
    };
    return (
        <div>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Signup</button>
            </Link>
            <button onClick={ getUser }>Sign in with Google</button>
        </div>
    );
}

export default App;