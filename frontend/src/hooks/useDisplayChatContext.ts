import { useContext } from "react";
import { DisplayChatContext } from "../contexts/DisplayChatContext";

export const useDisplayChatContext = () => {
  const context = useContext(DisplayChatContext);

  if (!context) {
    throw Error(
      "useDisplayChatContext needs to be wrapped around DisplayChatContextProvider",
    );
  }
  return context;
};
