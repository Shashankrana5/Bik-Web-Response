import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { useTicketContentContext } from "../hooks/useTicketContentContext";
import { SendTicketMessage } from "./SendTicketMessage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Socket, io } from "socket.io-client";

const TicketContent = () => {
  const { ticketContent, ticketContentDispatch } = useTicketContentContext();
  const { currentUser } = useCurrentUserContext();
  const { ticketNumber } = useParams();
  const [ticketSocket, setTicketSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (currentUser) {
      const socket = io("http://localhost:1914/ticketchat", {
        query: { currentUser: JSON.stringify(currentUser) },
      });
      if (socket) {
        setTicketSocket(socket);
        socket.emit("join-ticket", ticketNumber);
      }
    }
  }, [currentUser]);
  useEffect(() => {
    ticketSocket?.on("receive-ticket-message", (data) => {
      ticketContentDispatch({ type: "CREATE_TICKET_CONTENT", payload: data });
    });
  }, [ticketSocket]);

  useEffect(() => {
    if (currentUser && ticketNumber) {
      const fetchTicketMessage = async () => {
        const response = await axios(
          `http://localhost:1913/api/message/getmessagebyticketnumber/${ticketNumber}`,
        );
        ticketContentDispatch({
          type: "SET_TICKET_CONTENT",
          payload: response.data,
        });
      };
      fetchTicketMessage();
    }
  }, [currentUser, ticketNumber]);

  return (
    <div id="ticket-content-main">
      <div id="ticket-content-initial-request border border-orange-200">
        this is where the initial request goes.
      </div>
      <div id="ticket-content">
        {ticketContent &&
          ticketContent.map((ticket) => {
            return (
              <div key={ticket._id}>
                {/* <span>{ticket.senderName}</span>
                <div dangerouslySetInnerHTML={{__html: ticket.content}}/> */}
                <div>{ticket.senderName}</div>
              <div dangerouslySetInnerHTML={{__html: ticket.content}}/>
              </div>
            );
          })}
      </div>
      
      <SendTicketMessage ticketSocket={ticketSocket} />
    </div>
  );
};

export default TicketContent;
