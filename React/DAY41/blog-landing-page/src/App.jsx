import { useState } from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function App() {
  const title = 'My Blog';
  const links = ['Home', 'Blogs', 'About Us', 'Contact Us'];
const [loginForm, setLoginForm] = useState(true)
  const [users,setUsers] = useState([
    {
      id: 1,
      username:'admin',
      email: 'example@example.com',
      password: 'password'
    },
  
  ]);
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'First Post', description: 'This is the description of the first post.' },
    { id: 2, title: 'Second Post', description: 'This is the description of the second post.' }
  ]);

  
  // State to manage authentication status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Function to handle login form submission
  const handleLoginSubmit = (userData) => {
    // Simulated authentication process
    const user = users.find(u => u.email === userData.email && u.password === userData.password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    } else {
      alert('Invalid email or password');
    }
  };
  
  // Function to handle sign-up form submission
  const handleSignUpSubmit = (userData) => {
    // Add new user to list of users
    userData.id = users.length++
    users.push(userData);
    setCurrentUser(userData);
    setIsLoggedIn(true);
    alert('Registration successful!');
    console.log(users);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <>
    
    <Header title={title} links={links} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      

      {!isLoggedIn && (
        <>
          {loginForm?<LoginForm onSubmit={handleLoginSubmit} setLoginForm={setLoginForm} />:
          <SignUpForm onSubmit={handleSignUpSubmit} setLoginForm={setLoginForm} />
          }
        </>
      )}
      {isLoggedIn && <MainContent blogPosts={blogPosts} setBlogPosts={setBlogPosts}  />}
      

      <Footer />
    </>
  );
}

export default App;
