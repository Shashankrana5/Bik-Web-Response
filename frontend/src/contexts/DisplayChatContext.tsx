import { createContext, useReducer } from "react";

type Message = {
    _id: string;
    senderEmail?: string;
    receiverEmail?: string;
    messageType: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

type ActionType = {
    type: "SET_MESSAGE" | "CREATE_MESSAGE";
    payload?: any;
}

const initialState = {
    messages: [],
    currentUser: "",
    chatType: "Personal"
}

interface DisplayChatType{
    messages: Message[];
    currentUser: string;
    chatType: "Personal" | "Group"
}

interface contextType{
    messages: Message[];
    dispatch: React.Dispatch<ActionType>;
    currentUser: string;
}

export const DisplayChatContext = createContext<contextType>({...initialState, dispatch: () => null});


export function reducer (state: DisplayChatType, action: ActionType):DisplayChatType {

        switch(action.type){
            case('SET_MESSAGE'):
                return {currentUser: action.payload.currentUser, chatType: action.payload.chatType, messages: action.payload.messages.data};
            case("CREATE_MESSAGE"):
            // TODO
                return {messages: [], chatType: "Personal",currentUser: ""};
            default:
                throw state;
        }
}
export const DisplayChatContextProvider = ({children}: {children: React.ReactNode}) => {

    const[state, dispatch] = useReducer(reducer, {messages: [], currentUser: "", chatType: "Personal"});

    return <DisplayChatContext.Provider value = {{...state, dispatch}}>
          {children}
    </DisplayChatContext.Provider>
}