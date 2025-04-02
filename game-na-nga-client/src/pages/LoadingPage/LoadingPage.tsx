import { ComponentPropsWithoutRef, JSX } from "react";

import LoadingIcon from "../../assets/svgs/puzzle-piece.svg?react";

interface LoadingPageProps extends ComponentPropsWithoutRef<"div"> {}

export function LoadingPage({ ...attributes }: LoadingPageProps): JSX.Element {
  return (
    <div
      className="bg-gnn-white flex h-screen min-h-screen w-screen flex-col items-center justify-center"
      {...attributes}
    >
      <LoadingIcon className="fill-gnn-red max-h-20 min-h-20 max-w-20 min-w-20 animate-pulse" />
    </div>
  );
}
