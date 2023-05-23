import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../utils/axios'
const initialState = {
  comments: [],
  loading: false
}

export const createComment = createAsyncThunk('/comment/createComment', async ({ postId, comment }) => {
  try {
    console.log(postId, comment)
    const { data } = await axios.post(`/comment/:${postId}`, { postId, comment })
    
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getPostComments = createAsyncThunk('/comment/getPostComments', async (postId) => {
  try { 
    const { data } = await axios.get(`/posts/comments/${postId}`)

    return data
  } catch (error) {
    console.log(error)
  }
})

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //create comment
      .addMatcher(
        (action) => action.type === createComment.pending.type,
        (state) => {
          state.loading = false
        }
      )
      .addMatcher(
        (action) => action.type === createComment.fulfilled.type,
        (state, action) => {
          state.loading = true
          state.comments.push(action.payload)
        }
      )
      .addMatcher(
        (action) => action.type === createComment.rejected.type,
        (state) => {
          state.loading = false
        }
    )
    //get post comments
      .addMatcher(
        (action) => action.type === getPostComments.pending.type,
        (state) => {
          state.loading = false
        }
      )
      .addMatcher(
        (action) => action.type === getPostComments.fulfilled.type,
        (state, action) => {
          state.loading = true
          state.comments = action.payload
        }
      )
      .addMatcher(
        (action) => action.type === getPostComments.rejected.type,
        (state) => {
          state.loading = false
        }
      )
    }
})

export default commentSlice.reducer