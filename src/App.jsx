import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Signin from './pages/signin'
import Signup from './pages/signup'

function App() {

 

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
