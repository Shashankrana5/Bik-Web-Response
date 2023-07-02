"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useChatsContext_1 = __importDefault(require("../hooks/useChatsContext"));
const ChatsNavigation_1 = __importDefault(require("./ChatsNavigation"));
const react_1 = require("react");
const DisplayChatContent_1 = __importDefault(require("./DisplayChatContent"));
const useDisplayChatContentContext_1 = __importDefault(
  require("../hooks/useDisplayChatContentContext")
);
const SendMessage_1 = __importDefault(require("./SendMessage"));
const HomeChat = () => {
  const ChatContext = (0, useChatsContext_1.default)();
  const chats = ChatContext["chats"];
  const chatsDispatch = ChatContext["chatsDispatch"];
  const [personalChat, setPersonalChat] = (0, react_1.useState)(true);
  const [currentChat, setCurrentChat] = (0, react_1.useState)(null);
  const DisplayChatContext = (0, useDisplayChatContentContext_1.default)();
  const displayChatContents = DisplayChatContext["displayChatContents"];
  const displayChatContentDispatch =
    DisplayChatContext["displayChatContentDispatch"];
  const [currentLoggedinUser, setCurrentLoggedinUser] = (0, react_1.useState)(
    null
  );
  const [creatingChat, setCreatingChat] = (0, react_1.useState)(false);
  const [creatingPersonalChat, setCreatingPersonalChat] = (0, react_1.useState)(
    true
  );
  const handleChange = () => {
    setCreatingPersonalChat(!creatingPersonalChat);
  };
  const handlePersonalChatSet = () => {
    setPersonalChat(true);
  };
  const handleGroupChatSet = () => {
    setPersonalChat(false);
  };
  (0, react_1.useEffect)(() => {
    const fetchMessage = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const loggedinUser = localStorage.getItem("user");
        const loggedinUserEmail = yield JSON.parse(loggedinUser).email;
        setCurrentLoggedinUser(loggedinUserEmail);
        const usersChatted = yield fetch(
          "http://localhost:4000/api/message/chatsemail",
          {
            method: "POST",
            body: JSON.stringify({ email: loggedinUserEmail }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json = yield usersChatted.json();
        chatsDispatch({ type: "SET_CHAT", payload: json });
      });
    fetchMessage();
  }, [chatsDispatch]);
  const handleCreateChat = () => {
    const boolValue = creatingChat == true ? false : true;
    setCreatingChat(boolValue);
  };
  return (0, jsx_runtime_1.jsx)(
    "div",
    Object.assign(
      {
        className:
          "home-chat-main border border-black-700 w-[700px] h-96 bg-white",
      },
      {
        children: (0, jsx_runtime_1.jsxs)(
          "div",
          Object.assign(
            { className: "home-chat-wrapper flex flex-row h-full w-[100%]" },
            {
              children: [
                (0, jsx_runtime_1.jsxs)(
                  "div",
                  Object.assign(
                    {
                      className:
                        "home-chat-nav border border-black min-w-[25%] h-[100%]",
                    },
                    {
                      children: [
                        (0, jsx_runtime_1.jsxs)(
                          "div",
                          Object.assign(
                            {
                              className:
                                "chat-icon-conainer flex flex-row w-[100%] h-[15%] border border-b-orange-400",
                            },
                            {
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  "div",
                                  Object.assign(
                                    {
                                      className:
                                        "personal-chat-icon w-[33.333333333%] h-[100%] border  border-r-orange-300 flex justify-center hover:cursor-pointer",
                                      onClick: handlePersonalChatSet,
                                    },
                                    {
                                      children: (0, jsx_runtime_1.jsxs)(
                                        "svg",
                                        Object.assign(
                                          {
                                            className: "p-1 h-full",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg",
                                          },
                                          {
                                            children: [
                                              (0, jsx_runtime_1.jsx)("g", {
                                                id: "SVGRepo_bgCarrier",
                                                "stroke-width": "0",
                                              }),
                                              (0, jsx_runtime_1.jsx)("g", {
                                                id: "SVGRepo_tracerCarrier",
                                                "stroke-linecap": "round",
                                                "stroke-linejoin": "round",
                                              }),
                                              (0, jsx_runtime_1.jsxs)(
                                                "g",
                                                Object.assign(
                                                  { id: "SVGRepo_iconCarrier" },
                                                  {
                                                    children: [
                                                      " ",
                                                      (0, jsx_runtime_1.jsx)(
                                                        "path",
                                                        {
                                                          opacity: "0.1",
                                                          d: "M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z",
                                                          fill: "#ffae3d",
                                                        }
                                                      ),
                                                      " ",
                                                      (0, jsx_runtime_1.jsx)(
                                                        "path",
                                                        {
                                                          d: "M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z",
                                                          stroke: "#ffae3d",
                                                          "stroke-width": "2",
                                                        }
                                                      ),
                                                      " ",
                                                      (0, jsx_runtime_1.jsx)(
                                                        "path",
                                                        {
                                                          d: "M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21",
                                                          stroke: "#ffae3d",
                                                          "stroke-width": "2",
                                                          "stroke-linecap":
                                                            "round",
                                                        }
                                                      ),
                                                      " ",
                                                    ],
                                                  }
                                                )
                                              ),
                                            ],
                                          }
                                        )
                                      ),
                                    }
                                  )
                                ),
                                (0, jsx_runtime_1.jsx)(
                                  "div",
                                  Object.assign(
                                    {
                                      className:
                                        "group-chat-icon w-[33.333333333%] h-[100%] border border-l-orange-300 flex justify-center hover:cursor-pointer",
                                      onClick: handleGroupChatSet,
                                    },
                                    {
                                      children: (0, jsx_runtime_1.jsxs)(
                                        "svg",
                                        Object.assign(
                                          {
                                            className: "p-1 h-full",
                                            fill: "#ffae3d",
                                            viewBox: "0 0 1920 1920",
                                            xmlns: "http://www.w3.org/2000/svg",
                                          },
                                          {
                                            children: [
                                              (0, jsx_runtime_1.jsx)("g", {
                                                id: "SVGRepo_bgCarrier",
                                                "stroke-width": "0",
                                              }),
                                              (0, jsx_runtime_1.jsx)("g", {
                                                id: "SVGRepo_tracerCarrier",
                                                "stroke-linecap": "round",
                                                "stroke-linejoin": "round",
                                              }),
                                              (0, jsx_runtime_1.jsxs)(
                                                "g",
                                                Object.assign(
                                                  { id: "SVGRepo_iconCarrier" },
                                                  {
                                                    children: [
                                                      " ",
                                                      (0, jsx_runtime_1.jsx)(
                                                        "path",
                                                        {
                                                          d: "M1807.059 1270.091c-68.668 48.452-188.725 116.556-343.906 158.57-18.861-102.55-92.725-187.37-196.066-219.106-91.708-28.235-185.11-48.339-279.53-61.666 71.944-60.762 121.638-145.807 135.982-243.162 21.91-.791 44.837-1.243 71.04-1.243 166.023.904 331.143 26.316 490.955 75.445 72.621 22.362 121.525 87.755 121.525 162.861v128.301Zm-451.765 338.824c-114.183 80.753-330.24 198.099-621.176 198.099-129.43 0-379.144-26.203-621.177-198.1v-128.752c0-74.993 49.017-140.499 121.75-162.861 162.41-49.694 330.354-74.88 499.427-74.88h8.47c166.588.79 331.821 26.09 491.407 75.106 72.509 22.249 121.3 87.642 121.3 162.635v128.753Zm-903.53-761.901V734.072c0-155.632 126.608-282.352 282.354-282.352 155.746 0 282.353 126.72 282.353 282.352v112.942c0 155.746-126.607 282.353-282.353 282.353S451.765 1002.76 451.765 847.014Zm734.118-734.118c75.22 0 146.146 29.478 199.567 82.899 53.309 53.421 82.786 124.235 82.786 199.454V508.19c0 155.746-126.607 282.353-282.353 282.353-19.651 0-38.4-2.598-56.47-6.438v-50.033c0-156.423-92.047-290.71-224.188-354.748 8.357-148.066 130.447-266.428 280.658-266.428Zm532.857 758.061c-91.37-28.01-184.546-48.226-279.755-61.666 86.174-72.508 142.192-179.802 142.192-301.1V395.248c0-105.374-41.11-204.65-115.877-279.304-74.767-74.767-173.93-115.99-279.417-115.99-200.696 0-365.138 151.002-390.211 345.148-20.217-3.275-40.433-6.325-61.553-6.325-217.977 0-395.294 177.43-395.294 395.294v112.942c0 121.298 56.018 228.593 142.305 301.214-94.305 13.214-188.16 33.092-279.529 61.1C81.092 1246.375 0 1355.249 0 1480.163v185.675l22.588 16.941c275.238 206.344 563.803 237.177 711.53 237.177 344.244 0 593.618-148.63 711.53-237.177l22.587-16.94v-120.51c205.214-50.597 355.652-146.032 429.177-201.373l22.588-16.941V1141.79c0-125.026-80.979-233.901-201.261-270.833Z",
                                                          "fill-rule":
                                                            "evenodd",
                                                        }
                                                      ),
                                                      " ",
                                                    ],
                                                  }
                                                )
                                              ),
                                            ],
                                          }
                                        )
                                      ),
                                    }
                                  )
                                ),
                                (0, jsx_runtime_1.jsx)(
                                  "div",
                                  Object.assign(
                                    {
                                      onClick: handleCreateChat,
                                      id: "ticket-creation-division",
                                      className:
                                        '"group-chat-icon w-[33.333333333%]\n                  flex ml-auto cursor-pointer rounded-md p-2  bg-orange-100 border\n                  text-gray-700 md:border-orange-200 md:border-2 hover:bg-orange-300 hover:text-white transition ease-out duration-500',
                                    },
                                    {
                                      children: (0, jsx_runtime_1.jsx)(
                                        "div",
                                        Object.assign(
                                          { className: " w-6 h-6 relative" },
                                          {
                                            children: (0, jsx_runtime_1.jsxs)(
                                              "button",
                                              Object.assign(
                                                { id: "transform-button" },
                                                {
                                                  children: [
                                                    (0, jsx_runtime_1.jsx)(
                                                      "span",
                                                      {
                                                        id: "transform-button-stick",
                                                      }
                                                    ),
                                                    (0, jsx_runtime_1.jsx)(
                                                      "span",
                                                      {
                                                        id: "transform-button-stick",
                                                      }
                                                    ),
                                                  ],
                                                }
                                              )
                                            ),
                                          }
                                        )
                                      ),
                                    }
                                  )
                                ),
                              ],
                            }
                          )
                        ),
                        (0, jsx_runtime_1.jsx)(ChatsNavigation_1.default, {
                          setCurrentChat: setCurrentChat,
                          personalChat: personalChat,
                          chats: chats,
                          chatsDispatch: chatsDispatch,
                          displayChatContentDispatch:
                            displayChatContentDispatch,
                        }),
                      ],
                    }
                  )
                ),
                (0, jsx_runtime_1.jsxs)(
                  "div",
                  Object.assign(
                    {
                      className:
                        "home-chat-main-body border border-blue-800 w-[75%]",
                    },
                    {
                      children: [
                        creatingChat &&
                          (0, jsx_runtime_1.jsxs)(
                            "div",
                            Object.assign(
                              { className: "chat-creation-form-main" },
                              {
                                children: [
                                  (0, jsx_runtime_1.jsx)("input", {
                                    type: "checkbox",
                                    checked: creatingPersonalChat,
                                    onChange: handleChange,
                                  }),
                                  creatingPersonalChat &&
                                    (0, jsx_runtime_1.jsxs)(
                                      "div",
                                      Object.assign(
                                        {
                                          className:
                                            "chat-creation-form-personal-main ",
                                        },
                                        {
                                          children: [
                                            (0, jsx_runtime_1.jsx)("label", {
                                              children: "Enter for Search user",
                                            }),
                                            (0, jsx_runtime_1.jsx)("input", {
                                              placeholder: "Serach",
                                            }),
                                            (0, jsx_runtime_1.jsx)("button", {
                                              children: "Create chat",
                                            }),
                                          ],
                                        }
                                      )
                                    ),
                                  !creatingPersonalChat &&
                                    (0, jsx_runtime_1.jsxs)(
                                      "div",
                                      Object.assign(
                                        {
                                          className:
                                            "chat-creation-form-group-main",
                                        },
                                        {
                                          children: [
                                            (0, jsx_runtime_1.jsx)("label", {
                                              children: "Group Name",
                                            }),
                                            (0, jsx_runtime_1.jsx)("input", {
                                              placeholder: "Enter group name",
                                            }),
                                            (0, jsx_runtime_1.jsx)("label", {
                                              children: "Serach Users",
                                            }),
                                            (0, jsx_runtime_1.jsx)("input", {
                                              placeholder: "Enter users to add",
                                            }),
                                            (0, jsx_runtime_1.jsx)("button", {
                                              children: "Create Chat",
                                            }),
                                          ],
                                        }
                                      )
                                    ),
                                ],
                              }
                            )
                          ),
                        !creatingChat &&
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                DisplayChatContent_1.default,
                                { personalChat: personalChat }
                              ),
                              (0, jsx_runtime_1.jsx)(SendMessage_1.default, {
                                personalChat: personalChat,
                                currentChat: currentChat,
                                currentLoggedinUser: currentLoggedinUser,
                                displayChatContents: displayChatContents,
                                displayChatContentDispatch:
                                  displayChatContentDispatch,
                              }),
                            ],
                          }),
                      ],
                    }
                  )
                ),
              ],
            }
          )
        ),
      }
    )
  );
};
exports.default = HomeChat;
