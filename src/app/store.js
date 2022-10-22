import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import postReducer from '../features/post/postSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ],
});

export default store