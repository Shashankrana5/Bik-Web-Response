/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext";
import { FaAngleLeft } from "react-icons/fa";
import { TERipple } from "tw-elements-react";

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
    <div className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
        sender info
      </div>
      <div className="p-6">this is where the content goes</div>
    </div>
  );
};
