import { useContext } from "react"
import { GroupChatContext } from '../context/GroupChatContext';


const useGroupChatContext = () => {

    const context = useContext(GroupChatContext);

    if (!context){
        throw Error("useGroupChatContext needs to be wrapped inside GroupChatContextProvider");
    }
    return context;
}

export default useGroupChatContext;