import React from 'react'

const Message = ({message}) => {
    const authUser = JSON.parse(localStorage.getItem("ChatAppUser"))
    const itsme = message.senderId === authUser.user._id;
    // console.log("Hi Message",message.senderId);
    // console.log("authUser",authUser.user._id);
    // console.log("itsme",itsme);
     const chatName = itsme ? "chat-end" : "chat-start";
     const chatColor = itsme ? "bg-blue-600" : "bg-yellow-700";
    
    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([],{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
     return (
        <>
            <div className={`chat ${chatName}`}>
                <div className={`chat-bubble chat-bubble-primary ${chatColor}`}>{message.message}</div>
                <div className='chat-footer'>
                    {formattedTime}
                </div>
            </div>
            
            {/* <div className="chat ">
                <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
            </div> */}
        </>
    )
}

export default Message
