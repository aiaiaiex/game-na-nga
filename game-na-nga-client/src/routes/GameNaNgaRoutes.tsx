import { ComponentPropsWithoutRef, JSX } from "react";
import { Route, Routes } from "react-router";

import { LoggedInOnlyRoute } from "./LoggedInOnlyRoute";
import { LoggedOutOnlyRoute } from "./LoggedOutOnlyRoute";

import { HomePage } from "../pages/HomePage/HomePage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { LogInPage } from "../pages/LogInPage/LogInPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

interface GameNaNgaRoutesProps extends ComponentPropsWithoutRef<"div"> {}

export function GameNaNgaRoutes({
  ...attributes
}: GameNaNgaRoutesProps): JSX.Element {
  return (
    <Routes {...attributes}>
      <Route element={<LoggedInOnlyRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route element={<LoggedOutOnlyRoute />}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
