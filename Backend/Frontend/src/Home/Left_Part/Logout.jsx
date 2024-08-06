import axios from 'axios';
import React, { useState } from 'react'
import { RiLogoutCircleFill } from "react-icons/ri";
import Cookies from "js-cookie" 
import toast from 'react-hot-toast';
const Logout = () => {
    const [loading, setLoading] = useState();
    const handleLogout = async () =>{
        setLoading(true);
        try {
            const res = await axios.post("/api/user/logout");
            localStorage.removeItem("ChatAppUser");
            Cookies.remove("jwt");
            setLoading(false)
            toast.success("User is Logout Successfully!")
            window.location.reload();
        } catch (error) {
            console.log("Error in Logout:", error);
            toast.error("Error in Logout!")
        }
    }

    return (
        <>
            <div className='py-4 px-8 flex h-[8vh] font-bold text-4xl rounded-md
             hover:bg-slate-400 hover:text-red-700 cursor-pointer'
             onClick={handleLogout}
             >
                <RiLogoutCircleFill />
                <h1 className='text-2xl'>
                    Logout
                </h1>
            </div>
        </>
    )
}

export default Logout
