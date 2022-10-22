

//Login/Signin
const signIn = async (userData) => {
    const response = await signin(userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data

}

//Register/Signup
const signUp = async (userData) => {
    const response = await signup(userData);

    try{

        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
        }
    }
    catch(error){
        console.log(error.message)
    }

    return response.data
}

//Logout
const logout = () => {
    localStorage.removeItem('user')
}

const userService = {
    signIn,
    signUp,
    logout
}

export default userService