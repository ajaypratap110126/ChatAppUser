import { createContext, useContext, useEffect, useState } from 'react'
import {useAuth} from './AuthProvider'
import io from "socket.io-client";
const socketContext = createContext()

// it's a hook
export const useSocketContext = ()=>{
    return useContext(socketContext)
}

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [authUser] = useAuth()
    console.log('authUser', authUser);

    useEffect(() =>{
        if(authUser){
            const socket = io("https://chatapp-dt.onrender.com", {
                query: {
                    userId: authUser.user._id,
                },
            });
            // console.log(socket);
            setSocket(socket);
            socket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users)
            })
            return ()=> socket.close();
        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    )
}