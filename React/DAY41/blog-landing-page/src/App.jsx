import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import "./App.css";
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import NewPostForm from "./AddBlogForm"; // Import the NewPostForm component








function App() {
  const title = "My Blog";
  // const links = ['Home', 'Blogs', 'About Us', 'Contact Us'];

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/aboutus",
    },
  ];

  const [users, setUsers] = useState([]);

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from API when the component mounts
    fetchBlogUser();
  }, []);
  useEffect(() => {
    // Fetch blog posts from API when the component mounts
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchBlogUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/userq");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSubmit = (userData) => {
    const user = users.find(
      (u) => u.email === userData.email && u.password === userData.password
    );
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      navigate("/")

    } else {
      alert("Invalid email or password");
    }
  };

  const handleSignUpSubmit = (userData) => {
    userData.id = users.length + 1; // Increment the id correctly
    setUsers([...users, userData]); // Update state immutably
    setCurrentUser(userData);
    setIsLoggedIn(true);
    alert("Registration successful!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Header title={title} links={links} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MainContent blogPosts={blogPosts} setBlogPosts={setBlogPosts} />} />
        <Route path="/login" element={<LoginForm onSubmit={handleLoginSubmit} />} />
        <Route path="/register" element={<SignUpForm onSubmit={handleSignUpSubmit} />} />
        {/* Protecting the new post route */}
        {isLoggedIn ? (
          <Route path="/new-post" element={<NewPostForm setBlogPosts={setBlogPosts} />} />
        ) : (
          <Route path="/new-post"  />
        )}
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
