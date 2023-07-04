// import { createContext, useReducer } from "react";

import { createContext, useReducer } from "react";

// interface Message {

//     _id: string;
//     senderEmail?: string;
//     receiverEmail?: string;
//     messageType: string;
//     content: string;
//     createdAt?: string;
//     updatedAt?: string;
// }

// interface DisplayChatContextType {
//     type?: "Personal" | "Group";
//     currentUser: string;
//     messages: Message[];
// }

// type ActionType = {
//     type: "SET_MESSAGE" | "CREATE_MESSAGE";
//     payload: DisplayChatContextType;
// }

// const a: string = "a";
// const initState: DisplayChatContextType = {
//     currentUser: "",
//     messages: []
// }
// // const initState  = {
// //     currentUser: "",
// //     // type: "Group",
// //     messages: []
// // }

// export const DisplayChatContext = createContext<DisplayChatContextType>(initState);

// export const displayChatReducer = (displayChatState: DisplayChatContextType, action: ActionType) => {

//     console.log(action)
//     switch(action.type){
//         case('SET_MESSAGE'):
//             return {displayChat: action.payload.messages};
//         case("CREATE_MESSAGE"):
//             return {displayChat: ["TODO"]};
//         default:
//             return displayChatState;
//     }
// }

// // @ts-ignore
// export const DisplayChatContextProvider = ({children}) => {

  
//     const [ displayChatState, displayChatDispatch ] = useReducer(displayChatReducer, initState);
//     const a= useReducer(displayChatReducer, initialState);

//     //@ts-ignore
//     return <DisplayChatContext.Provider value = {{...displayChatState, displayChatDispatch}}>
//      {children}
//      {/* @ts-ignore */}
//  </DisplayChatContext.Provider>
// }


type ActionType = {
        type: "SET_MESSAGE" | "CREATE_MESSAGE";
        payload?: any;
}

const initialState = {

    messages: []
}
interface dcType{
    messages: any[];
}

export const DisplayChatContext = createContext<any>(initialState);


const reducer = (state: dcType, action: ActionType) => {

    console.log(action.payload.messages.data)

        switch(action.type){
            case('SET_MESSAGE'):
                return {messages: action.payload.messages.data};
            case("CREATE_MESSAGE"):
                return {messages: []};
            default:
                throw new Error();
        }
    

}
export const DisplayChatContextProvider = ({children}: {children: React.ReactNode}) => {

    const[state, dispatch] = useReducer(reducer, initialState);


    return <DisplayChatContext.Provider value = {{...state, dispatch}}>
          {children}
    </DisplayChatContext.Provider>
}



// import { useReducer } from "react";

// const initialState = { count: 0 };

// type ACTIONTYPE =
//   | { type: "increment"; payload: number }
//   | { type: "decrement"; payload: string };

// function reducer(state: typeof initialState, action: ACTIONTYPE) {
//   switch (action.type) {
//     case "increment":
//       return { count: state.count + action.payload };
//     case "decrement":
//       return { count: state.count - Number(action.payload) };
//     default:
//       throw new Error();
//   }
// }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       Count: {state.count}
//       <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
//         -
//       </button>
//       <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
//         +
//       </button>
//     </>
//   );
// }


