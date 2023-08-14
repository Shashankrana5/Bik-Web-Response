import axios from "axios";
import { UserField } from "../utils/ChatTypes/UserTypes";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import Notification from "./Notification";
import SearchBar from "./SearchBar";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface NavbarProps {
  currentUser?: UserField;
  setMinimizeSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = (props: NavbarProps) => {
  const { setMinimizeSidebar } = props;
  const { currentUser } = useCurrentUserContext();

  const handleProfileClick = async () => {
    try {
      axios.delete(`http://localhost:1913/api/session`, {
        withCredentials: true,
      });
      window.location.href = "/login";
    } catch (error) {
      console.log({ errorMessage: error });
    }
  };

  const handleMinimizeLeftNavbar = () => {
    setMinimizeSidebar!((prevState: boolean) => !prevState);
  };

  return (
    <div className="navbar-main flex justify-between h-14 items-center border-b border-gray-400">
      <div className="navbar-main-left-elements flex">
        <Link to="/" className="cursor-pointer ">
          <svg
            className="h-8"
            viewBox="0 0 24 24"
            fill="none"
            onClick={handleMinimizeLeftNavbar}
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
                d="M4 17H20M4 12H20M4 7H20"
                stroke="#4a4645"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
          </svg>
        </Link>
        <Link to="/" className="text-gray-700 text-lg font-semibold pl-8">
          <h3>Bik-Web Response</h3>
        </Link>
      </div>
      <div className="right-items-navbar-main flex items-center justify-center h-11">
        <SearchBar />
        <Notification />

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <img
                alt=""
                className="h-6"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf9JREFUaEPtmP0xRTEQxc+rgBKoABWgAqMCVIAOqIAO0AEVoAJUQAlUwByTO/Pwkmx2D5k77s7cP95Mknd+2Y8kO8PIbTZy/ZgAenvwNzywBWAPwHr6yPiYvisAd0poJQAFnwEgQMkIcJyAwiwqAIq/BbBsVPQKYFsBoQBoFT8wSiAUANz5WtjkHMNwoifcFgWgcAJEjADuxI4CXKaKEwFgZdr3LhAFeJgrlV4NLLEb3slRgHfvH3+b59bhnpgEjB6A7l8LeuEpEoZRD4w+iUdfRhk9rOGbzjC6DxyCn38ZDSGuwasEIZYaId6SeOaR2xQAHgiJeJUHht2jJ84N4cSwOVLcRNUAAwgTm1cDAg0llqWSocKq5b73LIozVQi5Yzg6cQKI7mB0/r/3ABN1J9Vzvof522JMaD4pmdA3kYrk9QDbJicAVixqDWNeUqfi2jD2y5BWAAq+iB7/BZH0yAEAApmsBcDbfTAJmRvU1K2wAlA8n49/aXxmVu9JFgCGDcVbm1YqSHqCEMVwsgBE+j5RmGrfqAbAOw2TtqftAshWpxrAs7BUejeBIbSam1wC6JG4OZ3ZhC4B8G5/6N028bzTdHD+WLYEEHnrivUj+3YuASjahiqQbPuxBKDquqkgFmqdAFTba1in2QOGNfsPqR1k/RVWFEwAvV00eaC3Bz4ALkdQMYEpwEIAAAAASUVORK5CYII="
              />
              <div className="user-name text-sm">{currentUser?.fullName}</div>
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
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleProfileClick}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm",
                      )}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {/* <div>chat & bubble notification</div> */}
        {/* <div>settings</div> */}
      </div>
    </div>
  );
};

export default Navbar;
