import { ComponentPropsWithoutRef, JSX, useEffect, useState } from "react";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";
import axios from "axios";
import { Review, ReviewProps } from "../../components/Review/Review";

interface HomePageProps extends ComponentPropsWithoutRef<"div"> {}

export function HomePage({ ...attributes }: HomePageProps): JSX.Element {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/review/read-all`,
          { withCredentials: true },
        );
        setReviews(data.length > 0 ? data : []);
      } catch {
        setReviews([]);
      }
    };
    getUsername();
  }, []);
  return (
    <div
      className="bg-gnn-white justify-top flex min-h-screen w-screen flex-col items-center justify-start gap-y-4"
      {...attributes}
    >
      <NavigationBar />
      <div className="flex h-fit w-full flex-col items-center justify-start gap-y-4">
        {reviews.map((review, index) => (
          <Review {...review} />
        ))}
      </div>
    </div>
  );
}
