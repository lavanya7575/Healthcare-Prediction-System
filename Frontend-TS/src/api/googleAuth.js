import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBxW-pxmhvfr4t3521PW6SONooqZ07J3Ms",
    authDomain: "personalized-healthcare-system.firebaseapp.com",
    projectId: "personalized-healthcare-system",
    storageBucket: "personalized-healthcare-system.firebasestorage.app",
    messagingSenderId: "991628660845",
    appId: "1:991628660845:web:19704c336a5a2f99b9af64"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
// Function to sign in with Google
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken; //Optional
        const user = result.user;
        console.log("Signed in with Google:", user);
        console.log("User UID:", result.user.uid); // Get UID
        localStorage.setItem('uid', result.user.uid);
        // Redirect to your desired page after successful login
        window.location.href = "/home";
        return user; //example
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        //Handle the error appropriately (e.g., display an error message to the user)
        alert("There was a problem signing in with Google.");
    }
}

export { signInWithGoogle };
