const express = require("express")
const app  = express()
const path = require("path")
const server = require("http").createServer(app)
const io = require("socket.io")(server,{cors:{origin:"*"}})
const users = {}

app.use("/static" , express.static("static"))
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
 

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "../views/chat.html"));
})

server.listen(80,()=>{
    console.log(`server runing on ${80}`);
})
    
    
    io.on("connection",socket=>{
        socket.on("new-user-joined" ,username=>{
            users[socket.id] = username;
            socket.broadcast.emit("user-joined",username) 
        })
        socket.on("send",message=>{
     socket.broadcast.emit("receive", { message : message , name : users[socket.id]} )       
            
        })
        socket.on("disconnect",()=>{
            socket.broadcast.emit("left", users[socket.id])
        })
       
    })
