import { Server } from "socket.io";
import http from 'http';
import express from 'express';
// import {io} from "socket.io-client";


const app =express();

const server = http.createServer(app);
const io = new Server(server,{
            cors:{
                origin: "http://localhost:3002",
                methods: ["GET", "POST"],
                // credentials: true
            },

});

// Realtime message code is goes from here
export const getRecevierSocketId = (receiverId) =>{
    return users[receiverId];
}

const users = {};
io.on("connection", (socket) => {
    console.log("a user is connected", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId]=socket.id;
        console.log("Hlo Users", users);
    }

    // used to send the events to all connected users
    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
        console.log("a user disconneted", socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    })
})

export {app, io, server}