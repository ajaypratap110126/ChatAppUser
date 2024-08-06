import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from '../../context/useGetAllUsers';
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';

const Search = () => {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!search) return;
      const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
      // console.log("con..",conversation);
      );

      if(conversation){
        setSelectedConversation(conversation);
        setSearch("");
      }else{
        toast.error("User not Found");
      }
    
  };
  return (
    <>
      <div className='h-[10vh]'>
        <div className='px-3 py-3'>
          <form onSubmit={handleSubmit}>
          <div className='flex space-x-3 '>
            <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg p-2 flex items-center gap-2 w-[80%]">
              <input type="text" className="grow py-1 text-black font-medium text-1xl outline-none bg-white rounded " 
              placeholder="Search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <FaSearch className='text-5xl py-3 hover:bg-slate-600 rounded-full duration-300' onClick={handleSubmit}/>
          </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default Search
