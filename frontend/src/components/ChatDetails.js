export const ChatDetails = ({chat}) => {

    const handleClick = () => {
        console.log("clicked!")
    }

    return(
        <div className="chat-details">

            <button onClick = {handleClick}>{chat}</button>
        </div>
    )
}