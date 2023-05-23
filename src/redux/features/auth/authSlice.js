import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null
}

export const registerUser = createAsyncThunk('auth/registerUser', async ({ username, password }) => {
  try {
    const { data } = await axios.post('/auth/register', {
      username,
      password
    })

    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }
    
    return data
  } catch (error) {
    console.log(error)
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
  try {
    const { data } = await axios.post('/auth/login', {
      username,
      password
    })
    
    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }

    return data
  } catch (error) {
    console.log(error)
  }
})

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('/auth/me')

    return data
  } catch (error) {
    console.log(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addMatcher(
        (action) => action.type === registerUser.pending.type,
        (state) => {
          state.isLoading = true;
          state.status = null;
        }
      )
      .addMatcher(
        (action) => action.type === registerUser.fulfilled.type,
        (state, action) => {
          state.isLoading = false;
          state.status = action.payload.message;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addMatcher(
        (action) => action.type === registerUser.rejected.type,
        (state, action) => {
          state.status = action.payload.message;
          state.isLoading = false;
        }
      )
      // login
      .addMatcher(
        (action) => action.type === loginUser.pending.type,
        (state) => {
          state.isLoading = true;
          state.status = null;
        }
      )
      .addMatcher(
        (action) => action.type === loginUser.fulfilled.type,
        (state, action) => {
          console.log('slice', action);
          state.isLoading = false;
          state.status = action.payload.message;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addMatcher(
        (action) => action.type === loginUser.rejected.type,
        (state, action) => {
          console.log('slice', action);
          state.status = action.payload.message;
          state.isLoading = false;
        }
      )
      // get me
      .addMatcher(
        (action) => action.type === getMe.pending.type,
        (state) => {
          state.isLoading = true;
          state.status = null;
        }
      )
      .addMatcher(
        (action) => action.type === getMe.fulfilled.type,
        (state, action) => {
          state.isLoading = false;
          state.status = null;
          state.user = action.payload?.user;
          state.token = action.payload?.token;
        }
      )
      .addMatcher(
        (action) => action.type === getMe.rejected.type,
        (state, action) => {
          state.status = action.payload.message;
          state.isLoading = false;
        }
      );
  },
});

export const checkIsAuth = state => Boolean(state.auth.token)

export const { logout } = authSlice.actions

export default authSlice.reducer
