import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import useDisplayMessageContext from "../hooks/useDisplayMessageContext";
import DisplayMessages from "./DisplayMessages";

const SendMessage = () => {
  const socket = io.connect("http://localhost:9000", {
    query: `name=${JSON.parse(localStorage.getItem("user")).email}`,
  });

  const [content, setContent] = useState("");
  const { displayMessages, displayMessagesDispatch } =
    useDisplayMessageContext();
  const loggedinUser = localStorage.getItem("user");
  const senderEmail = JSON.parse(loggedinUser).email;

  useEffect(() => {
    socket.on("receive-message", (data) => {
      console.log(data);
      displayMessagesDispatch({ type: "CREATE_MESSAGES", payload: data });
    });
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (displayMessages) {
      const receiverEmail =
        displayMessages[0].senderEmail === senderEmail
          ? displayMessages[0].receiverEmail
          : displayMessages[0].senderEmail;
      const messageData = { receiverEmail, senderEmail, content };
      socket.emit("send-message", messageData);
      displayMessagesDispatch({
        type: "CREATE_MESSAGES",
        payload: messageData,
      });

      const response = await fetch("/api/message/sendmessage", {
        method: "POST",
        body: JSON.stringify({
          receiverEmail: receiverEmail,
          senderEmail: senderEmail,
          content: content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
    }
  };

  return (
    <div className="message-send">
      <label>Add something to say to the other user:</label>
      <input
        type="text"
        placeholder="Say something"
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

export default SendMessage;
