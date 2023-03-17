import { useState, useEffect } from 'react';
import * as io from "socket.io-client";

interface SendMessageProps {
    currentChat: string;
    currentLoggedinUser: string
    displayChatContentDispatch: any
    displayChatContents: any
    personalChat: boolean
}

const SendMessage = (props: SendMessageProps) => {

    const currentChat = props.currentChat;
    const currentLoggedinUser = props.currentLoggedinUser;
    const [personalChatSocket, setPersonalChatSocket ] = useState(null);
    const [content, setContent] = useState("")
    const displayChatContentDispatch = props.displayChatContentDispatch;
    const displayChatContents = props.displayChatContents
    const personalChat = props.personalChat;
    const [socketConnection, setSocketConnection] = useState(null);


    useEffect(() => {
        if (currentLoggedinUser){
        setPersonalChatSocket(io.connect("http://localhost:9000/personalchat", {
            // query: `name=${JSON.parse(localStorage.getItem("user")).email}`,
            query: {name: currentLoggedinUser}
            
        }))
    
        setSocketConnection(io.connect("http://localhost:9000/groupchat", {
            query: {senderEmail: currentLoggedinUser}
        }))
    }
    }, [currentLoggedinUser])

    useEffect(() => {
        if (personalChatSocket){
        personalChatSocket.on("receive-personal-message", data => {
            console.log(data);
            displayChatContentDispatch({type: "CREATE_CHAT_CONTENT", payload: data})
        })}
    }, [personalChatSocket])


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (displayChatContents) {
            const receiverEmail =
            
              displayChatContents[0].senderEmail === currentLoggedinUser
                ? displayChatContents[0].receiverEmail
                : displayChatContents[0].senderEmail;
            const messageData = { receiverEmail, currentLoggedinUser, content, type: "personal" };
       
            const response = await fetch("http://localhost:4000/api/message/sendmessage", {
                method: "POST",
                body: JSON.stringify({
                  receiverEmail: receiverEmail,
                  senderEmail: currentLoggedinUser,
                  content: content,
                  messageType: "personal"
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            const json = await response.json();
            personalChatSocket.emit("send-personal-message", json);

              displayChatContentDispatch({
                type: "CREATE_CHAT_CONTENT",
                payload: json,
              });
        }
    }

    // useEffect( () => {
        
    //     if (socketConnection && currentChat){
    //         socketConnection.emit("join-groupchat", currentChat)

    //         socketConnection.on("receive-groupchat-message", data => {
    //             displayChatContentDispatch({type: "CREATE_CHAT_CONTENT", payload: data})
    //         })
    //     }

    // }, [currentChat, socketConnection])

    useEffect(() => {

        if (currentChat){
            socketConnection.emit("join-groupchat", currentChat)

        }

    }, [currentChat])

    useEffect(() => {
        if (socketConnection){
            socketConnection.on("receive-groupchat-message", data => {
                displayChatContentDispatch({type: "CREATE_CHAT_CONTENT", payload: data})
            })}
    }, [socketConnection])

    // }, [socketConnection])

    const handleGroupSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
//         {groupId: '6414161c206aadc12aff2ba6', messageType: 'group', content: 'third', _id: '6414256e4f70ad273fcaca4b', 
// createdAt: '2023-03-17T08:31:42.572Z', …}
// content
// : 
// "third"
// createdAt
// : 
// "2023-03-17T08:31:42.572Z"
// groupId
// : 
// "6414161c206aadc12aff2ba6"
// messageType
// : 
// "group"
// updatedAt
// : 
// "2023-03-17T08:31:42.572Z"
// __v
// : 
// 0
// _id
// : 
// "6414256e4f70ad273fcaca4b"
        try{
            if (currentChat && content){
                const response = await fetch("http://localhost:4000/api/message/sendmessage",{
                    method: "POST",
                    body: JSON.stringify({content, senderEmail: currentLoggedinUser, groupId: currentChat}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const json = await response.json()
                console.log(json)
                socketConnection.emit("send-groupchat-message", json)
                displayChatContentDispatch({type: "CREATE_CHAT_CONTENT", payload: json})

    }
    }catch(err){
        throw Error(err);
    }
    }

    if (personalChat){
    return (
        <div className="submit-message-main">
            <form>
                <input placeholder="write something" onChange={e => setContent(e.target.value)}/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )}
    else{
        return(<div className="submit-message-main">
        <form>
            <input placeholder="write something" onChange={e => setContent(e.target.value)}/>
            <button onClick={handleGroupSubmit}>Submit</button>
        </form>
    </div>)
    }
}

export default SendMessage;