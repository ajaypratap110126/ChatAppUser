import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import axios from 'axios';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
  const {messages, setMessage,selectedConversation} = useConversation();
  
  const sendMessage = async(message)=>{
    setLoading(true);
      try {
        const res = await axios.post(`/api/message/send/${selectedConversation._id}`,
            {message}
        );
        console.log("res", res);
        setMessage([...messages, res.data.newMessage]);
        setLoading(false);
      } catch (error) {
        console.log("Error in send Messages:"+error);
        setLoading(false);
      }
    }

  return{loading, sendMessage};
}

export default useSendMessage;
