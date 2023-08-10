import { useEffect, useRef, useState } from "react";
import { UserField } from "../utils/ChatTypes/UserTypes";
import { Category, StatusType, Ticket } from "../utils/TicketTypes/Ticket";
import axios from "axios";
import { TiEdit } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface TicketDetailsProps {
  currentClient: UserField;
  setCurrentClient: React.Dispatch<React.SetStateAction<UserField>>;
  ticketInfo: Ticket | null;
}
const TicketDetails = (props: TicketDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ticketInfo } = props;
  const { currentUser } = useCurrentUserContext();
  const { ticketNumber } = useParams();
  
  const [categories, setCategories] = useState<Category[]>();
  const [ admins, setAdmins ] = useState<UserField[]>();

   
  const [ currentStatus, setCurrentStatus ] = useState<StatusType>("New")
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentAssignedTo, setCurrentAssignedTo] = useState<UserField>();

  const [ displayStatus, setDisplayStatus ] = useState<StatusType>("New")
  const [displayCategory, setDisplayCategory] = useState<Category | null>(null);
  const [displayAssignedTo, setDisplayAssignedTo] = useState<UserField>();



  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "http://localhost:1913/api/category/getall",
      );
      setCategories(response.data);
    };
    const fetchAdmins = async() => {
        const response = await axios.get("http://localhost:1913/api/user/getadmins");
        setAdmins(response.data)
    }
    fetchAdmins();

    fetchCategories();
  }, []);

  useEffect(() => {
    if (ticketInfo && ticketInfo.assignedTo) {
      setCurrentAssignedTo(ticketInfo.assignedTo);
      setDisplayAssignedTo(ticketInfo.assignedTo);
    }
    if (ticketInfo && ticketInfo.category) {
      setCurrentCategory(ticketInfo.category);
      setDisplayCategory(ticketInfo.category);
    }
    if (ticketInfo && ticketInfo.status){
        setCurrentStatus(ticketInfo.status)
        setDisplayStatus(ticketInfo.status)
    }
  }, [ticketInfo]);

  let domNode = useClickOutside(() => {

  });

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async() => {
    setDisplayAssignedTo(currentAssignedTo)
    setDisplayCategory(currentCategory)
    setDisplayStatus(currentStatus)
    await axios.post("http://localhost:1913/api/ticket/updateticket",
    {
        category: currentCategory,
        status: currentStatus,
        assignedTo: currentAssignedTo,
        ticketNumber: ticketNumber

    }
      );
  }


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
                    id="status"
                    name="status"
                    type="text"
                    className="peer cursor-not-allowed bg-neutral-100 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-500"
                    placeholder="Select a status of the ticket"
                    autoComplete="off"
                    disabled={true}
                    value={displayStatus}
                  />
                  <label
                    htmlFor="status"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Status
                  </label>
                </div>

                <div className="mt-10 relative">
                  <input
                    id="assigned"
                    type="assigned"
                    name="assigned"
                    className="peer cursor-not-allowed bg-neutral-100 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-500"
                    // className="peer cursor-not-allowed	 h-10 w-full bg-neutral-100 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-500"
                    placeholder="Assigned To"
                    autoComplete="off"
                    disabled={true}
                    value={displayAssignedTo?.fullName || ''}
                  />
                  <label
                    htmlFor="assigned"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Assigned To
                  </label>

                </div>

                <div className="mt-10 relative">
                  <input
                    id="category"
                    type="category"
                    name="category"
                    className="peer cursor-not-allowed	 h-10 w-full bg-neutral-100 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-500"
                    placeholder="Select a category"
                    autoComplete="off"
                    disabled={true}
                    value={displayCategory?.category || ""}
                  />
                  <label
                    htmlFor="category"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Category
                  </label>
   
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed z-[2] inset-0 overflow-y-auto ${
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
                    Edit Ticket
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
                        <Menu
                            as="div"
                            className="relative inline-block text-left w-[100%]"
                          >
                            <div>
                              <div className="pt-6 pl-2 font-semibold">
                                Status
                              </div>
                              <Menu.Button
                                id="category-menu-button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                {currentStatus 
                                  ? currentStatus
                                  : "Select a status"}
                                <ChevronDownIcon
                                  className="-mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  {
                                    ([ "New", "Assigned", "In Progress", "Updated By Client", "Waiting for Client Response", "Completed"] as StatusType[]).map((statusType: StatusType, key: Number) => {
                                      return (
                                        <Menu.Item key= {statusType}>
                                          {({ active }) => (
                                            <div
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900 cursor-pointer"
                                                  : "text-gray-700",
                                                "block px-4 py-2 text-sm cursor-pointer",
                                              )}
                                              onClick={
                                                () => {
                                                  setCurrentStatus(statusType);
                                                }
                                              }
                                            >
                                              {statusType}
                                            </div>
                                          )}
                                        </Menu.Item>
                                      );
                                    })}
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>

                          <Menu
                            as="div"
                            className="relative inline-block text-left w-[100%]"
                          >
                            <div>
                            <div className="pt-6 pl-2 font-semibold">
                                Assigned To:
                              </div>
                              <Menu.Button
                                id="category-menu-button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                {currentAssignedTo 
                                  ? currentAssignedTo.fullName
                                  : "Select an operator"}
                                <ChevronDownIcon
                                  className="-mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  {admins &&
                                    admins.map((admin) => {
                                      return (
                                        <Menu.Item key= {admin._id}>
                                          {({ active }) => (
                                            <div
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900 cursor-pointer"
                                                  : "text-gray-700",
                                                "block px-4 py-2 text-sm cursor-pointer",
                                              )}
                                              onClick={
                                                () => {
                                                  setCurrentAssignedTo(admin);
                                                }
                                              }
                                            >
                                              {admin.fullName}
                                            </div>
                                          )}
                                        </Menu.Item>
                                      );
                                    })}
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>

                          <Menu
                            as="div"
                            className="relative inline-block text-left w-[100%]"
                          >
                            <div>
                            <div className="pt-6 pl-2 font-semibold">
                                Category:
                              </div>
                              <Menu.Button
                                id="category-menu-button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                {currentCategory
                                  ? currentCategory.category
                                  : "Select a category"}
                                <ChevronDownIcon
                                  className="-mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  {categories &&
                                    categories.map((category) => {
                                      return (
                                        <Menu.Item key = {category._id}>
                                          {({ active }) => (
                                            <div
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900 cursor-pointer"
                                                  : "text-gray-700",
                                                "block px-4 py-2 text-sm cursor-pointer",
                                              )}
                                              onClick={
                                                () => {
                                                  setCurrentCategory(category);
                                                }
                                              }
                                            >
                                              {category.category}
                                            </div>
                                          )}
                                        </Menu.Item>
                                      );
                                    })}
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
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

export default TicketDetails;
