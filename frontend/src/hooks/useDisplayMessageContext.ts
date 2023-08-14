import { useContext } from "react";
import { DisplayMessageContext } from "../contexts/DisplayMessageContext";

export const useDisplayMessageContext = () => {
  const context = useContext(DisplayMessageContext);

  if (!context) {
    throw Error(
      "useDisplayMessageContext needs to be wrapped around DisplayMessageContextProvider",
    );
  }
  return context;
};
