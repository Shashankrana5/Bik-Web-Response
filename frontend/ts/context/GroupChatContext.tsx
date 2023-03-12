import { createContext, useReducer } from "react";

type Person ={
    _id: string,
    email:string
}

interface GroupChat {
    _id: string;
    groupName: string;
    users: Person[];
    admins: Person[];
}

type ActionType  = {
    type: "SET_CHAT"  | "CREATE_CHAT" | "DELTE_CHAT";
    payload: GroupChat[];
}

export const GroupChatContext = createContext({});

export const groupChatReducer = (groupChatState: GroupChat[], action:ActionType) => {


    switch(action.type){

        
        case("SET_CHAT"):
            
            return {groupChats: action.payload}
        

        default:
            return groupChatState;
    }
}

export const GroupChatContextProvider = ({children}) =>{

    const [ groupChatState, groupChatDispatch] = useReducer(groupChatReducer, {groupChats: null})
    // console.log(groupChatState)
    return <GroupChatContext.Provider value = {{...groupChatState, groupChatDispatch}}>
        {children}
    </GroupChatContext.Provider>
}