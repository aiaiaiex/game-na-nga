import axios from "axios";
import { ComponentPropsWithoutRef, JSX, useState } from "react";
import { useNavigate } from "react-router";

interface LogInPageProps extends ComponentPropsWithoutRef<"div"> {}

export function LogInPage({ ...attributes }: LogInPageProps): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/login`,
        {
          email,
          password,
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
  };

  return (
    <div {...attributes}>
      <div>
        <span>Login</span>
      </div>
      <form>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-2xl shadow"
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Insert email here..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="rounded-2xl shadow"
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Insert password here..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="cursor-pointer rounded-2xl border shadow"
            type="button"
            onClick={login}
          >
            Login
          </button>
        </div>
      </form>
      {errorMessage && (
        <div>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
