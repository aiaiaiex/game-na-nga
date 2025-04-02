import { ComponentPropsWithoutRef, JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
    <div {...attributes}>
      <span className="flex">PAGE NOT FOUND</span>
      <span className="flex">REDIRECTING TO HOME PAGE IN</span>
      <span className="flex">
        {remainingSeconds} {remainingSeconds !== 1 ? "SECONDS" : "SECOND"}
      </span>
    </div>
  );
}
