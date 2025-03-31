import { ComponentPropsWithoutRef, JSX } from "react";

interface SignUpPageProps extends ComponentPropsWithoutRef<"div"> {}

export function SignUpPage({ ...attributes }: SignUpPageProps): JSX.Element {
  return (
    <div {...attributes}>
      <span>Sign Up Page</span>
    </div>
  );
}
