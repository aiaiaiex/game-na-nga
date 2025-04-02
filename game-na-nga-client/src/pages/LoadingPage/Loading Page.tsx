import { ComponentPropsWithoutRef, JSX } from "react";

interface LoadingPageProps extends ComponentPropsWithoutRef<"div"> {}

export function LoadingPage({ ...attributes }: LoadingPageProps): JSX.Element {
  return (
    <div {...attributes}>
      <span>Loading Page</span>
    </div>
  );
}
