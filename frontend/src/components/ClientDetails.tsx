// @ts-nocheck
import { useState } from "react";
import { UserField } from "../utils/ChatTypes/UserTypes";
import { Ticket } from "../utils/TicketTypes/Ticket";
import { TiEdit } from "react-icons/ti";

interface ClientDetailsProps {
  client: UserField | null;
  ticketDetails: Ticket | null;
}
export const ClientDetails = (props: ClientDetailsProps) => {
  const { ticketDetails, client } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // return (
  //     <div id="client-details" className= "min-h-[25vh] min-w-[25vw] border border-pink-300">
  //     <div>This is where the client details go:</div>
  //     {ticketDetails && client && Object.keys(client).map((key, index) => {
  //         if(key !== "__v"){
  //             return(
  //             //@ts-ignore
  //             <div key={index}>{client[key]}</div>)
  //         }
  //         else{
  //             return(null)
  //         }
  //     })}
  // </div>
  // )

  const [email, setEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const fetchSearch = async (k: any, v: any) => {
    if (!v) return;
    let valueToPass;
    if (k === "fullName") {
      valueToPass = { fullName: v };
    } else if (k === "email") {
      valueToPass = { email: v };
    }
    const response = await fetch("http://localhost:4000/api/users/search/", {
      method: "POST",
      body: JSON.stringify(valueToPass),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.length > 0) {
      const result = json[0];
      let fieldMap = new Object({
        email: result.email,
        fullName: result.fullName,
      });

      setEmail(fieldMap["email"]);
      setClientName(fieldMap["fullName"]);
      updateCurrentField(k, fieldMap[k], v);

      delete fieldMap[k];

      for (let key of Object.keys(fieldMap)) {
        changeField(key, fieldMap[key]);
      }
    }
  };

  const changeField = (fieldName, fieldValue) => {
    let field = document.querySelector(`#${fieldName}-field-search`);
    field.value = fieldValue;
  };

  const updateCurrentField = (fieldName, feildValue, typed) => {
    let field = document.querySelector(`#${fieldName}-field-search`);
    field.value = feildValue;
    field.setSelectionRange(typed.length, feildValue.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* <h3>User Search</h3>
        <label>Client's name</label>
        <input placeholder="name" id = "fullName-field-search"onChange={(e) => {
            if (e.nativeEvent.data === null){
                e.target.value  = (e.target.value).substring(0, e.target.value.length-1);
            }
            fetchSearch("fullName", e.target.value)
            // console.log("fullname: " + clientName + " email: " + email);
        }}></input>
        <label>Email</label>
        <input id= "email-field-search"placeholder="email" onChange = {(e) => {
            if (e.nativeEvent.data === null){
                e.target.value  = (e.target.value).substring(0, e.target.value.length-1);
            }
            fetchSearch("email", e.target.value);
            // console.log(email);
            }}></input> */}

      <>
        <div className="container mx-auto bg-white shadow-lg">
          <div className="flex items-center justify-center h-screen ">
            <button
              onClick={openModal}
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-500 px-4 py-2 text-white font-semibold text-md tracking-wider uppercase rounded-md"
            >
              Deactivate
            </button>
          </div>
        </div>
      </>

      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
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
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <TiEdit className="h-6 w-6 text-red-600"></TiEdit>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Deactivate account
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of
                      your data will be permanently removed. This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={closeModal}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Deactivate
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
