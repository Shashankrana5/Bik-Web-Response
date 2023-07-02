import { useContext } from 'react';
import { ChatsContext } from '../context/ChatsContext';


const useChatsContext = () => {

    const context = useContext(ChatsContext);

    if (!context){
        throw Error("useChatsContext needs to be wrapped inside ChatsContextProvider")
    }
    return context;
}

export default useChatsContext;