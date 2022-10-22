import React, { useState } from 'react'
import {FormLabel, Input} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { signin, reset } from '../features/user/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';

const Signin = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {email, password} = formData;

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.user)

  useEffect(() => {
    if(isError){
      setError(message)
    }

    if(isSuccess || user){
      navigate('/');
    }

    dispatch(reset())

  }, [user, isSuccess, isError, message, navigate, error, dispatch])

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  } 

  const handleSubmit =  (e) => {
      e.preventDefault();

      try {
        const userData = {
          email,
          password
        }

        dispatch(signin(userData))
        
      } catch (error) {
        console.error(error.message);
      }
        
  };


  return (
    <div className="flex flex-col items-center h-screen">
    <div className="flex flex-col gap-10 items-center justify-center w-[80vw] m-auto">
      {error && (
        <div className='text-red-500'>
          {error}
        </div>
      )}
      <h1 className="font-bold text-3xl">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
        <div>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" name="email" onChange={handleChange} />
        </div>
        <div>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" name="password" onChange={handleChange}/>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="border-2 border-black rounded-lg bg-fuchsia-700 py-4 px-6"
          >
            {isLoading ? "loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signin