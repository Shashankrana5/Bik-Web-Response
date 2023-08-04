import { useEffect, useRef, useState } from "react";
import { UserField } from "../utils/ChatTypes/UserTypes";
import { Ticket } from "../utils/TicketTypes/Ticket";
import axios from "axios";
import { TiEdit } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";

interface ClientDetailsProps {
  currentClient: UserField;
  setCurrentClient: React.Dispatch<React.SetStateAction<UserField>>;
  ticketDetails: Ticket | null;
}

export const ClientDetails = (props: ClientDetailsProps) => {
  const { currentClient, setCurrentClient } = props;
  const [currentSelectedClient, setCurrentSelectedClient] =
    useState<UserField | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpenName, setDropdownOpenName] = useState(false);
  const [dropDownOpenEmail, setDropDownOpenEmail] = useState(false);
  const [searchResult, setSearchResult] = useState<UserField[] | null>(null);
  const { currentUser } = useCurrentUserContext();
  const { ticketNumber } = useParams();

  let domNode = useClickOutside(() => {
    setDropdownOpenName(false);
    setDropDownOpenEmail(false);
  });

  const handleSelect = (user: UserField) => {
    if (user._id !== currentClient?._id) {
      setCurrentSelectedClient(user);
      setDropdownOpenName(false);
      setDropDownOpenEmail(false);
      let emailInput = document.getElementById(
        "edit-email",
      ) as HTMLInputElement;
      let nameInput = document.querySelector("#edit-name") as HTMLInputElement;
      emailInput.value = user.email;
      nameInput.value = user.fullName;
    }
  };

  const handleUpdate = async () => {
    if (currentSelectedClient) {
      setCurrentClient(currentSelectedClient!);
      await axios.post("http://localhost:1913/api/ticket/updateticket", {
        client: currentSelectedClient._id,
        clientName: currentSelectedClient.fullName,
        email: currentSelectedClient.email,
        ticketNumber,
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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

  return (
    <div className="h-[35vh] rounded-md shadow-lg">
      <div className="container mx-auto bg-white">
        <div className="flex items-center justify-end pr-4 pt-4">
          {currentUser?.role !== "ADMIN" ? null : (
            <button
              onClick={openModal}
              className="bg-orange-400 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-orange-500 px-4 py-2 text-white font-semibold text- tracking-wider uppercase rounded-md"
            >
              <div id="icon-edit-container" className="flex gap-1">
                <TiEdit className="h-6 w-6 text-white"></TiEdit>
                <div>Edit</div>
              </div>
            </button>
          )}
        </div>
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
                    id="email"
                    name="email"
                    type="text"
                    className="peer cursor-not-allowed bg-neutral-100 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-500"
                    placeholder="john@doe.com"
                    autoComplete="off"
                    disabled={true}
                    value={currentClient?.email}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                </div>

                <div className="mt-10 relative">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="peer cursor-not-allowed	 h-10 w-full bg-neutral-100 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-500"
                    placeholder="Name"
                    autoComplete="off"
                    disabled={true}
                    value={currentClient?.fullName}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Name
                  </label>
                  <div
                    className={`absolute left-0 z-99 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all ${
                      dropdownOpenName
                        ? "top-full opacity-100 visible"
                        : "top-[110%] invisible opacity-0"
                    }`}
                  ></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed z-1 inset-0 overflow-y-auto ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                  <TiEdit className="h-6 w-6 text-orange-300"></TiEdit>
                </div>
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
                          <div
                            className="relative mb-12"
                            data-te-input-wrapper-init
                          >
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
                                      onClick={() => handleSelect(key)}
                                    >
                                      {key.fullName}
                                      <p className="font-light">{key.email}</p>
                                      <hr className="my-2 h-0 border border-t-0 border-solid border-neutral-700 opacity-25 dark:border-neutral-200" />
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          <div className="mt-10 relative">
                            <input
                              id="edit-name"
                              type="text"
                              name="edit-name"
                              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-500"
                              placeholder="Name"
                              autoComplete="off"
                              onClick={() => {
                                setDropdownOpenName(!dropdownOpenName);
                                setDropDownOpenEmail(false);
                              }}
                              onChange={(e) => {
                                search("fullName", e.target.value);
                              }}
                            />
                            <label
                              htmlFor="edit-name"
                              className="absolute cursor-text left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Name
                            </label>
                            <div
                              className={`absolute left-0 z-99 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all ${
                                dropdownOpenName
                                  ? "top-full opacity-100 visible"
                                  : "top-[110%] invisible opacity-0"
                              }`}
                            >
                              {searchResult &&
                                searchResult.map((key, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className=" w-[auto] px-5 py-2 text-base font-semibold text-body-color hover:bg-orange-300 hover:bg-opacity-5 hover:text-orange-200 cursor-pointer"
                                      onClick={() => handleSelect(key)}
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
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => {
                  closeModal();
                  handleUpdate();
                }}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Update
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
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
