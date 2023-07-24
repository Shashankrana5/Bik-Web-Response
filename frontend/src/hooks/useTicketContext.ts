import { useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";

export const useTicketContext = () => {
  const context = useContext(TicketContext);

  if (!context) {
    throw Error("useTicketContext needs to be wrapped around its provider");
  }
  return context;
};
