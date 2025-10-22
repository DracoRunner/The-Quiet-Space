import type React from "react";
import type { Confession } from "##/types/common";

interface ConfessionCardProps {
  confession: Confession;
  onClick: () => void;
}

const TRUNCATE_LENGTH = 200;

const ConfessionCard: React.FC<ConfessionCardProps> = ({
  confession,
  onClick,
}) => {
  const date = new Date(confession.createdAt);
  const timeString =
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) +
    ", " +
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const truncatedText =
    confession.content.length > TRUNCATE_LENGTH
      ? `${confession.content.substring(0, TRUNCATE_LENGTH)}...`
      : confession.content;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col h-full bg-stone-50/80 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B48B7F]"
      aria-label="Read full confession"
    >
      <p className="font-lora text-gray-800 italic text-lg whitespace-pre-wrap flex-grow">
        {truncatedText}
      </p>
      <div className="flex justify-between items-center mt-6 pt-3 border-t border-stone-200">
        <p className="text-xs text-gray-400">{timeString}</p>
        <p className="text-sm font-medium text-gray-500">— Anonymous</p>
      </div>
    </button>
  );
};

export default ConfessionCard;
