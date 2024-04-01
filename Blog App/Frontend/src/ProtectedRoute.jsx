import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial authentication state

    const login = () => {
        // Simulate login logic (replace with your actual authentication flow)
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return (
        <div>
            <h2>You are not logged in!</h2>
            <button onClick={login}>Login</button>
        </div>
        );
    }

  return children; // Render the protected component if authenticated
}