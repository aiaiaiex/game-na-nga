import { ComponentPropsWithoutRef, JSX } from "react";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";

interface HomePageProps extends ComponentPropsWithoutRef<"div"> {}

export function HomePage({ ...attributes }: HomePageProps): JSX.Element {
  return (
    <div
      className="bg-gnn-white justify-top flex min-h-screen w-screen flex-col items-center justify-start gap-y-4"
      {...attributes}
    >
      <NavigationBar />
      <span className="font-jersey-10 text-gnn-red text-5xl">Home Page</span>
    </div>
  );
}
