const { useReducer, createContext } = require("react")

export const UserContext = createContext();

export const reducer = (state, action) => {
    switch(action.type){
        case("SET_USERS"):
            return {users: action.payload}
        case("ADD_USER"):
            return {users: [action.payload, ...state.users]}
        default:
            return state;
    }
}

export const UserContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, {users: null})

    return (
        <UserContext.Provider value = {{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
