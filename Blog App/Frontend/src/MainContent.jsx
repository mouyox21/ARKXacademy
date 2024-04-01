import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import EditModal from './EditModal';
import { fetchPosts, createPost, deletePost, updatePost } from './PostsSlice';
import Swal from 'sweetalert2';

function MainContent() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleDelete = (id) => {
    dispatch(deletePost(id))
  };

  const handleEdit = (id) => {
    setEditingPostId(id);
  };

  const handleSaveEdit = (id, newTitle, newContent) => {
    const NewPost ={title: newTitle, content: newContent}
    console.log('new poooost');
    console.log(NewPost);
    dispatch(updatePost({id, NewPost }));
    setEditingPostId(null);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setIsAddingBlog(false);
  };

  const handleAddBlog = () => {
    setIsAddingBlog(true);
  };

  const handleSaveAddBlog = (title, content) => {
    dispatch(createPost({ title, content }))
    setIsAddingBlog(false);
  };

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Welcome to Our Blogs App</h1>
      <button onClick={handleAddBlog} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Add Blog
      </button>
      {(isAddingBlog || editingPostId !== null) && (
        <EditModal
          title={isAddingBlog ? '' : posts.find(post => post._id === editingPostId)?.title || ''}
          content={isAddingBlog ? '' : posts.find(post => post._id === editingPostId)?.content || ''}
          onSave={isAddingBlog ? handleSaveAddBlog : (newTitle, newContent) => handleSaveEdit(editingPostId, newTitle, newContent)}
          onCancel={handleCancelEdit}
        />
      )}
      {posts.length > 0 ? (
        <ul className="grid grid-cols-4 gap-4">
          {posts.map(post => (
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
