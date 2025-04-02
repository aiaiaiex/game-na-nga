import axios from "axios";
import { ComponentPropsWithoutRef, JSX, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { SERVER } from "../config";

interface PrivateRoute extends ComponentPropsWithoutRef<"div"> {}

export function PrivateRoute({ ...attributes }: PrivateRoute): JSX.Element {
  const [jwtValidity, setJWTValidity] = useState<boolean>(true);

  useEffect(() => {
    const getJWTValidity = async () => {
      try {
        const { status } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/verify`,
          { withCredentials: true },
        );
        setJWTValidity(status === 200);
      } catch {
        setJWTValidity(false);
      }
    };
    getJWTValidity();
  }, []);

  return jwtValidity ? <Outlet /> : <Navigate to="/login" />;
}
