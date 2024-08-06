import React, { useContext, useEffect } from 'react'
import ChatUserInfo from './ChatUserInfo'
import Messages from './Messages'
import TypeSend from './TypeSend'
import useConversation from '../../zustand/useConversation.js'
import { useAuth } from '../../context/AuthProvider'
import {CiMenuFries} from "react-icons/ci";

const Right = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  
  useEffect(()=>{
    return setSelectedConversation(null)
  },[setSelectedConversation]);
  
  console.log("selectedConversation", selectedConversation);
  const NoChatSelected = () =>{
    const [authUser] = useAuth();
    return(
      <div className='relative flex h-[8%] gap-4 justify-center bg-slate-800 hover:bg-slate-700'>
        <label
        htmlFor='my-drawer-2'
        className='btn btn-ghost drawer-button lg:hidden absolute left-5'
        >
          <CiMenuFries className='text-white text-3xl'
          />
        </label>
      <div className='flex h-screen items-center justify-center'>
      <h1 className='text-center'>
        Welcome 
        <span className='font-bold ml-2'>
          {authUser.user.fullname}
        </span>
        <br />
        No Chat Selected, Please start conversation by selecting anyone to
        <span className='text-1xl font-bold ml-2'>
          Your Chat Contacts
        </span>
      </h1>
      </div>
      </div>
      
    )
  }

  return (
    <div className='w-full bg-slate-900 text-gray-300'>
    <div>
      {
        !selectedConversation ? (<NoChatSelected />): (
        <>
          <ChatUserInfo />
          <div className='flex-1 overflow-y-auto' style={{maxHeight:"calc(92vh - 10vh)"}}>
            <Messages />
          </div>
          <TypeSend />
          
        </>)
      }
      </div>
      </div>
  )
}

export default Right;


