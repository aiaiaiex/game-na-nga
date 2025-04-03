import { JSX } from "react";

import StarIcon from "../../assets/svgs/star.svg?react";

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
      <div className="flex w-full flex-row items-start justify-between">
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
      <div className="bg-gnn-white my-2 w-full rounded px-2 shadow">
        <span className="font-jersey-25 text-2xl text-wrap break-words">
          {text}
        </span>
      </div>
      <div className="flex w-full flex-row items-start justify-between">
        <span className="font-jersey-25 text-wrap break-words">{author}</span>
        <span className="font-jersey-25 text-wrap break-words">
          {timestamp.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
