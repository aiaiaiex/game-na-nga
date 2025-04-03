import { ComponentPropsWithoutRef, JSX, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import LoadingIcon from "../../assets/svgs/puzzle-piece.svg?react";

interface LogInPageProps extends ComponentPropsWithoutRef<"div"> {}

export function LogInPage({ ...attributes }: LogInPageProps): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const login = async () => {
    const preprocessed_email = email.trim();
    const preprocessed_password = password.trim();
    if (preprocessed_email.length > 0 && preprocessed_password.length > 0) {
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/user/login`,
          {
            email: preprocessed_email,
            password: preprocessed_password,
          },
          { withCredentials: true },
        );
        setErrorMessage("");
        navigate("/");
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setErrorMessage("Incorrect email or password!");
        } else {
          setErrorMessage("Something went wrong...");
        }
      }
    } else {
      setErrorMessage("Input fields must not be empty!");
    }
  };

  return (
    <div
      {...attributes}
      className="bg-gnn-white flex h-screen min-h-screen w-screen flex-col items-center justify-center gap-y-4"
    >
      <LoadingIcon className="fill-gnn-red -mt-20 max-h-20 min-h-20 max-w-20 min-w-20 animate-bounce" />
      <div className="flex h-fit w-96 flex-col items-center justify-start rounded-2xl bg-white p-4 shadow">
        <span className="font-jersey-10 text-gnn-red text-5xl">
          GAME NA NGA
        </span>
        <span className="font-jersey-25 text-lg">Log in to continue.</span>
        <form className="mt-2 flex w-full flex-col items-center justify-start gap-y-2">
          <input
            className="border-gnn-gray font-jersey-25 block w-full rounded border p-1 text-xl shadow"
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
            }}
            required
          />
          <input
            className="border-gnn-gray font-jersey-25 block w-full rounded border p-1 text-xl shadow"
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button
            className="bg-gnn-red w-full cursor-pointer rounded p-1 shadow"
            type="button"
            onClick={login}
          >
            <span className="font-jersey-25 text-xl font-bold text-white">
              Log In
            </span>
          </button>
        </form>
      </div>
      <Link to="/signup">
        <span className="text-gnn-red font-jersey-25 text-lg hover:underline">
          Don't have an account? Sign up.
        </span>
      </Link>
      <span
        className={`font-jersey-25 text-lg ${errorMessage ? "" : "invisible"}`}
      >
        {errorMessage || "hidden"}
      </span>
    </div>
  );
}
