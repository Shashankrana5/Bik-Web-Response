import { useEffect, useState } from "react"
import io from "socket.io-client"

export const TestingChat = () => {

    // var userId = null;
    const socket = io.connect("http://localhost:9000", {query: `name=${JSON.parse(localStorage.getItem("user")).email}`})
 

    const [name, setName] = useState("")
    const [currentMessage, setCurrentMessage] = useState('')
    const [receiver, setReceiver] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()

        socket.emit("send-message", {name: name, receiver: receiver, message: currentMessage})
        
    }

    useEffect(() => {

        socket.on("receive-message", data => {
            console.log("here")
            console.log(data.message)
        })

    }, [socket])

    return (
        <div className="chat">
         <h2>testing chat</h2>
         <input placeholder = "name" onChange={e => setName(e.target.value)}/>
         <div className="display-message">
        <input onChange = {e => setReceiver(e.target.value)} placeholder = "reciver" />
        <input type = "text" onChange={e => setCurrentMessage(e.target.value)}/>
         <button type ="submit" onClick={handleSubmit}>SEND</button>
         </div>
        </div>
    )

}
