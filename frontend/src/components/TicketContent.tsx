import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { useTicketContentContext } from "../hooks/useTicketContentContext";
import { SendTicketMessage } from "./SendTicketMessage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import { Ticket } from "../utils/TicketTypes/Ticket";
import { Buffer } from "buffer";

interface TicketContentProps {
  ticketDetails: Ticket;
}

const TicketContent = (props: TicketContentProps) => {
  const { ticketContent, ticketContentDispatch } = useTicketContentContext();
  const { currentUser } = useCurrentUserContext();
  const { ticketNumber } = useParams();
  const [ticketSocket, setTicketSocket] = useState<Socket | null>(null);
  const { ticketDetails } = props;
  const [avatarPictures, setAvatarPictures] = useState<{
    [key: string]: string;
  }>({});

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

  useEffect(() => {
    const fetchAvatar = async () => {
      let temp: { [key: string]: string } = {};
      if (ticketContent) {
        for (const indivisualTicket of ticketContent) {
          if (!Object.keys(temp).includes(indivisualTicket.senderEmail)) {
            const response = await axios.get(
              "http://localhost:1913/api/image/getbyuseremail/" +
                indivisualTicket.senderEmail,
              { responseType: "arraybuffer" },
            );
            let base64ImageString = Buffer.from(
              response.data,
              "binary",
            ).toString("base64");
            if (
              base64ImageString !== "eyJlcnJvciI6Ik5vdCBGb3VuZCJ9" ||
              base64ImageString.length > 50
            )
              temp[indivisualTicket.senderEmail] = base64ImageString;
            else temp[indivisualTicket.senderEmail] = "";
          }
        }
      }
      setAvatarPictures(temp);
    };

    fetchAvatar();
  }, [ticketContent]);

  return (
    <div id="ticket-content-main" className="pb-8">
      <div id="ticket-content" className="p-4 pr-10 flex flex-col gap-3">
        <div className="border-b-2 border-neutral-100 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div className="flex border-b-2 border-neutral-100 px-4 py-3 dark:border-neutral-600 dark:text-neutral-50">
            {avatarPictures &&
            Object.keys(avatarPictures).length > 0 &&
            avatarPictures[ticketDetails.email] &&
            (avatarPictures[ticketDetails.email] !==
              "eyJlcnJvciI6Ik5vdCBGb3VuZCJ9" ||
              avatarPictures[ticketDetails.email].length > 50) ? (
              <img
                src={`data:image/jpeg;base64,${
                  avatarPictures[ticketDetails.email]
                }`}
                className="avatar p-2 "
                alt="user's avatar"
                
              />
            ) : (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="
                alt="user's avatar"
                className="avatar p-2"
              />
            )}

            <div className="px-2 py-2 flex items-center">
              {ticketDetails.clientName}
            </div>
          </div>
          <div
            className="p-6"
            // dangerouslySetInnerHTML={{ __html: ticket.content }}
          >
            {ticketDetails.initialRequest}
          </div>
        </div>
        {ticketContent &&
          ticketContent.map((ticket, index) =>
          // <div key = {index}></div>
            ticket.invisible === true ? (
              currentUser?.role !== "ADMIN" ? null : (
                <div
                  className="block rounded-lg bg-gray-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                  key={index}
                >
                  <div className="flex border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50" >
                    {avatarPictures &&
                    Object.keys(avatarPictures).length > 0 &&
                    avatarPictures[ticket.senderEmail] &&
                    (avatarPictures[ticket.senderEmail] !==
                      "eyJlcnJvciI6Ik5vdCBGb3VuZCJ9" ||
                      avatarPictures[ticket.senderEmail].length > 50) ? (
                      <img
                        src={`data:image/jpeg;base64,${
                          avatarPictures[ticket.senderEmail]
                        }`}
                        className="avatar p-2 "
                        alt="user's avatar"
                      />
                    ) : (
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="
                        alt="user's avatar"
                        className="avatar p-2"
                      />
                    )}

                    <div className="px-2 py-2 flex items-center">
                      {ticket.senderName}
                    </div>
                  </div>
                  <div
                    className="p-6"
                    dangerouslySetInnerHTML={{ __html: ticket.content }}
                  ></div>
                </div>
              )
            ) : 
            (
              <div
                className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                key={index}
              >
                <div className="flex border-b-2 border-neutral-100 dark:border-neutral-600 dark:text-neutral-50 pl-3 p-2">
                  {avatarPictures &&
                  Object.keys(avatarPictures).length > 0 &&
                  avatarPictures[ticket.senderEmail] &&
                  (avatarPictures[ticket.senderEmail] !==
                    "eyJlcnJvciI6Ik5vdCBGb3VuZCJ9" ||
                    avatarPictures[ticket.senderEmail].length > 50) ? (
                    <img
                      src={`data:image/jpeg;base64,${
                        avatarPictures[ticket.senderEmail]
                      }`}
                      className="avatar p-2 "
                      alt="user's avatar"
                    />
                  ) : (
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="
                      alt="user's avatar"
                      className="avatar p-2"
                    />
                  )}

                  <div className="px-2 py-2 flex items-center">
                    {ticket.senderName}
                  </div>
                </div>
                <div
                  className="p-6"
                  dangerouslySetInnerHTML={{ __html: ticket.content }}
                ></div>
              </div>
            ),
          )
          }
      </div>

      <SendTicketMessage ticketSocket={ticketSocket} />
    </div>
  );
};

export default TicketContent;
