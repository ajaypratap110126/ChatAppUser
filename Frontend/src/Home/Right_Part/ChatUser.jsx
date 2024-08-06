import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import { CiMenuFries } from 'react-icons/ci';

const ChatUser = () => {
    const {selectedConversation} = useConversation();
  const {onlineUsers} = useSocketContext();

  const getOnlineUserStatus = ((userId) => {
    return onlineUsers.includes(userId) ? "Online": "Offline";
  })
    return (
   <>
   <div className='relative flex items-center  justify-center  h-[8%]  gap-4 bg-slate-800 hover:bg-slate-400'>
        <label
        htmlFor='my-drawer-2'
        className='btn btn-ghost drawer-button lg:hidden absolute left-4'
        >
          <CiMenuFries className='text-white text-3xl '
          />
        </label>
    <div className='flex space-x-3 px-5 py-2 bg-slate-800 hover:bg-slate-700 duration-300 cursor-pointer rounded h-[10vh]'>
            <div className="avatar">
                <div className="w-16 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
                
            </div>
            <div>
                <h1 className='font-bold'>{selectedConversation.fullname}</h1>
                {/* <span>aj110@gmail.com</span> */}
                <span>{getOnlineUserStatus(selectedConversation._id)}</span>
            </div>
        </div>
        </div>
   </>
  )
}

export default ChatUser
