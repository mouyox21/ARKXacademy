import React, { useState } from "react";

function AddBlogForm({ setBlogPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      description,
    };
    setBlogPosts((prevPosts) => [...prevPosts, newPost]); 
    setTitle("");
    setDescription("");
    
  };

  return (
<pre className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
  <form className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" onSubmit={handleSubmit} aria-label="Global">
    <label className="flex-none text-xl font-semibold dark:text-white" htmlFor="title">Title:</label>
    <input value={title}
        onChange={(e) => setTitle(e.target.value)} className="mt-1 mb-5 px-2 py-1 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-gray-600" type="text" id="title" name="title" />
    <label className="flex-none text-xl font-semibold dark:text-white" htmlFor="description">Description:</label>
    <textarea value={description}
        onChange={(e) => setDescription(e.target.value)}
      className="mt-1 mb-5 px-2 py-1 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-gray-600" id="description" name="description" rows="4"></textarea>
    <button className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="submit">Submit</button>
  </form>

</pre>

  );
}

export default AddBlogForm;
