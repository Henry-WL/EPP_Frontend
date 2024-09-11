type Props = {};
import axios from "axios";
import { useContext, useState } from "react";
import authContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../components/hooks/useAxios";

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [error, setError] = useState("");

  const auth = useContext(authContext);
  // const navigate = useNavigate()
  console.log(auth);

  const { sendRequest, response, isLoading, error } = useAxios();

  // console.log(process.env.REACT_APP_BACKEND_URL, 'PROCESS');
  // console.log(import.meta.env.VITE_BASE_URL, "PROCESS");

  const loginSignupHandler = async (event) => {
    event.preventDefault();

    try {
      // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,
      //   {
      //     "email": email,
      //     "password": password
      //   }
      // )

      const response = await sendRequest("/user/login", "POST", {
        email: email,
        password: password,
      });

      console.log(response);

      auth.login(
        response.data.token,
        response.data.userId,
        response.data.email,
        response.data.isStaff
      );
      // navigate('/')
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const guestLogin = () => {
    setEmail("henry@x.com");
    setPassword("123456789");

    loginSignupHandler();
  };

  return (
    <div className="flex min-h-screen">
      {/* left */}
      <div
        className="w-1/2 flex flex-col justify-end"
        style={{ backgroundColor: "#18181B" }}
      >
        {/* <h1 className="text-yellow-500">left</h1> */}

        <div className="">
          <h1 className="text-white text-xl p-5 m-5">
            “The all in one event app, custom made for your company.”
          </h1>
        </div>
      </div>

      {/* right */}
      <div className="w-1/2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={loginSignupHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    // required
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    // required
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>

                <button
                  // type="submit"
                  className="mt-4 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={guestLogin}
                >
                  Guest Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
