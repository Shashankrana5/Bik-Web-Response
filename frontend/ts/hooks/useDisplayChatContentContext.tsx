import { useContext } from 'react';
import { DisplayChatContentContext } from '../context/DisplayChatContentContext';


const useDisplayChatContentContext = () => {

    const context = useContext(DisplayChatContentContext);

    if (!context){

        throw Error("useDisplayChatContentContext needs to be wrapped around DisplayChatContentContextProvider")
    }
    return context;
}

export default useDisplayChatContentContext;