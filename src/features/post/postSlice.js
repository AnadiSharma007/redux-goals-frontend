import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { fetchPosts, createPost, updatePost, deletePost } from '../../api'

const initialState = {
    posts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const fetchAllPosts = createAsyncThunk('post/getall', async (_ , thunkAPI) => {
    try {
        return await fetchPosts()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createAPost = createAsyncThunk('post/create', async(postData, thunkAPI) => {
    try {
        return await createPost(postData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateAPost = createAsyncThunk('post/update', async ( id, updatedData, thunkAPI) => {
    try {
        return await updatePost(id, updatedData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const deleteAPost = createAsyncThunk('post/delete', async ( id, thunkAPI) => {
    try {
        return await deletePost(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{
        reset: (state) => state.initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllPosts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload.data
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(fetchAllPosts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createAPost.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createAPost.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.posts.push(action.payload)
        })
        .addCase(createAPost.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateAPost.pending, (state) => {
            state.isLoading = false
        })
        .addCase(updateAPost.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            console.log(action.payload)
            state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
        })
        .addCase(updateAPost.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteAPost.pending, (state) => {
            state.isLoading = false
        })
        .addCase(deleteAPost.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            console.log(action.payload)
            state.posts = state.posts.filter((post) => post._id !== action.payload.id)
        })
        .addCase(deleteAPost.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        

    },
  
    })


    export const {reset} = postSlice.actions
    export default postSlice.reducer