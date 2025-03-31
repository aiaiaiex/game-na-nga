import { ComponentPropsWithoutRef, JSX } from "react";

interface LoginPageProps extends ComponentPropsWithoutRef<"div"> {}

export function LoginPage({ ...attributes }: LoginPageProps): JSX.Element {
  return (
    <div {...attributes}>
      <span>Login Page</span>
    </div>
  );
}
