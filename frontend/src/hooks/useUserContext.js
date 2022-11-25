const { useContext } = require("react");
const { UserContext } = require("../context/UserContext");

const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context){
        throw Error("useUserContext must be wrapped inside a UserContextProvider.")
    }
    return context;
}

export default useUserContext;