import { createContext, useReducer } from 'react';

interface Message {
    groupId: string;
    senderEmail: string;
    content: string;

    // Add created at here too.
}

type ActionType = {
    type: "SET_MESSAGE" | "CREATE_MESSAGE";
    payload: Message[];
}

export const DisplayGroupChatMessageContext = createContext<Message | {}>({});
// 0
// : 
// {_id: '640fd7eacd814886f9ead652', senderEmail: 'brandon@xyz.com', groupId: '640fd7bbcd814886f9ead644', messageType: 'group', content: 'Hey group', …}
// 1
// : 
// {_id: '640fd7f7cd814886f9ead65e', senderEmail: 'shashank@xyz.com', groupId: '640fd7bbcd814886f9ead644', messageType: 'group', content: 'Hey Brandon', …}
// 2
// : 
// {_id: '64
export const displayGroupChatMessageReducer = (displayGroupChatMessageState: Message[], action: ActionType) => {

    switch (action.type){
        case("SET_MESSAGE"):
            return {displayGroupChatMessages: action.payload};

        case ("CREATE_MESSAGE"):
            // console.log(displayGroupChatMessageState)
            // {displayGroupChatMessages: }
            return { displayGroupChatMessages: [...displayGroupChatMessageState["displayGroupChatMessages"], action.payload]}
        default:
            return displayGroupChatMessageState;
    }
}

export const DisplayGroupChatMessageContextProvider = ({children}) => {

    const [displayGroupChatMessageState, displayGroupChatMessageDispatch] = useReducer(displayGroupChatMessageReducer, {displayGroupChatMessages: null})

    return <DisplayGroupChatMessageContext.Provider value = {{...displayGroupChatMessageState, displayGroupChatMessageDispatch}}>
        {children}
    </DisplayGroupChatMessageContext.Provider>
}