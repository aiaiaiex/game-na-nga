import { ComponentPropsWithoutRef, Fragment, JSX, useState } from "react";

import StarIcon from "../../assets/svgs/star.svg?react";
import axios from "axios";

export interface ReviewProps {
  id: number;
  author: string;
  game: string;
  title: string;
  stars: number;
  text: string;
  timestamp: Date;
}

export function Review({
  author,
  game,
  title,
  stars,
  text,
  timestamp,
}: ReviewProps): JSX.Element {
  return (
    <div className="flex h-fit w-[48rem] flex-col items-center justify-start rounded-2xl bg-white p-4 shadow">
      <div className="flex w-full flex-row items-center justify-between gap-x-4">
        <span className="font-jersey-10 text-3xl text-wrap break-words">
          {game}
        </span>
        <div className="flex w-fit flex-row items-center justify-between">
          {[...Array(stars)].map(() => (
            <StarIcon className="fill-gnn-red max-h-8 min-h-8 max-w-8 min-w-8" />
          ))}
          {[...Array(5 - stars)].map(() => (
            <StarIcon className="fill-gnn-gray max-h-8 min-h-8 max-w-8 min-w-8" />
          ))}
        </div>
      </div>
      <span className="font-jersey-10 text-gnn-red block w-full text-3xl text-wrap break-words">
        "{title}"
      </span>
      <div className="bg-gnn-white mt-2 w-full rounded px-2 shadow">
        <span className="font-jersey-25 text-2xl text-wrap break-words">
          {text}
        </span>
      </div>
      <div className="mt-2 flex w-full flex-row items-start justify-between">
        <span className="font-jersey-25 text-wrap break-words">
          by {author}
        </span>
        <span className="font-jersey-25 text-wrap break-words">
          {timestamp.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

interface CreateReviewProps extends ComponentPropsWithoutRef<"div"> {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateReview({
  showModal,
  setShowModal,
}: CreateReviewProps): JSX.Element {
  const [game, setGame] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [stars, setStars] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const createReview = async () => {
    let hasError = false;
    const newErrorMessages: string[] = [];

    const preprocessed_game = game.trim();
    const preprocessed_title = title.trim();
    const preprocessed_text = text.trim();

    if (preprocessed_game.length < 1) {
      newErrorMessages.push("Game name must have 1 character or more!");
      hasError = true;
    }
    if (preprocessed_title.length < 1) {
      newErrorMessages.push("Title must have 1 character or more!");
      hasError = true;
    }
    if (preprocessed_text.length < 1) {
      newErrorMessages.push("Review must have 1 character or more!");
      hasError = true;
    }

    if (!hasError) {
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/review/create`,
          {
            game: preprocessed_game,
            title: preprocessed_title,
            stars: stars,
            text: preprocessed_text,
          },
          { withCredentials: true },
        );

        setErrorMessages([]);
        setGame("");
        setTitle("");
        setStars(0);
        setText("");
        setShowModal(false);
      } catch {
        setErrorMessages(["Something went wrong..."]);
      }
    } else {
      setErrorMessages(newErrorMessages);
    }
  };

  return (
    <>
      <button
        className="bg-gnn-red w-[48rem] cursor-pointer rounded p-4 shadow"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <span className="font-jersey-25 text-4xl font-bold text-white">
          CREATE REVIEW
        </span>
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center overflow-auto bg-black/50">
          <div className="flex h-fit w-[48rem] min-w-[48rem] flex-col items-center justify-start gap-y-2 rounded-2xl bg-white p-4 shadow">
            <div className="flex w-full flex-row items-center justify-between gap-x-4">
              <input
                className="border-gnn-gray font-jersey-10 block w-full rounded border p-1 text-3xl shadow"
                id="game"
                type="text"
                placeholder="GAME NAME (MAXIMUM OF 36 CHARACTERS)"
                value={game}
                onChange={(e) => {
                  setGame(e.target.value.substring(0, 36));
                }}
                required
              />
              <div className="flex w-fit flex-row items-center justify-between">
                <StarIcon
                  className={`${stars < 1 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 1) {
                      setStars(0);
                    } else {
                      setStars(1);
                    }
                  }}
                />
                <StarIcon
                  className={`${stars < 2 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 2) {
                      setStars(0);
                    } else {
                      setStars(2);
                    }
                  }}
                />
                <StarIcon
                  className={`${stars < 3 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 3) {
                      setStars(0);
                    } else {
                      setStars(3);
                    }
                  }}
                />
                <StarIcon
                  className={`${stars < 4 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 4) {
                      setStars(0);
                    } else {
                      setStars(4);
                    }
                  }}
                />
                <StarIcon
                  className={`${stars < 5 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 5) {
                      setStars(0);
                    } else {
                      setStars(5);
                    }
                  }}
                />
              </div>
            </div>
            <input
              className="border-gnn-gray font-jersey-10 placeholder:text-gnn-red/50 text-gnn-red block w-full rounded border p-1 text-3xl shadow"
              id="title"
              type="text"
              placeholder="TITLE (MAXIMUM OF 36 CHARACTERS)"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value.substring(0, 36));
              }}
              required
            />
            <input
              className="border-gnn-gray bg-gnn-white font-jersey-25 block w-full rounded border p-1 text-2xl shadow"
              id="text"
              type="text"
              placeholder="REVIEW (MAXIMUM OF 280 CHARACTERS)"
              value={text}
              onChange={(e) => {
                setText(e.target.value.substring(0, 280));
              }}
              required
            />
            <div className="flex w-full flex-row items-start justify-between">
              <button
                className="bg-gnn-red w-[12rem] cursor-pointer rounded p-2 shadow"
                type="button"
                onClick={() => {
                  setGame("");
                  setTitle("");
                  setStars(0);
                  setText("");
                  setShowModal(false);
                }}
              >
                <span className="font-jersey-25 text-2xl font-bold text-white">
                  CANCEL
                </span>
              </button>
              <button
                className="bg-gnn-red w-[12rem] cursor-pointer rounded p-2 shadow"
                type="button"
                onClick={createReview}
              >
                <span className="font-jersey-25 text-2xl font-bold text-white">
                  POST
                </span>
              </button>
            </div>
          </div>

          <span
            className={`font-jersey-25 text-gnn-white px-4 text-xl text-wrap ${errorMessages.length > 0 ? "" : "invisible"}`}
          >
            {errorMessages.join(" | ") || "hidden"}
          </span>
        </div>
      )}
    </>
  );
}

interface UpdateReviewProps extends ComponentPropsWithoutRef<"div"> {
  review: ReviewProps;
  incrementChangeCount: React.ActionDispatch<[]>;
}

export function UpdateReview({
  review,
  incrementChangeCount,
  key,
}: UpdateReviewProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [game, setGame] = useState<string>(review.game);
  const [title, setTitle] = useState<string>(review.title);
  const [stars, setStars] = useState<number>(review.stars);
  const [text, setText] = useState<string>(review.text);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const updateReview = async () => {
    let hasError = false;
    const newErrorMessages: string[] = [];

    const preprocessed_game = game.trim();
    const preprocessed_title = title.trim();
    const preprocessed_text = text.trim();

    if (preprocessed_game.length < 1) {
      newErrorMessages.push("Game name must have 1 character or more!");
      hasError = true;
    }
    if (preprocessed_title.length < 1) {
      newErrorMessages.push("Title must have 1 character or more!");
      hasError = true;
    }
    if (preprocessed_text.length < 1) {
      newErrorMessages.push("Review must have 1 character or more!");
      hasError = true;
    }
    if (
      preprocessed_game === review.game &&
      preprocessed_title === review.title &&
      stars === review.stars &&
      preprocessed_text === review.text
    ) {
      newErrorMessages.push("Must update at least 1 field!");
      hasError = true;
    }

    if (!hasError) {
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/review/update`,
          {
            id: review.id,
            game: preprocessed_game,
            title: preprocessed_title,
            stars: stars,
            text: preprocessed_text,
          },
          { withCredentials: true },
        );

        setErrorMessages([]);
        incrementChangeCount();
        setShowModal(false);
      } catch {
        setErrorMessages(["Something went wrong..."]);
      }
    } else {
      setErrorMessages(newErrorMessages);
    }
  };

  const deleteReview = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/review/delete`,
        {
          id: review.id,
        },
        { withCredentials: true },
      );

      setErrorMessages([]);
      incrementChangeCount();
      setShowModal(false);
    } catch {
      setErrorMessages(["Something went wrong..."]);
    }
  };

  return (
    <Fragment key={key}>
      <button
        className="flex h-fit w-[48rem] cursor-pointer flex-col items-center justify-start rounded-2xl bg-white p-4 shadow hover:brightness-90"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <div className="flex w-full flex-row items-center justify-between gap-x-4">
          <span className="font-jersey-10 text-3xl text-wrap break-words">
            {review.game}
          </span>
          <div className="flex w-fit flex-row items-center justify-between">
            {[...Array(review.stars)].map(() => (
              <StarIcon className="fill-gnn-red max-h-8 min-h-8 max-w-8 min-w-8" />
            ))}
            {[...Array(5 - review.stars)].map(() => (
              <StarIcon className="fill-gnn-gray max-h-8 min-h-8 max-w-8 min-w-8" />
            ))}
          </div>
        </div>
        <span className="font-jersey-10 text-gnn-red w-full text-left text-3xl text-wrap break-words">
          "{review.title}"
        </span>
        <div className="bg-gnn-white mt-2 flex w-full flex-col items-center justify-center rounded px-2 shadow">
          <span className="font-jersey-25 w-full text-left text-2xl text-wrap break-words">
            {review.text}
          </span>
        </div>
        <div className="mt-2 flex w-full flex-row items-start justify-between">
          <span className="font-jersey-25 text-wrap break-words">
            by {review.author}
          </span>
          <span className="font-jersey-25 text-wrap break-words">
            {review.timestamp.toLocaleString()}
          </span>
        </div>
        <div className="bg-gnn-red mt-2 flex w-full flex-col items-center justify-center rounded px-2 shadow">
          <span className="font-jersey-25 text-white">UPDATE OR DELETE</span>
        </div>
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center overflow-auto bg-black/50">
          <div className="flex h-fit w-[48rem] min-w-[48rem] flex-col items-center justify-start gap-y-2 rounded-2xl bg-white p-4 shadow">
            <div className="flex w-full flex-row items-center justify-between gap-x-4">
              <input
                className="border-gnn-gray font-jersey-10 block w-full rounded border p-1 text-3xl shadow"
                id="game"
                type="text"
                placeholder="GAME NAME (MAXIMUM OF 36 CHARACTERS)"
                defaultValue={review.game}
                value={game}
                onChange={(e) => {
                  setGame(e.target.value.substring(0, 36));
                }}
                required
              />
              <div className="flex w-fit flex-row items-center justify-between">
                <StarIcon
                  className={`${stars < 1 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 1) {
                      setStars(0);
                    } else {
                      setStars(1);
                    }
                  }}
                />
                <StarIcon
                  className={`${stars < 2 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 2) {
                      setStars(0);
                    } else {
                      setStars(2);
                    }
                  }}
                />
                <StarIcon
                  className={`${stars < 3 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 3) {
                      setStars(0);
                    } else {
                      setStars(3);
                    }
                  }}
                />
                <StarIcon
                  className={`${stars < 4 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 4) {
                      setStars(0);
                    } else {
                      setStars(4);
                    }
                  }}
                />
                <StarIcon
                  className={`${stars < 5 ? "fill-gnn-gray" : "fill-gnn-red"} max-h-8 min-h-8 max-w-8 min-w-8 cursor-pointer`}
                  onClick={() => {
                    if (stars == 5) {
                      setStars(0);
                    } else {
                      setStars(5);
                    }
                  }}
                />
              </div>
            </div>
            <input
              className="border-gnn-gray font-jersey-10 placeholder:text-gnn-red/50 text-gnn-red block w-full rounded border p-1 text-3xl shadow"
              id="title"
              type="text"
              placeholder="TITLE (MAXIMUM OF 36 CHARACTERS)"
              defaultValue={review.title}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value.substring(0, 36));
              }}
              required
            />
            <input
              className="border-gnn-gray bg-gnn-white font-jersey-25 block w-full rounded border p-1 text-2xl shadow"
              id="text"
              type="text"
              placeholder="REVIEW (MAXIMUM OF 280 CHARACTERS)"
              defaultValue={review.text}
              value={text}
              onChange={(e) => {
                setText(e.target.value.substring(0, 280));
              }}
              required
            />
            <div className="flex w-full flex-row items-start justify-between">
              <button
                className="bg-gnn-red w-[12rem] cursor-pointer rounded p-2 shadow"
                type="button"
                onClick={() => {
                  deleteReview();
                }}
              >
                <span className="font-jersey-25 text-2xl font-bold text-white">
                  DELETE
                </span>
              </button>
              <button
                className="bg-gnn-red w-[12rem] cursor-pointer rounded p-2 shadow"
                type="button"
                onClick={() => {
                  setGame(review.game);
                  setTitle(review.title);
                  setStars(review.stars);
                  setText(review.text);
                  setShowModal(false);
                }}
              >
                <span className="font-jersey-25 text-2xl font-bold text-white">
                  CANCEL
                </span>
              </button>
              <button
                className="bg-gnn-red w-[12rem] cursor-pointer rounded p-2 shadow"
                type="button"
                onClick={() => {
                  updateReview();
                }}
              >
                <span className="font-jersey-25 text-2xl font-bold text-white">
                  UPDATE
                </span>
              </button>
            </div>
          </div>

          <span
            className={`font-jersey-25 text-gnn-white px-4 text-xl text-wrap ${errorMessages.length > 0 ? "" : "invisible"}`}
          >
            {errorMessages.join(" | ") || "hidden"}
          </span>
        </div>
      )}
    </Fragment>
  );
}
