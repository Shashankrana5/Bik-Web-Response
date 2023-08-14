/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const FrontendPlayground2 = () => {
  //@ts-ignore
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

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

  const [avatarPictures, setAvatarPictures] = useState<{
    [key: string]: string;
  }>({});
  const imageFoundUserEmail = new Set<string>();

  useEffect(() => {
    console.log("eyJlcnJvciI6Ik5vdCBGb3VuZCJ9".length);
    //     const fetchAvatars = async () => {
    // //       if (ticketContent) {
    //         let objToSet:any = {}
    //         for (const indivisualTicket of ticketContent) {
    //             if(!avatarPictures[indivisualTicket.senderEmail]){

    //             const response = await axios.post(
    //               "http://localhost:1913/api/image/getbyticketcontent/",
    //               { responseType: "arraybuffer" },
    //             );
    //             let base64ImageString = Buffer.from(
    //               response.data,
    //               "binary",
    //             ).toString("base64");
    //             if(!Object.keys(avatarPictures).includes(indivisualTicket.senderEmail)){
    //             let temp:any = {}
    //             temp[indivisualTicket.senderEmail] = base64ImageString;
    //             objToSet = {...objToSet, ...temp};
    //             }

    // //             if(!Object.keys(avatarPictures).includes(indivisualTicket.senderEmail)){
    // //  let temp: any = {};
    // //             temp[indivisualTicket.senderEmail] = base64ImageString;
    // //             setAvatarPictures({ ...avatarPictures, ...temp });

    // //             }

    //           }
    //         }
    //         setAvatarPictures(objToSet);
    //       }
    //     };

    // fetchAvatars();
    const fetch = async () => {
      if (ticketContent) {
        const response = await axios.post(
          "http://localhost:1913/api/image/getbyticketcontent",
          {
            ticketContent: ticketContent,
          },
          { responseType: "arraybuffer" },
        );
        console.log(response);
      }
    };
    fetch();
    console.log(ticketContent);
  }, [ticketContent]);

  useEffect(() => {
    console.log(avatarPictures);
  }, [avatarPictures]);
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      ></Dialog.Title>
                      <form className="w-full">
                        <div className="relative">
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
                            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                          />
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
