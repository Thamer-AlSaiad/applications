import { StarIcon } from "./icons/starIcon";
export function RatingStars({ rating }) {
  let stars = [];

  for (let i = 1; i < 6; i++) {
    let star = (
      <div key={i} className="w-5">
        <StarIcon key={i} color={i <= rating ? "#edcf5d" : "gray"} />
      </div>
    );
    stars.push(star);
  }
  return stars;
}
