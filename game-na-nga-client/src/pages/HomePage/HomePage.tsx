import { ComponentPropsWithoutRef, JSX, useEffect, useState } from "react";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";
import axios from "axios";
import {
  CreateReview,
  Review,
  ReviewProps,
} from "../../components/Review/Review";

interface HomePageProps extends ComponentPropsWithoutRef<"div"> {}

export function HomePage({ ...attributes }: HomePageProps): JSX.Element {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [showCreateReview, setShowCreateReview] = useState<boolean>(false);

  useEffect(() => {
    const getReviews = async () => {
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
    getReviews();
  }, [showCreateReview]);
  return (
    <div
      className="bg-gnn-white justify-top flex min-h-screen w-screen flex-col items-center justify-start gap-y-4"
      {...attributes}
    >
      <NavigationBar />
      <CreateReview
        showModal={showCreateReview}
        setShowModal={setShowCreateReview}
      />
      <div className="flex h-fit w-full flex-col items-center justify-start gap-y-4">
        {reviews.map((review, index) => (
          <Review {...review} key={index} />
        ))}
      </div>
    </div>
  );
}
