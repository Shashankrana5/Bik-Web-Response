import { createContext, useReducer } from 'react';

interface Message {
    groupId: string;
    senderEmail: string;
    content: string;
    // Add created at here too.
}

type ActionType = {
    type: "SET_CHAT" | "CREATE_CHAT";
    payload: Message[];
}

export const DisplayGroupChatMessageContext = createContext({});

export const displayGroupChatMessageReducer = (displayGroupChatMessageState: Message[], action: ActionType) => {

    switch (action.type){
        case("SET_CHAT"):
            return {displayGroupChatMessages: action.payload};

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






// export const DisplayGroupChatMessageContext = createContext({})

// export const displayGroupChatReducer = (displayGroupChatMessageState: Message[], action: ActionType) => {

//     switch(action.type){

//         case("SET_CHAT"):
//             return {displayGroupChats: action.payload};
        
//         default:
//             return displayGroupChatMessageState;
//         }
// }

// export const DisplayGroupChatMessageContextProvider = ({children}) => {

//     const [displayGroupChatMessageState, displayGroupChatMessageDispatch] = useReducer(displayGroupChatReducer, {displayGroupChats: null});

//     <DisplayGroupChatMessageContext.Provider value = {{...displayGroupChatMessageState, displayGroupChatMessageDispatch}}>
//         {children}
//     </DisplayGroupChatMessageContext.Provider>
// }