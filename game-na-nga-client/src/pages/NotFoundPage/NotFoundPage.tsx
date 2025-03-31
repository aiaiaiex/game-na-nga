import { ComponentPropsWithoutRef, JSX } from "react";

interface NotFoundPageProps extends ComponentPropsWithoutRef<"div"> {}

export function NotFoundPage({
  ...attributes
}: NotFoundPageProps): JSX.Element {
  return (
    <div {...attributes}>
      <span>Not Found Page</span>
    </div>
  );
}
