/* eslint-disable */
import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserField } from "../utils/ChatTypes/UserTypes";
import axios from "axios";
import Loading from "../components/Loading";

export function FrontendPlayground() {
  return <Loading />;
}
