import axios from 'axios'
import React from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit =async (data) => {
        const userinfo ={
            email:data.email,
            password:data.password
        };

        await axios.post("/api/user/login", userinfo)
        .then((response) =>{
            if(response.data){  
            setTimeout(()=>{
                window.location.reload();
                toast.success("Login Successfully") 
            },500) 
            }
            localStorage.setItem("ChatAppUser",JSON.stringify(response.data));
        })
        .catch((error) =>{
            if(error.response){
            toast.error("Error: " + error.response.data.error);
            }
        })
      }
  return (
    <>
            <div className='flex h-screen items-center justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} action='' className='border border-black px-6 py-2 rounded-md space-y-3 w-[25%]'>
                <h1 className='text-2xl text-center text-green-600 font-semibold py-2'>Chat App</h1>
                <h2 className='text-black font-bold py-2'>Login Form</h2>
               
                {/* email */}
                <label className="input input-bordered  my-2 flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Email" 
                     {...register("email", { required: true })}/>
                </label>
                <span className='text-red-600 font-semibold'>
                    {errors.email && <span>This field is required</span>}
                </span>
                {/* password */}
                <label className="input input-bordered  my-2 flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow"
                     {...register("password", { required: true })}/>
                </label>
                <span className='text-red-600 font-semibold'>
                    {errors.password && <span>This field is required</span>}
                </span>
                <div className='flex justify-between'>
                    <p className='py-2'>New User?
                    <Link to="/signup">
                        <span className='text-blue-800 underline'>Signup</span>
                    </Link>
                    </p>
                    <button type='submit' className='bg-green-600 py-2 px-4 border rounded-md'>
                        Login
                    </button>
                    
                    
                    
                </div>
                </form>
            </div>
        </>
        )
    }
export default Login
