    import {
        createSlice,
        createAsyncThunk,
        isRejectedWithValue,
    } from "@reduxjs/toolkit";
    import axios from "axios";
    const initialState = {
        posts: [],
        loading: false,
        error: null,
    };
    import Swal from "sweetalert2";
    
    export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
        const response = await axios.get("http://localhost:3000/api/posts/");
        return await response.data;
    });
    
    export const createPost = createAsyncThunk("posts/createPost", async (data) => {
        try {
        const post = data
        console.log("checki",post);
        const response = await axios.post("http://localhost:3000/api/posts", post);
        console.log(response.data);
        return response.data;
        } catch (error) {
        isRejectedWithValue(error.response.data);
        }
    });
    
    export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
        console.log(id);
        const response = await axios.delete(`http://localhost:3000/api/posts/${id}`);
        return response.data;
    });
    
    export const updatePost = createAsyncThunk("posts/updatePost",async (data) => {
        console.log('Hello',data);
        const myUpdatedPost = data.NewPost
        const response = await axios.put(`http://localhost:3000/api/posts/${data.id}`,myUpdatedPost);
        return response.data;
        }
    );
    
    const postsSlice = createSlice({
        name: "posts",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
        //! Fetching posts from the server side
        builder
            .addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
            console.log("state.loading : " + state.loading);
            console.log("state.error : " + state.error);
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            console.log("state.loading : " + state.loading);
            console.log("state.error : " + state.error);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log("state.loading : " + state.loading);
            console.log("state.error : " + state.error);
            })
            // ! create a new post
            .addCase(createPost.pending, (state) => {
            state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            })
            .addCase(createPost.rejected, (state, action) => {
            state.loading = false;
            console.log("=================action.error===================");
            console.log(action);
            console.log("====================================");
            state.error = action.error;
            })
            //
            // ! Delete posts
            .addCase(deletePost.pending, (state) => {
            state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            console.table("action.payload : " + action.payload.headers);
            state.posts = action.payload;
            })
            .addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            })
            //
            //
            //! Update posts
            .addCase(updatePost.pending, (state) => {
            state.loading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            })
            .addCase(updatePost.rejected, (state) => {
            state.loading = false;
            state.error = action.error.message;
            });
        },
    });
    
    export const selectPosts = (state) => state.posts.posts;
    export const selectLoading = (state) => state.posts.loading;
    export const selectError = (state) => state.posts.error;
    export default postsSlice.reducer;