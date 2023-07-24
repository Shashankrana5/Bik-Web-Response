import { useEffect } from "react";
import { getSessionData } from "../utils/getSessionData";

import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { DisplayTicket } from "../components/DisplayTicket";

const Ticket = () => {
  const { setCurrentUser } = useCurrentUserContext();

  useEffect(() => {
    const sessionCheck = async () => {
      const response = await getSessionData();
      setCurrentUser(response?.data.user);
    };
    sessionCheck();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      Ticket page
      <DisplayTicket />
    </div>
  );
};

export default Ticket;
