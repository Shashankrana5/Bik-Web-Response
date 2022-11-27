import useMessageContext from "../hooks/useMessageContext"


const ChatDetails = ({chat}) => {

    const { dispatch } = useMessageContext();


    return(
        <div className="chat-details">
            <h3>Chat with:</h3>
        </div>
    )
}