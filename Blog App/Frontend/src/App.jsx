import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import "./App.css";
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import NewPostForm from "./AddBlogForm";
import HomePages from "./HomePages";




function App() {
  const title = "BLOGy";
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



  const [blogPosts, setBlogPosts] = useState([]);


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
 

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);



  return (
    <Router>
      <Header title={title} links={links} isLoggedIn={isLoggedIn}  />
      <Routes>
        <Route path="/profile" element={<MainContent blogPosts={blogPosts} setBlogPosts={setBlogPosts} />} />
        <Route path="/" element={<HomePages blogPosts={blogPosts}  />} />
        <Route path="/login" element={<LoginForm  />} />
        <Route path="/register" element={<SignUpForm  />} />
        {/* Protecting the new post route */}

      </Routes>
      <Footer title={title} />
    </Router>
    
  );
}

export default App;
