import React from 'react'
import Left from './Home/Left_Part/Left'
import Right from './Home/Right_Part/Right'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { useAuth } from './context/AuthProvider'
import { Route, Routes } from "react-router"
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [authUser, setAuthUser] = useAuth()
  console.log("??", authUser);
  return (
    <>
      <Routes>
        <Route path='/' element={
          authUser ? (
            // <div className='flex h-screen'>
            //   <Left />
            //   <Right />
            // </div>
            <div className="drawer lg:drawer-open">
              <input 
                id="my-drawer-2" 
                type="checkbox" 
                className="drawer-toggle" 
              />
              <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                
                <Right />
              </div>
              <div className="drawer-side " style={{"overflow": "hidden"}}>
                <label 
                  htmlFor="my-drawer-2" 
                  aria-label="close sidebar" 
                  className="drawer-overlay"
                >

                </label>
                <ul className="menu w-80 min-h-full bg-black text-base-content">
                  {/* Sidebar content here */}
                  <Left />
                </ul>
              </div>
            </div>
          ) : (
            <Navigate to={"/login"} />
          )
        } />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
