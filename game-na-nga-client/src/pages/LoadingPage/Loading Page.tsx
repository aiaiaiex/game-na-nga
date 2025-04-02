import { ComponentPropsWithoutRef, JSX } from "react";

import LoadingIcon from "../../assets/svgs/puzzle-piece.svg?react";

interface LoadingPageProps extends ComponentPropsWithoutRef<"div"> {}

export function LoadingPage({ ...attributes }: LoadingPageProps): JSX.Element {
  return (
    <div
      className="bg-gnn-white flex min-h-screen w-screen flex-col items-center justify-center"
      {...attributes}
    >
      <LoadingIcon className="fill-gnn-red max-h-16 min-h-16 max-w-16 min-w-16 animate-pulse" />
    </div>
  );
}
