import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { useTicketContentContext } from "../hooks/useTicketContentContext";
import { SendTicketMessage } from "./SendTicketMessage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import { Ticket } from "../utils/TicketTypes/Ticket";

interface TicketContentProps {
  ticketDetails: Ticket;
}

const TicketContent = (props: TicketContentProps) => {
  const { ticketContent, ticketContentDispatch } = useTicketContentContext();
  const { currentUser } = useCurrentUserContext();
  const { ticketNumber } = useParams();
  const [ticketSocket, setTicketSocket] = useState<Socket | null>(null);
  const { ticketDetails } = props;

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
    <div id="ticket-content-main" className="pb-">
      <div id="ticket-content" className="p-4 pr-10 flex flex-col gap-3">
        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
            {ticketDetails.clientName}
          </div>
          <div
            className="p-6"
            // dangerouslySetInnerHTML={{ __html: ticket.content }}
          >
            {ticketDetails.initialRequest}
          </div>
        </div>
        {ticketContent &&
          ticketContent.map((ticket) =>
            ticket.invisible === true ? (
              currentUser?.role !== "ADMIN" ? null : (
                <div
                  className="block rounded-lg bg-gray-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                  id={ticket._id}
                >
                  <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                    {ticket.senderName}
                  </div>
                  <div
                    className="p-6"
                    dangerouslySetInnerHTML={{ __html: ticket.content }}
                  ></div>
                </div>
              )
            ) : (
              <div
                className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                id={ticket._id}
              >
                <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                  {ticket.senderName}
                </div>
                <div
                  className="p-6"
                  dangerouslySetInnerHTML={{ __html: ticket.content }}
                ></div>
              </div>
            ),
          )}
      </div>

      <SendTicketMessage ticketSocket={ticketSocket} />
    </div>
  );
};

export default TicketContent;
