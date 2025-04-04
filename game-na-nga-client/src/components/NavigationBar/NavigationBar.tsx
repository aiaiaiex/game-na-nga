import { ComponentPropsWithoutRef, JSX, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

interface NavigationBarProps extends ComponentPropsWithoutRef<"div"> {}

export function NavigationBar({
  ...attributes
}: NavigationBarProps): JSX.Element {
  const [username, setUsername] = useState<string>("Account");

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      navigate("/login");
    } catch {
      console.log("Something went wrong...");
    }
  };

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/get-username`,
          { withCredentials: true },
        );
        setUsername(data.username || "Account");
      } catch {
        setUsername("Account");
      }
    };
    getUsername();
  }, []);

  return (
    <div
      className="sticky top-0 flex w-full items-center justify-between bg-white px-8 py-2 shadow"
      {...attributes}
    >
      <Link to="/account" className="w-fit rounded px-2 py-1 shadow">
        <span className="text-gnn-red font-jersey-25 text-2xl font-bold">
          {username}
        </span>
      </Link>
      <Link to="/" className="w-fit rounded px-2 shadow">
        <span className="text-gnn-red font-jersey-10 text-5xl hover:underline">
          GAME NA NGA
        </span>
      </Link>
      <button
        className="bg-gnn-red font-jersey-25 w-fit cursor-pointer rounded px-2 py-1 shadow"
        type="button"
        onClick={logout}
      >
        <span className="text-2xl font-bold text-white">Log Out</span>
      </button>
    </div>
  );
}
