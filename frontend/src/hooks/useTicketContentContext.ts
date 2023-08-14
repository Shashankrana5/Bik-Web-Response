import { useContext } from "react";
import { TicketContentContext } from "../contexts/TicketContentContext";

export const useTicketContentContext = () => {
  const context = useContext(TicketContentContext);

  if (!context) {
    throw Error(
      "useTicketContentContext needs to be wrapped around its provider",
    );
  }
  return context;
};
