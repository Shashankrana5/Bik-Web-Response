/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext";
import { FaAngleLeft } from "react-icons/fa";

export const FrontendPlayground2 = () => {
  const currentUser = {
    _id: "63c2a594b1d5914df517bb42",
    fullName: "Shashank Rana",
    email: "shashank@xyz.com",
    password: "1234",
    role: "ADMIN",
  };
  const selectedChat = {
    chatType: "Personal",
    selected: {
      _id: "641404b9c942b8ca45034745",
      fullName: "Caro Romero",
      email: "caro@xyz.com",
      role: "ADMIN",
    },
  };

  return (
<></>
  );
};
