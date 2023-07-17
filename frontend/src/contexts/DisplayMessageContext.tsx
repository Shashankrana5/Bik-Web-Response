import { createContext, useReducer } from "react";

type Message = personalMessage | groupMessage;

interface personalMessage {
    _id: string;
    senderEmail: string;
    senderName: string;
    receiverEmail: string;
    messageType: "personal";
    content: string;
    createdAt: string;
    updatedAt: string;
}

interface groupMessage {
    _id: string;
    senderEmail: string;
    senderName: string;
    messageType: "group";
    content: string;
    groupId: string;
    createdAt: string;
    updatedAt: string;
}

type ActionType = {
    type: "SET_MESSAGE" | "CREATE_MESSAGE" | "CLEAR_MESSAGE";
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

export const DisplayMessageContext = createContext<contextType>({...initialState, dispatch: () => null});

export function reducer (state: DisplayChatType, action: ActionType):DisplayChatType {


        switch(action.type){
            case("CLEAR_MESSAGE"):
                return {...state, messages: []}
            case('SET_MESSAGE'):
                return {currentUser: action.payload.currentUser, chatType: action.payload.chatType, messages: action.payload.messages};
            case("CREATE_MESSAGE"):
                return {...state, messages : [...state.messages, action.payload]}
            default:
                throw state;
        }
}
export function DisplayMessageContextProvider ({children}: {children: React.ReactNode}): JSX.Element{

    const[state, dispatch] = useReducer(reducer, {messages: [], currentUser: "", chatType: "Personal"});

    return (
        <DisplayMessageContext.Provider value = {{...state, dispatch}}>
            {children}
        </DisplayMessageContext.Provider>
    )
}