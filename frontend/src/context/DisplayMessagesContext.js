const { createContext, useReducer } = require("react");

export const DisplayMessagesContext = createContext();

export const displayMessagesReducer = (state, action) =>{

    switch(action.type){
        case "SET_MESSAGES":
            return {displayMessages: action.payload}
        case "CREATE_MESSAGES":
            return {displayMessages: [action.payload, ...state.displayMessages]}
        default:
            return state;
    }
}

export const DisplayMessagesContextProvider = ({children}) => {
    const [displayMessages, displayMessagesDispatch] = useReducer(displayMessagesReducer, {messages: null})
    
    return(
        <DisplayMessagesContext.Provider value = {{...displayMessages, displayMessagesDispatch}}>
            {children}
        </DisplayMessagesContext.Provider>
    )
}