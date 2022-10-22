import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userService from './userService'

const user = JSON.parse(localStorage.getItem('user'))

//Initial state 
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

//Signin/Login the User
export const signin = createAsyncThunk('user/singin', async (user, thunkAPI) => {
    try {
        return await userService.signIn(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Signup/Register the User
export const signup = createAsyncThunk('user/signup', async (user, thunkAPI) => {
    try {
        return await userService.signUp(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout the User
export const logout = createAsyncThunk('user/logout', () => {
    userService.logout()
})


export const userSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signin.pending, (state) => {
            state.isLoading = true
        })
        .addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload            
        })
        .addCase(signin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(signup.pending, (state) => {
            state.isLoading = true
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload            
        })
        .addCase(signup.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout, (state) => {
            state.user=null
        })
        

    }
})

export const {reset} = userSlice.actions
export default userSlice.reducer