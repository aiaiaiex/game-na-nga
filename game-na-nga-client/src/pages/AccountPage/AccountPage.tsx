import {
  ComponentPropsWithoutRef,
  JSX,
  useEffect,
  useReducer,
  useState,
} from "react";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";
import axios from "axios";
import { ReviewProps, UpdateReview } from "../../components/Review/Review";

interface AccountPageProps extends ComponentPropsWithoutRef<"div"> {}

export function AccountPage({ ...attributes }: AccountPageProps): JSX.Element {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [changeCount, incrementChangeCount] = useReducer((x) => x + 1, 0);

  const getReviews = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/review/read-account`,
        { withCredentials: true },
      );
      setReviews(data.length > 0 ? data : []);
    } catch {
      setReviews([]);
    }
  };

  useEffect(() => {
    getReviews();
  }, [changeCount]);
  return (
    <div
      className="bg-gnn-white justify-top flex min-h-screen w-screen flex-col items-center justify-start gap-y-4"
      {...attributes}
    >
      <NavigationBar />

      <div className="bg-gnn-red flex w-[48rem] items-center justify-center rounded p-4 shadow">
        <span className="font-jersey-25 text-4xl font-bold text-white">
          {reviews.length === 0
            ? "YOU HAVEN'T REVIEWED A GAME YET"
            : reviews.length === 1
              ? "YOUR REVIEW"
              : "YOUR REVIEWS"}
        </span>
      </div>

      <div className="flex h-fit w-full flex-col items-center justify-start gap-y-4">
        {reviews.map((review) => (
          <UpdateReview
            review={review}
            incrementChangeCount={incrementChangeCount}
            key={review.id}
          />
        ))}
      </div>
    </div>
  );
}
