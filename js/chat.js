const express = require("express")
const app  = express()
const path = require("path")
const server = require("http").createServer(app)
const io = require("socket.io")(server,{cors:{origin:"https://chatwithnileshboss.herokuapp.com/", methods: ["GET", "POST"],
allowedHeaders: ["my-custom-header"],
credentials: true}})
const users = {}
const port = process.env.PORT || 80

app.use("/static" , express.static("static"))
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
 

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "../views/chat.html"));
})

server.listen(port,()=>{
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
