import { useEffect, useRef, useState, Fragment } from "react";
import { UserField } from "../utils/ChatTypes/UserTypes";
import { Dialog, Transition } from "@headlessui/react";
import { Ticket } from "../utils/TicketTypes/Ticket";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// type SearchResult = (UserField | Ticket | null)

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState<
    (UserField | Ticket)[] | null
  >(null);

  const navigate = useNavigate();

  let domNode = useClickOutside(() => {
    setSearchResult(null);
  });

  const [searchOption, setSearchOption] = useState<"Ticket" | "User" | null>(
    "User",
  );
  const cancelButtonRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  const search = async (v: any) => {
    if (!v) {
      setSearchResult(null);
      return;
    }

    if (searchOption && searchOption === "Ticket") {
      const response = await axios.post("http://localhost:1913/api/search/", {
        searchParams: v,
        searchType: "ticket",
      });
      setSearchResult(response.data.searchResult);
    } else if (searchOption && searchOption === "User") {
      const response = await axios.post("http://localhost:1913/api/search/", {
        searchParams: v,
        searchType: "user",
      });

      setSearchResult(response.data.searchResult);
    }
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    destination: string,
  ) => {
    navigate(destination);
  };

  return (
    <div>
      <button onClick={() => setOpenModal((prev) => !prev)}>
        <svg
          className="h-8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"
              fill="#ffae3d"
            ></path>{" "}
          </g>
        </svg>
      </button>
      <Transition.Root show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mt-3 text-center sm:mt-0 sm:text-left w-full"
                      ref={domNode}
                    >
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      ></Dialog.Title>
                      <form className="w-full">
                        <div>
                          <div className="relative flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search"
                              className="w-[90%] py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-orange-600"
                              onChange={(e) => {
                                search(e.target.value);
                              }}
                            />
                            <div className="flex w-72 flex-col gap-6 relative">
                              <select
                                className="h-full"
                                onChange={(e) => {
                                  if (e.target.value === "ticket") {
                                    setSearchOption("Ticket");
                                  } else if (e.target.value === "user") {
                                    setSearchOption("User");
                                  }
                                }}
                              >
                                <option value="user">Users</option>
                                <option value="ticket">Tickets</option>
                              </select>
                            </div>
                          </div>

                          <div
                            className={`relative left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all `}
                          >
                            <div
                              id="email-dropdown-spinner"
                              className="flex justify-center items-center"
                            >
                              {/* <div
                                className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                              /> */}
                            </div>
                          </div>
                          {searchResult &&
                          searchResult.length > 0 &&
                          searchResult[0].hasOwnProperty("ticketNumber")
                            ? searchResult?.map((key, index) => {
                                return (
                                  <div
                                    key={index}
                                    className=" w-[auto] px-5 py-2 text-base font-semibold text-body-color hover:bg-orange-300 hover:bg-opacity-5 hover:text-orange-200 cursor-pointer
                                  transition-all duration-500 ease-out
                                  "
                                    onDoubleClick={(e) =>
                                      handleDoubleClick(
                                        e,
                                        //   @ts-ignore
                                        "/ticket/" + key.ticketNumber,
                                      )
                                    }
                                  >
                                    {/* @ts-ignore */}
                                    {key.subject}
                                    <p className="font-light">
                                      {/* @ts-ignore */}
                                      {key.clientName}
                                    </p>
                                    <p className="font-light">
                                      {/* @ts-ignore */}
                                      {key.ticketNumber}
                                    </p>
                                    <hr className="my-2 h-0 border border-t-0 border-solid border-neutral-700 opacity-25 dark:border-neutral-200" />
                                  </div>
                                );
                              })
                            : searchResult?.map((key, index) => {
                                return (
                                  <div
                                    key={index}
                                    className=" w-[auto] px-5 py-2 text-base font-semibold text-body-color hover:bg-orange-300 hover:bg-opacity-5 hover:text-orange-200 cursor-pointer
                                      transition-all duration-500 ease-out
                                      "
                                    onDoubleClick={(e) =>
                                      handleDoubleClick(e, "/")
                                    }
                                    //   onClick={() => handleSelect(key)}
                                  >
                                    {/* @ts-ignore */}
                                    {key.fullName}
                                    <p className="font-light">{key.email}</p>
                                    <hr className="my-2 h-0 border border-t-0 border-solid border-neutral-700 opacity-25 dark:border-neutral-200" />
                                  </div>
                                );
                              })}
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
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

export default SearchBar;