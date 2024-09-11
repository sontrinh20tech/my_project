import { StarIcon } from "@heroicons/react/24/outline";

export default function Star({
  current,
  activeColor = "text-yellow-400",
  deactiveColor = "text-gray-300",
}: {
  current: number;
  activeColor?: string;
  deactiveColor?: string;
}) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((rating) => (
        <StarIcon
          key={rating}
          aria-hidden="true"
          className={`${
            current > rating ? activeColor : deactiveColor
          } h-5 w-5 flex-shrink-0`}
        />
      ))}
    </>
  );
}
