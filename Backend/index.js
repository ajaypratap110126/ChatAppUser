import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"
import { app, server } from "./SocketIO/server.js";
import path from "path";

dotenv.config();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors())

const PORT = process.env.PORT || 5001;
const URI = process.env.Mongodb_URI;

// app.get('/', (req, res) => {
//   res.send('Hello World Ajay!')
// })

try {
  mongoose.connect(URI,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true, 
  });
  console.log("Connected to MongooseDb");
} catch (error) {
  console.log(error);
}

//Router
app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);

// --------Code For Deployement -------
if(process.env.NODE_ENV === 'production'){
  const dirPath = path.resolve();

  app.use(express.static("./Frontend/dist"));
  app.get("*", (req,res) =>{
    res.sendFile(path.resolve(dirPath, "./Frontend/dist", "index.html"));
  })
}

//Server
server.listen(PORT, () => {
  console.log(`Sever is listening on port ${PORT}`)
})