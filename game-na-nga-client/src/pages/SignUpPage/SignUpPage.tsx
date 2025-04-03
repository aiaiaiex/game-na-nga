import { ComponentPropsWithoutRef, JSX, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import LoadingIcon from "../../assets/svgs/puzzle-piece.svg?react";

interface SignUpPageProps extends ComponentPropsWithoutRef<"div"> {}

export function SignUpPage({ ...attributes }: SignUpPageProps): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const navigate = useNavigate();

  const signup = async () => {
    let hasError = false;
    const newErrorMessages: string[] = [];

    const preprocessed_email = email.trim();
    const preprocessed_username = username.trim();
    const preprocessed_password = password.trim();
    const preprocessed_confirm_password = confirmPassword.trim();

    if (preprocessed_email.length < 6) {
      newErrorMessages.push("Email must have 6 characters or more!");
      hasError = true;
    }
    if (preprocessed_email.length > 254) {
      newErrorMessages.push("Email must have 254 characters or less!");
      hasError = true;
    }
    if (preprocessed_username.length < 1) {
      newErrorMessages.push("Username must have 1 character or more!");
      hasError = true;
    }
    if (preprocessed_username.length > 36) {
      newErrorMessages.push("Username must have 36 characters or less!");
      hasError = true;
    }
    if (preprocessed_password !== preprocessed_confirm_password) {
      newErrorMessages.push("Passwords do not match!");
      hasError = true;
    } else if (preprocessed_password.length < 12) {
      newErrorMessages.push("Password must have 12 characters or more!");
      hasError = true;
    }

    if (!hasError) {
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/signup`, {
          email: preprocessed_email,
          username: preprocessed_username,
          password: preprocessed_password,
        });

        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/user/login`,
          {
            email: preprocessed_email,
            password: preprocessed_password,
          },
          { withCredentials: true },
        );

        setErrorMessages([]);
        navigate("/");
      } catch {
        setErrorMessages(["Something went wrong..."]);
      }
    } else {
      setErrorMessages(newErrorMessages);
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
        <span className="font-jersey-25 text-lg">Create an account.</span>
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
            id="username"
            type="username"
            autoComplete="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <input
            className="border-gnn-gray font-jersey-25 block w-full rounded border p-1 text-xl shadow"
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <input
            className="border-gnn-gray font-jersey-25 block w-full rounded border p-1 text-xl shadow"
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
          <button
            className="bg-gnn-red w-full cursor-pointer rounded p-1 shadow"
            type="button"
            onClick={signup}
          >
            <span className="font-jersey-25 text-xl font-bold text-white">
              Sign Up
            </span>
          </button>
        </form>
      </div>
      <Link to="/login">
        <span className="text-gnn-red font-jersey-25 text-lg hover:underline">
          Already have an account? Log in.
        </span>
      </Link>
      <span
        className={`font-jersey-25 px-4 text-lg text-wrap ${errorMessages.length > 0 ? "" : "invisible"}`}
      >
        {errorMessages.join(" | ") || "hidden"}
      </span>
    </div>
  );
}
