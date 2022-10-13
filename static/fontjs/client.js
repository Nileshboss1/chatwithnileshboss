const socket = io("http://localhost:80")

const form = document.getElementById("land")
const messageinput = document.getElementById("text")
const messagecontainer = document.querySelector(".chatbox")

const append = (message,position)=>{
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageElement.classList.add("message")
    messageElement.classList.add(position)
    messagecontainer.append(messageElement) 
}


function bhejo() {
const message = messageinput.value
console.log(message);
if(message.length > 0){
   append(`ME:  ${message}`,"right")
   document.getElementById("audio").play();
}
socket.emit("send",message)
messageinput.value = ""
}
const username = prompt("ENTER YOUR NAME")

socket.emit("new-user-joined", username )

socket.on("user-joined",username =>{
    let joinname = username.toUpperCase()
    append(`${joinname} Joined The Chat`, "left")
})

socket.on("left",username=>{
let finalname = username.toUpperCase()
    append(`${finalname} Left The Chat`,"left")
})

socket.on("receive" , data=>{
var naam = data.name
var finalnaam = naam.toUpperCase();
append(`${finalnaam}: ${data.message}`,"left")
document.getElementById("receive-audio").play()
   
})


