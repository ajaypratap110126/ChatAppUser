import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import useSendMessage from '../../context/useSendMessage.js';

const TypeSend = () => {
    const [message, setMessage] =useState("");
    const {loading, sendMessage} = useSendMessage()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await sendMessage(message);
        setMessage("");
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
            <div className='flex space-x-2 bg-slate-500 px-5 py-1 h-[8vh]text-center'>
                <div className='w-[70%]'>
                    <input type="text" 
                        placeholder="Type your messages here..." 
                        className="border border-gray-700 outline-none rounded w-full py-2 px-4 mt-1 text-black font-semibold" 
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        />
                </div>
                
                <button>
                    <IoIosSend className=' text-4xl border rounded-full hover:bg-slate-800 cursor-pointer' />
                </button>
                
            </div>
            </form>
        </>
    )
}

export default TypeSend
