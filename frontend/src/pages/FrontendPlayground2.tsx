/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

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
  const ticketContent = [
    {
      senderEmail: "shashank@xyz.com",
      avatarId: "64c416bb20be2bbe6ee34633",
    },
    {
      senderEmail: "caro@xyz.com",
      avatarId: "64c416bb20be2bbe6ee34633",
    },
    {
      senderEmail: "jayson@xyz.com",
      avatarId: "64c98f5f1bbaf1ca3e218a62",
    },
    {
      senderEmail: "shashank@xyz.com",
      avatarId: "64c416bb20be2bbe6ee34633",
    },
  ];
  return <></>;
};
