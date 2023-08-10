/* eslint-disable */
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Editor } from "@tinymce/tinymce-react";
import "../css/editor.css";
import axios from "axios";
import { Category, Ticket } from "../utils/TicketTypes/Ticket";
import { MouseEventHandler, useCallback, useState } from "react";
import TodoContainer from "../components/TodoList/TodoContainer";

export const FrontendPlayground = () => {
  
  return <>
    <TodoContainer />
  </>;
};
