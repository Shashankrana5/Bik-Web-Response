import { useState } from "react";
import io, { Socket } from "socket.io-client"
import useDisplayMessageContext from "../hooks/useDisplayMessageContext";
import DisplayMessages from "./DisplayMessages";

const SendMessage = () => {
    
    const socket = io.connect("http://localhost:9000", {query: `name=${JSON.parse(localStorage.getItem("user")).email}`})

    const [messageToSend, setMessageToSend] = useState("");
    const {displayMessages, displaymessagesDispatch}  = useDisplayMessageContext();
    const loggedinUser =  localStorage.getItem("user");
    const senderEmail = JSON.parse(loggedinUser).email

    if (displayMessages){
        const receiverEmail = (displayMessages[0].senderEmail == senderEmail) ? displayMessages[0].receiverEmail : displayMessages[0].senderEmail;
    }
    const handleSubmit = (e) => {
        e.preventDefault()        
        
    }       

  return (
    <div className="message-send">
      <label>Add something to say to the other user:</label>
      <input type="text" placeholder="Say something" onChange = {e => setMessageToSend(e.target.value)} />
      <button type = "submit" onClick = {handleSubmit}>Send</button>
    </div>
  );
};

export default SendMessage;
