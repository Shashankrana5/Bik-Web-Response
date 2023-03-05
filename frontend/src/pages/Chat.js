import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ChatDetails } from "../components/ChatDetails";
import useChatContext from "../hooks/useChatContext"
import { ChatCreation } from "../components/ChatCreation";
import ChatNavigation from "../components/ChatNavigation";
import useMessageDisplayContext from "../hooks/useDisplayMessageContext";
import DisplayMessages from "../components/DisplayMessages";
import SendMessage from "../components/SendMessage";
import GroupChatCreationForm from "../components/GroupChatCreationForm.js"
import io from "socket.io-client";
import PersonalChat from "../components/PersonalChat";

const test_id = "";

const Chat = () => {


    const [user_id, setUser_id] = useState("");
    const { chats, chatDispatch } = useChatContext();
    var index = 0
    const loggedinUser = localStorage.getItem("user");
    const loggedinUserEmail = JSON.parse(loggedinUser).email
    
    // const fetchUserId = async(email) => {

    //     const response = await fetch("http://localhost:4000/api/users/fetchid/" + email);
        
    //     return response.then(res => res.json()).then(res => res)
    
    // }

    // useEffect(() => {
    //     const a = fetchUserId(loggedinUserEmail)
    //     console.log(a.then(e => {console.log(e)}))
        
    // }, [])

    const a = fetch("http://localhost:4000/api/users/fetchid/" + loggedinUserEmail).then(
        data => data.json()
    ).then(x => x._id)
    console.log(a.then(data => data))

    
    useEffect(() => {
        const fetchMessage = async () =>{
            
            const usersChatted = await fetch("http://localhost:4000/api/message/chatsemail", {
                method: "POST",
                body: JSON.stringify({email: loggedinUserEmail}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        const json = await usersChatted.json();


        chatDispatch({type: "SET_CHAT", payload: json["chats"]})
    }

        fetchMessage();
    }, [chatDispatch])


    return (
        <div className="chat">
            <Navbar />

            <GroupChatCreationForm user_id = {"las;kjdflasjdf"} loggedInUserEmail={loggedinUserEmail}/>

            <PersonalChat />
            
        </div>
    )
}

export default Chat;

