/* eslint-disable */
import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserField } from "../utils/ChatTypes/UserTypes";
import axios from "axios";

export function FrontendPlayground() {
  const [open, setOpen] = useState(true);

  let domNode = useClickOutside(() => {
    setDropdownOpenName(false);
    setDropDownOpenEmail(false);
  });
  const [dropdownOpenName, setDropdownOpenName] = useState(false);
  const [dropDownOpenEmail, setDropDownOpenEmail] = useState(false);

  const [searchResult, setSearchResult] = useState<UserField[] | null>(null);

  const cancelButtonRef = useRef(null);
  const handleCLick = () => {
    const c = document.querySelector("#options-menu");
    console.log(c);
  };

  const search = async (k: any, v: any) => {
    if (!v) {
      setSearchResult(null);
      return;
    }

    let valueToPass;
    if (k === "fullName") {
      valueToPass = { fullName: v };
    } else if (k === "email") {
      valueToPass = { email: v };
    }

    const response = await axios.post(
      "http://localhost:1913/api/search/searchuser",
      valueToPass,
    );
    setSearchResult(response.data);
  };

  //@ts-ignore
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-[100%]">
      <h3
        className="text-lg leading-6 font-medium text-gray-900"
        id="modal-headline"
      >
        Edit User
      </h3>
      <div className="mt-2">
        <div className="text-sm text-gray-500">
          {/* Are you sure you want to deactivate your account? All of
            your data will be permanently removed. This action cannot
            be undone. */}

          <div
            ref={domNode}
            className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
          >
            <form>
              <div className="relative mb-12" data-te-input-wrapper-init>
                <input
                  id="edit-email"
                  name="edit-email"
                  type="text"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-500"
                  placeholder="john@doe.com"
                  autoComplete="off"
                  onChange={(e) => {
                    search("email", e.target.value);
                  }}
                  onClick={() => {
                    setDropDownOpenEmail(!dropDownOpenEmail);
                    setDropdownOpenName(false);
                  }}
                />
                <label
                  htmlFor="edit-email"
                  className="absolute cursor-text left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email address
                </label>
                <div
                  className={`absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all ${
                    dropDownOpenEmail
                      ? "top-full opacity-100 visible"
                      : "top-[110%] invisible opacity-0"
                  }`}
                >
                  <div
                    id="email-dropdown-spinner"
                    className="flex justify-center items-center"
                  >
                    <div
                      className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                  </div>
                  {searchResult &&
                    searchResult.map((key, index) => {
                      return (
                        <div
                          key={index}
                          className=" w-[auto] px-5 py-2 text-base font-semibold text-body-color hover:bg-orange-300 hover:bg-opacity-5 hover:text-orange-200 cursor-pointer"
                          // onClick={() => handleSelect(key)}
                        >
                          {key.fullName}
                          <p className="font-light">{key.email}</p>
                          <hr className="my-2 h-0 border border-t-0 border-solid border-neutral-700 opacity-25 dark:border-neutral-200" />
                        </div>
                      );
                    })}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

let useClickOutside = (handler: any) => {
  let domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let maybeHandler = (event: any) => {
      if (!domNode.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};
