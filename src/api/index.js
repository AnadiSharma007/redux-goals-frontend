import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8000/'
})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('user')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }

    return req;
})


export const fetchPosts = () => API.get('/posts')
export const createPost = (postData) => API.post('/posts', postData)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const updatePost = (id, updatedData) => API.patch(`/posts/${id}`, updatedData)

export const signup = (formData) => API.post('/signup', formData)
export const signin = (formData) => API.post('/signin', formData)