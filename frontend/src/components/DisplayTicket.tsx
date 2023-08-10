import { useEffect } from "react";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import axios from "axios";
import { useTicketContext } from "../hooks/useTicketContext";
import SortableTable from "./SortableTable";

export const DisplayTicket = () => {
  const { currentUser } = useCurrentUserContext();
  const { ticketsDispatch } = useTicketContext();

  // const options = {
  //     user: currentUser,
  //     createdAt: true,
  //     updatedAt: true,
  //     email: true,
  //     ticketNumber: true,

  // }
  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.post(
        "http://localhost:1913/api/ticket/getbyassignee",
        { assignedTo: currentUser },
      );
      ticketsDispatch({ type: "SET_Ticket", payload: response.data });
    };

    if (currentUser) fetchTickets();
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <SortableTable />
  );
};
