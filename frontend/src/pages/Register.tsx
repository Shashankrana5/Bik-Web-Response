import axios from "axios";
import { TEInput, TERipple } from "tw-elements-react";
import { host_ip } from "..";
import { useState } from "react";

export default function Register(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrorMessage([]);
    setEmailErrorMessage(false);

    let messageArray = [];

    //@ts-ignore
    if (e.target.registerFirstNameField.value.length <= 0) {
      messageArray.push("Invalid first name");
    }
    //@ts-ignore
    if (e.target.registerLastnameField.value.length <= 0) {
      messageArray.push("Invalid last name");
    }
    //@ts-ignore
    if (e.target.registerEmailField.value.length <= 0) {
      messageArray.push("Invalid email");
    }
    //@ts-ignore
    if (e.target.registerPasswordField.value.length <= 0) {
      messageArray.push("Invalid password");
    }

    if (messageArray.length > 0) {
      setErrorMessage(messageArray);
    } else {
      try {
        const response = await axios.post(
          `${host_ip}/api/user/adduser`,
          {
            fullName:
              //@ts-ignore
              e.target.registerFirstNameField.value +
              " " +
              //@ts-ignore
              e.target.registerLastnameField.value,
            //@ts-ignore
            email: e.target.registerEmailField.value,
            //@ts-ignore
            password: e.target.registerPasswordField.value,
          },
          { withCredentials: true },
        );

        window.location.href = "/";
      } catch (error) {
        setEmailErrorMessage(true);
      }
    }
  };

  return (
    <section className="h-screen w-screen px-[10%] py-[10%]">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="fallback option"
            />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit}>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Create an account
                </p>
              </div>

              {errorMessage.length > 0 && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {/* <span className="font-medium">Danger alert!</span> */}
                  <ul>
                    {errorMessage.map((key) => {
                      return <li key={key}>{key}</li>;
                    })}
                  </ul>
                </div>
              )}
              {emailErrorMessage && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Email already in use</span>
                </div>
              )}
              <TEInput
                type="text"
                label="First Name"
                size="lg"
                id="registerFirstNameField"
                className="mb-6 !w-[50%]"
              ></TEInput>

              <TEInput
                type="text"
                label="Last Name"
                size="lg"
                id="registerLastnameField"
                className="mb-6 !w-[50%]"
              ></TEInput>
              {/* <!-- Email input --> */}
              <TEInput
                type="email"
                label="Email address"
                id="registerEmailField"
                size="lg"
                className="mb-6"
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                id="registerPasswordField"
                className="mb-6"
                size="lg"
              ></TEInput>

              <div className="mb-6 flex items-center justify-between">
                {/* <!-- Remember me checkbox --> */}
              </div>

              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block rounded bg-orange-300 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-orange-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Register
                  </button>
                </TERipple>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Have an account?{" "}
                  <a
                    href="/login"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
