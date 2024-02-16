// models/post.js
const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, '../data/posts.json');

// Function to read all posts from the JSON file
function getAllPosts() {
    const postsData = fs.readFileSync(postsFilePath, 'utf8');
    return JSON.parse(postsData);
}

// Function to create a new post
function createPost(newPost) {
    const posts = getAllPosts();
    newPost.id =posts.length + 1;
    posts.push(newPost);
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
    return newPost;
}

// Function to get a post by ID
function getPostById(id) {
    const posts = getAllPosts();
    return posts.find(post => post.id === id);
}

// Function to update a post by ID
function updatePostById(id, updatedPost) {
    const posts = getAllPosts();
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
        posts[index] = { ...posts[index], ...updatedPost };
        fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
        return posts[index];
    }
    return null;
}

// Function to delete a post by ID
function deletePostById(id) {
    const posts = getAllPosts();
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
        const deletedPost = posts.splice(index, 1);
        fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
        return deletedPost[0];
    }
    return null;
}

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePostById,
    deletePostById
};
