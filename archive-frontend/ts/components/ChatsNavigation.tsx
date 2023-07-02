// import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext"
import { useEffect } from 'react';
import useChatsContext from '../hooks/useChatsContext';

const ChatsNavigation = ({chats, chatsDispatch, personalChat, displayChatContentDispatch, setCurrentChat}) => {
    var index = 0;


    const handleOpen = async(param: string) => {
        setCurrentChat(param)

        if (personalChat){
                const receiver = param;
                const loggedinUser = localStorage.getItem("user");
                const loggedinUserEmail = await JSON.parse(loggedinUser).email
                const response = await fetch("http://localhost:4000/api/message/messagesbyemail",
                {
                    method: "POST",
                    body: JSON.stringify({senderEmail: loggedinUserEmail,receiverEmail:receiver}),
                    headers: {
                    "Content-Type": "application/json"
                }
                })

                const json = await response.json();

                displayChatContentDispatch({type:"SET_CHAT_CONTENT", payload: json})

        }

        else{
            
            const response = await fetch(`http://localhost:4000/api/message/groupchat/${param}`);
            const json = await response.json()
            
            displayChatContentDispatch({type:"SET_CHAT_CONTENT", payload: json})
            // console.log(json)
        }

    //     const receiver = e.target.textContent
    //     const loggedinUser = localStorage.getItem("user");
    //     const loggedinUserEmail = await JSON.parse(loggedinUser).email
    //     const response = await fetch("http://localhost:4000/api/message/messagesbyemail",
    //     {
    //         method: "POST",
    //         body: JSON.stringify({senderEmail: loggedinUserEmail,receiverEmail:receiver}),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
        
    //    const json = await response.json();
    // //    displayMessagesDispatch({type: 'SET_MESSAGES', payload: json})
    }

if (personalChat){
    return(                
        <div className="display-chats">
            <div className="list-chats" >

                {chats && Object.keys(chats["personal"]).map(chat => {
                        return (
                            <div className='border border-yellow-700 cursor-pointer' onClick={() => handleOpen(chat)}>
                                <p>{chats["personal"][chat]}</p>
                                <p>{chat}</p>
                                
                            </div>
                        )
                    })}
            </div>
        </div> )
}
else{
    return(                
        <div className="display-chats">
            <div className="list-chats">
                {/* {chats&& Object.keys(chats).map(chat => <div key = {index++} className="indivisual-chat"><button onClick = {handleOpen}>{chat}</button></div>)} */}
                {chats && Object.keys(chats["group"]).map(chat => {
                    return(
                        <div className='border border-yellow-700 cursor-pointer' onClick={() => handleOpen(chats["group"][chat]["0"]["_id"])}>
                            {chats["group"][chat]["0"]["groupName"]}
                        </div>
                    )
                })}
          </div>
        </div> 
    )
            }
}

export default ChatsNavigation;