import axios from "axios";
import { useDisplayChatContext } from "../hooks/useDisplayChatContext";
import { SelectedChat } from "../utils/ChatTypes/ChatType";
import { User } from "../utils/ChatTypes/UserTypes";

interface SendMessageProps {
  selectedChat: SelectedChat | null;
  currentUser: User;
}

const SendMessage = (props: SendMessageProps) => {
  const { messages, dispatch } = useDisplayChatContext();
  const { selectedChat, currentUser } = props;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    //@ts-ignore
    if (e.target.sendMessageInput.value.length !== 0 && selectedChat !== null) {
    
      const response = await axios.post(
        "http://localhost:1913/api/message/sendmessage",
        {
          selectedChat,
          currentUser,
          //@ts-ignore
          content: e.target.sendMessageInput.value,
        }
      );

      if(response){
        console.log(response.data);
        dispatch({type: "CREATE_MESSAGE", payload: response.data});
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id="sendMessageInput" placeholder="Send message" />
      <button id="sendMessageButton" type="submit">
        Send Message
      </button>
    </form>
  );
};

export default SendMessage;
