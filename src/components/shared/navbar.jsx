import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, logout } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)

    const onButtonClick = () => {
        try {
            if(user){
                dispatch(logout())
            }
            
            dispatch(reset())
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className="flex justify-end mt-4 mx-auto w-[80vw] ">
        <button onClick={onButtonClick}>Logout</button>
    </div>
  )
}

export default Navbar