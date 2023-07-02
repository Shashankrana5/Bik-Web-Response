import useMessageDisplayContext from "../hooks/useDisplayMessageContext";

const DisplayMessages = () => {
  const { displayMessages, displayMessagesDispatch } = useMessageDisplayContext();

  return (
    <div className="display-message-chat-box">
      {displayMessages && displayMessages.map((displayMessage) => (
        <div className="single-message" key = {displayMessage._id}>
            {displayMessage.senderEmail + "  " + displayMessage.content}
        </div>
        //   <div key={displayMessage._id}><div>{displayMessage.senderEmail}</div>{displayMessage.content}</div>
        ))}
    </div>
  );
};

export default DisplayMessages;
