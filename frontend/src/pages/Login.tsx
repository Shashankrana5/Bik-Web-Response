import axios from "axios";
import { TEInput, TERipple } from "tw-elements-react";
import { host_ip } from "..";

const Login = () => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    //@ts-ignore
    const email = target.loginEmailField.value;

    //@ts-ignore
    const password = target.loginPasswordField.value;

    try {
      const response = await axios.post(
        `http://${host_ip}:1913/api/session`,
        { email, password },
        { withCredentials: true },
      );
      if (response.status === 200) {
        console.log(response.data);
        window.location.href = "/";
      }
    } catch (error) {
      console.log({ errorMessage: error });
    }
  };
  return (
    <div className="flex flex-col flex-1 grow">
      <section className="h-screen w-screen px-[10%] py-[10%] flex-1">
        <div className="h-full">
          {/* <!-- Left column container with background--> */}
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="default-display"
              />
            </div>

            {/* <!-- Right column container --> */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 pr-8">
              <form onSubmit={handleSubmit}>
                {/* <!--Sign in section--> */}

                {/* <!-- Separator between social media sign in and email/password sign in --> */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                    Sign in
                  </p>
                </div>

                <TEInput
                  type="email"
                  label="Email address"
                  size="lg"
                  id="loginEmailField"
                  className="mb-6"
                ></TEInput>

                {/* <!--Password input--> */}
                <TEInput
                  type="password"
                  label="Password"
                  id="loginPasswordField"
                  className="mb-6"
                  size="lg"
                ></TEInput>

                <div className="mb-6 flex items-center justify-between"></div>

                {/* <!-- Login button --> */}
                <div className="text-center lg:text-left">
                  <TERipple rippleColor="light">
                    <button
                      type="submit"
                      className="inline-block rounded bg-orange-300 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-orange-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Login
                    </button>
                  </TERipple>

                  {/* <!-- Register link --> */}
                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Don't have an account?{" "}
                    <a
                      href="/register"
                      className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
