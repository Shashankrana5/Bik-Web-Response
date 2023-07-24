import { useState } from "react";
import { TiEdit } from "react-icons/ti";

export const FrontendPlayground = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <>
        <div className="container mx-auto bg-white shadow-lg">
          <div className="flex items-center justify-center h-screen ">
            <button
              onClick={openModal}
              className="bg-orange-400 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-orange-500 px-4 py-2 text-white font-semibold text-md tracking-wider uppercase rounded-md"
            >
              <div id="icon-edit-container" className="flex gap-1">
                <TiEdit className="h-6 w-6 text-white"></TiEdit>
                <div>Edit</div>
              </div>
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
                    <p className="text-sm text-gray-500">
                      {/* Are you sure you want to deactivate your account? All of
                      your data will be permanently removed. This action cannot
                      be undone. */}

                      <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <form>
                          <div
                            className="relative mb-12"
                            data-te-input-wrapper-init
                          >
                            <input
                              id="email"
                              name="email"
                              type="text"
                              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                              placeholder="john@doe.com"
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
                              name="password"
                              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                              placeholder="Name"
                            />
                            <label
                              htmlFor="name"
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Name
                            </label>
                          </div>
                        </form>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={closeModal}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-300 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
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
