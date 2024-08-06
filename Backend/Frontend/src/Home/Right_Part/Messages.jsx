import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage.js';
import Loading from '../../Components/Loading.jsx';
import useGetSocketMessage from '../../context/useGetSocketMessage.jsx';
const Messages = () => {
    const { loading,messages } = useGetMessage();
    // console.log("loading",loading);
    // console.log("Mess.", messages);
    useGetSocketMessage(); //listing incoming msg.
    const lastRefMsg = useRef();
    useEffect(() =>{
        setTimeout(() =>{
            if(lastRefMsg.current){
                lastRefMsg.current.scrollIntoView({ behaviour : "smooth" });
            }
        },100)
    },[messages])

    return (
        <>
        <div className='flex-1 overflow-y-auto' style={{minHeight:"calc(92vh - 10vh)"}}>

           {loading ? (<Loading />) : (messages.length > 0 && messages.map((message) =>(
            <div key={message.id} ref={lastRefMsg}>
                <Message message={message} />
            </div>
           )))}
           
           {!loading && messages.length === 0 && (
            <div>
                <p className='text-center mt-[20%]'>
                    Say! Hi to Start the Conversation.
                </p>
            </div>
           )}

        </div>
        </>
    )
}

export default Messages
