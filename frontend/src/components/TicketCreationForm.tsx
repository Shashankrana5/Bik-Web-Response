import { useEffect, useState } from "react";
import { UserField } from "../utils/ChatTypes/UserTypes";
import axios from "axios";

type Category = {
  _id: string;
  category: string;
};

export const TicketCreationForm = () => {
  const [clientName, setClientName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [initialRequest, setInitialRequest] = useState<string>("");
  const [category, setCategory] = useState<Category | null>(null);
  const [assignedTo, setAssignedTo] = useState<UserField | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [admins, setAdmins] = useState<UserField[]>([]);

  const getCategoryOptions = async () => {
    const response = await fetch("http://localhost:1913/api/category/getall");
    const json = await response.json();
    setCategories(json);
    const categorySelect = document.querySelector(
      "#ticket-creation-form-category-selection",
    );
    if (json) {
      const defaultOption = document.createElement("option");
      defaultOption.value = "Select a category";
      defaultOption.innerHTML = "Select a category";
      if (categorySelect) {
        categorySelect.appendChild(defaultOption);
        for (const k in json) {
          const tempOption = document.createElement("option");
          tempOption.value = json[k]["_id"];
          tempOption.innerHTML = json[k]["category"];
          categorySelect.appendChild(tempOption);
        }
      }
    }
  };

  const getAdminOptions = async () => {
    const admins = await fetch("http://localhost:1913/api/user/getadmins");
    const adminJson = await admins.json();
    setAdmins(adminJson);
    const adminSelector = document.querySelector(
      "#ticket-creation-form-assign-selection",
    );
    const defaultOption = document.createElement("option");
    defaultOption.value = "Select an operator";
    defaultOption.innerHTML = "Select an operator";
    if (adminSelector) {
      adminSelector.appendChild(defaultOption);
      if (adminJson) {
        for (const index in adminJson) {
          const tempOption = document.createElement("option");
          tempOption.value = adminJson[index]["email"];
          tempOption.innerHTML = adminJson[index]["fullName"];
          adminSelector.appendChild(tempOption);
        }
      }
      const noneOption = document.createElement("option");
      noneOption.value = "None";
      noneOption.innerHTML = "None";
      adminSelector.appendChild(noneOption);
    }
  };

  useEffect(() => {
    getAdminOptions();
    getCategoryOptions();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const paramsToPass = {
      clientName,
      email,
      subject,
      initialRequest,
      category,
      status: "New",
      assignedTo,
    };
    try {
      await axios.post(
        "http://localhost:1913/api/ticket/createticket",
        paramsToPass,
      );
    } catch (error) {
      console.log({ errorMessage: error });
    }
  };

  return (
    <div className="ticket-creation-form-main drop-shadow-2xl rounded-xl bg-white p-5">
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="flex gap-4 p-2">
          <div className="ticket-creation-client-name flex flex-col w-[50%]">
            <label className="text-gray-400 mr-auto">Client Name</label>
            <input
              placeholder="Enter client's name"
              className="border border-yellow-700 bg-amber-50 rounded-md placeholder:pl-2"
              onChange={(e) => setClientName(e.target.value)}
            ></input>
          </div>

          <div className="ticket-creation-email w-[50%] flex flex-col">
            <label className="text-gray-400 mr-auto">Email</label>
            <input
              placeholder="Enter client's email"
              className="border border-yellow-700 bg-amber-50 rounded-md placeholder:pl-2"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="ticket-creation-subject flex flex-col p-1.5">
          <label className="text-gray-400  pl-1 mr-auto">Subject</label>
          <input
            placeholder="Enter Subject"
            className="border border-yellow-700 bg-amber-50 rounded-md w-full placeholder:pl-2"
            onChange={(e) => setSubject(e.target.value)}
          ></input>
        </div>
        <div className="ticket-creation-issue">
          <label className="text-gray-400 w-full max-w-xs">
            Describe the issue:
          </label>

          <input
            className="block w-full p-4 text-gray-900 border border-yellow-700 rounded-xl bg-amber-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
            onChange={(e) => setInitialRequest(e.target.value)}
          ></input>
        </div>
        <div className="ticket-creation-category p-3 mt-1">
          <label className="text-gray-400 pr-2">Category</label>
          <select
            id="ticket-creation-form-category-selection"
            className="border border-yellow-700 bg-amber-50 rounded-md placeholder:pl-2"
            onChange={(e) => {
              categories.forEach((categoryIndivisual) => {
                if (categoryIndivisual._id === e.target.value)
                  setCategory(categoryIndivisual);
              });
            }}
          />
        </div>

        <div className="ticket-creation-assign mt-1">
          <label className="text-gray-400 pr-2">Assigned operator</label>
          <select
            id="ticket-creation-form-assign-selection"
            className="border border-yellow-700 bg-amber-50 rounded-md placeholder:pl-2"
            onChange={(e) => {
              admins.forEach((admin) => {
                if (admin.email === e.target.value) setAssignedTo(admin);
              });
            }}
          />
        </div>
        <button
          type="submit"
          id="ticket-create-btn"
          className="bg-[#3091b2] text-[#fff] p-1.5 rounded-lg mt-6"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};
