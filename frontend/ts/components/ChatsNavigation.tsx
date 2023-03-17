// import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext"
import { useEffect } from 'react';
import useChatsContext from '../hooks/useChatsContext';

const ChatsNavigation = ({chats, chatsDispatch, personalChat, setPersonalChat}) => {
    var index = 0;
    // const {displayMessages, displayMessagesDispatch} = useDisplayMessageContext();
    
    useEffect(() => {
        console.log("here")
        console.log(chats)
    }, [chatsDispatch])

    const handleOpen = async(e) => {
        e.preventDefault();
        const receiver = e.target.textContent
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
    //    displayMessagesDispatch({type: 'SET_MESSAGES', payload: json})
    }

if (personalChat){
    return(                
        <div className="display-chats">
            <div className="list-chats">

            {chats && Object.keys(chats["personal"]).map(chat => {
                    return (
                        <div className='border border-yellow-700'>
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
                        <div>{chats["group"][chat]["0"]["groupName"]}
                        </div>
                    )
                })}
          </div>
        </div> 
    )
            }
}

export default ChatsNavigation;