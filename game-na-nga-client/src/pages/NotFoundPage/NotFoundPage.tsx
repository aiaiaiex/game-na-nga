import { ComponentPropsWithoutRef, JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import LoadingIcon from "../../assets/svgs/puzzle-piece.svg?react";

interface NotFoundPageProps extends ComponentPropsWithoutRef<"div"> {}

export function NotFoundPage({
  ...attributes
}: NotFoundPageProps): JSX.Element {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (remainingSeconds > 1) {
        setRemainingSeconds(remainingSeconds - 1);
      } else {
        setRemainingSeconds(0);
        navigate("/");
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [remainingSeconds, navigate]);

  return (
    <div
      className="bg-gnn-white justify-top flex h-screen min-h-screen w-screen flex-col items-center"
      {...attributes}
    >
      <span className="font-jersey-10 text-gnn-red py-4 text-center text-5xl">
        GAME NA NGA
      </span>
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <span className="font-jersey-25 text-center text-5xl">
          <span className="block">PAGE NOT FOUND</span>
          <span className="block">REDIRECTING YOU IN</span>
          <span className="block">
            {remainingSeconds} {remainingSeconds !== 1 ? "SECONDS" : "SECOND"}
          </span>
        </span>
        <LoadingIcon className="fill-gnn-red max-h-20 min-h-20 max-w-20 min-w-20 animate-pulse" />
      </div>
    </div>
  );
}
