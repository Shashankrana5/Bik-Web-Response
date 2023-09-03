import { AiOutlineBell } from "react-icons/ai";
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNotificationContext } from "../hooks/useNotificationContext";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import axios from "axios";
import { Typography } from "@material-tailwind/react";

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Notification = () => {
  const { notifications, notificationsDispatch } = useNotificationContext();
  const { currentUser } = useCurrentUserContext();

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      if (currentUser) {
        const response = await axios.get(
          "http://localhost:1913/api/message/getunreadbyemail/" +
            currentUser.email,
        );
        notificationsDispatch({
          type: "SET_NOTIFICATION",
          payload: response.data,
        });
      }
    };
    fetchUnreadMessages();
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left pt-1">
      <div>
        <Menu.Button className="relative inline-flex w-[90%]">
          {notifications && notifications.length > 0 ? (
            <div className="absolute bottom-auto left-auto right-0 top-2 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-red-600 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
              {notifications.length}
            </div>
          ) : null}

          <div
            className="inline-block rounded-2xl bg-orange p-1 text-2xl font-medium uppercase leading-normal  bg-transparent text-orange-400 transition duration-150 ease-in-out hover:bg-orange-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-orange-600 focus:outline-none focus:ring-0 active:bg-orange-700 "
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <AiOutlineBell />
          </div>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {notifications &&
              notifications.length > 0 &&
              notifications.map((notification) => {
                return (
                  <div
                    className="border border-b-slate-100"
                    key={notification._id}
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex flex-row justify-between items-center px-4 py-2 text-sm w-full text-left",
                          )}
                        >
                          {/* <{notification.content}> */}
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {notification.senderName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {notification.content}
                            </Typography>
                          </div>

                          <div className="w-2 h-2 rounded-full border border-red-600 bg-orange-600 flex justify-center items-center"></div>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                );
              })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Notification;
