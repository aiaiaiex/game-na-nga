import axios from "axios";
import { ComponentPropsWithoutRef, JSX, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

import { LoadingPage } from "../pages/LoadingPage/Loading Page";

interface LoggedInOnlyRoute extends ComponentPropsWithoutRef<"div"> {}

export function LoggedInOnlyRoute({
  ...attributes
}: LoggedInOnlyRoute): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jwtValidity, setJWTValidity] = useState<boolean>(false);

  useEffect(() => {
    const getJWTValidity = async () => {
      try {
        const { status } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/verify`,
          { withCredentials: true },
        );
        setJWTValidity(status === 200);
        setIsLoading(false);
      } catch {
        setJWTValidity(false);
        setIsLoading(false);
      }
    };
    getJWTValidity();
  }, []);

  return isLoading ? (
    <LoadingPage />
  ) : jwtValidity ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
