import { ComponentPropsWithoutRef, JSX } from "react";

interface HomePageProps extends ComponentPropsWithoutRef<"div"> {}

export function HomePage({ ...attributes }: HomePageProps): JSX.Element {
  return (
    <div {...attributes}>
      <span>Home Page</span>
    </div>
  );
}
