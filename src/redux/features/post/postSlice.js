import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false
}

export const createPost = createAsyncThunk('post/createPost', async (params) => {
  try {
    const { data } = await axios.post('/posts', params)
    return data
  } catch (error) {
    console.log(error)
  }
}) 

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  try {
    const { data } = await axios.get('/posts')
    return data
  } catch (error) {
    console.log(error)
  }
}) 

export const deletePost = createAsyncThunk('/post/deletePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`)

    return data
    
  } catch (error) {
    console.log(error)
  }
})

export const updatePost = createAsyncThunk('/post/updatePost', async (updatepost) => {
  try {
    const { data } = await axios.put(`/posts/${updatepost._id}`, updatepost)

    return data
    
  } catch (error) {
    console.log(error)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // create post
    .addMatcher(
      (action) => action.type === createPost.pending.type,
      (state) => {
        state.isLoading = true;
      }
    )
    .addMatcher(
      (action) => action.type === createPost.fulfilled.type,
      (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload)
      }
    )
    .addMatcher(
      (action) => action.type === createPost.rejected.type,
      (state, action) => {
        state.isLoading = false;
      }
    )
    //get posts
    .addMatcher(
      (action) => action.type === getPosts.pending.type,
      (state) => {
        state.isLoading = true;
      }
    )
    .addMatcher(
      (action) => action.type === getPosts.fulfilled.type,
      (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.allPosts
        state.popularPosts = action.payload.popularPosts
      }
    )
    .addMatcher(
      (action) => action.type === getPosts.rejected.type,
      (state, action) => {
        state.isLoading = false;
      }
    )
    //remove posts
    .addMatcher(
      (action) => action.type === deletePost.pending.type,
      (state) => {
        state.isLoading = true;
      }
    )
    .addMatcher(
      (action) => action.type === deletePost.fulfilled.type,
      (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(post => post._id !== action.payload._id)
      }
    )
    .addMatcher(
      (action) => action.type === deletePost.rejected.type,
      (state, action) => {
        state.isLoading = false;
      }
    )
    //update posts
    .addMatcher(
      (action) => action.type === updatePost.pending.type,
      (state) => {
        state.isLoading = true;
      }
    )
    .addMatcher(
      (action) => action.type === updatePost.fulfilled.type,
      (state, action) => {
        state.isLoading = false;
        const index = state.posts.findIndex((post) => post._id === action.payload._id)
        state.posts[index] = action.payload
      }
    )
    .addMatcher(
      (action) => action.type === updatePost.rejected.type,
      (state, action) => {
        state.isLoading = false;
      }
    )
  }
})

export default postSlice.reducer