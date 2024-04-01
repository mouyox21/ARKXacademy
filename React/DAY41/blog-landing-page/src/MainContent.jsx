import React, { useState } from 'react';
import Card from './Card';
import EditModal from './EditModal';


function MainContent({ blogPosts, setBlogPosts }) {
  const [editingPostId, setEditingPostId] = useState(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);

  const handleDelete = (id) => {
    setBlogPosts(prevPosts => prevPosts.filter(post => post._id !== id));
  };

  const handleEdit = (id) => {
    setEditingPostId(id);
  };

  const handleSaveEdit = (id, newTitle, newcontent) => {
    setBlogPosts(prevPosts =>
      prevPosts.map(post => {
        if (post._id === id) {
          return {
            ...post,
            title: newTitle,
            content: newcontent
          };
        }
        return post;
      })
    );
    setEditingPostId(null);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setIsAddingBlog(false);
  };

  const handleAddBlog = () => {
    setIsAddingBlog(true);
  };

  const handleSaveAddBlog = (newTitle, newcontent) => {
    const newId = Date.now(); // Generate a unique ID
    const newBlogPost = {
      id: newId,
      title: newTitle,
      content: newcontent
    };
    setBlogPosts(prevPosts => [...prevPosts, newBlogPost]);
    setEditingPostId(null);
    setIsAddingBlog(false);
  };

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Welcome to Our Blogs App</h1>
      <button onClick={handleAddBlog} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Blog</button>
      {(isAddingBlog || editingPostId !== null) && (
        <EditModal
          title={isAddingBlog ? '' : blogPosts.find(post => post._id === editingPostId)?.title || ''}
          content={isAddingBlog ? '' : blogPosts.find(post => post._id === editingPostId)?.content || ''}
          onSave={isAddingBlog ? handleSaveAddBlog : (newTitle, newcontent) => handleSaveEdit(editingPostId, newTitle, newcontent)}
          onCancel={handleCancelEdit}
        />
      )}
      {blogPosts.length > 0 ? (
        <ul className="grid grid-cols-4 gap-4">
          {blogPosts.map(post => (
            <div key={post._id}>
              <Card
                title={post.title}
                content={post.content}
                onDelete={() => handleDelete(post._id)}
                onEdit={() => handleEdit(post._id)}
              />
            </div>
          ))}
        </ul>
      ) : (
        <p>No posts found</p>
      )}

   
    </main>
  );
}

export default MainContent;
