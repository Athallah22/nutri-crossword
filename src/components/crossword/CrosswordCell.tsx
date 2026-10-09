import React from "react";
import type { CrosswordCellData } from "../../types/puzzle";

interface CrosswordCellProps {
  cell: CrosswordCellData;
  isSelected: boolean;
  isFilled: boolean;
  hintLetter?: string;
  onClick: () => void;
}

export const CrosswordCell: React.FC<CrosswordCellProps> = ({
  cell,
  isSelected,
  isFilled,
  hintLetter,
  onClick,
}) => {
  if (cell.isBlocked) {
    return (
      <div
        className="w-full h-full aspect-square bg-[#EFE9DD] dark:bg-[#18181B] rounded-md border border-[#171717]/30 dark:border-[#3F3F46]/50 transition-colors duration-200"
        aria-hidden="true"
      />
    );
  }

  const displayText = isFilled ? cell.correctLetter : hintLetter || "";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative w-full h-full aspect-square flex items-center justify-center
        rounded-md transition-all duration-150 p-0
        select-none cursor-pointer border-[2.5px] sm:border-[3px] border-[#171717] dark:border-[#3F3F46]
        ${
          isSelected
            ? "bg-[#FFD84D] text-[#171717] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] scale-[1.04] z-10 animate-pulse border-[#171717] dark:border-white"
            : isFilled
            ? "bg-[#A8D8FF] dark:bg-[#38BDF8] text-[#171717] dark:text-[#0F172A] hover:bg-[#90caff] dark:hover:bg-[#0284C7]"
            : hintLetter
            ? "bg-[#FFD84D]/70 dark:bg-[#FFD84D]/80 text-[#171717] border-dashed border-[#171717] dark:border-[#FFD84D] animate-pulse"
            : "bg-[#FFFFFF] dark:bg-[#27272A] text-[#171717] dark:text-[#F5F5F5] hover:bg-[#FFF9ED] dark:hover:bg-[#3F3F46] hover:border-[#FF765E]"
        }
      `}
      title={cell.number ? `Nomor ${cell.number}` : undefined}
    >
      {/* Corner number indicator */}
      {cell.number && (
        <span
          className={`absolute top-0.5 left-0.5 sm:top-1 sm:left-1 text-[8px] sm:text-[10px] font-black leading-none pointer-events-none select-none z-10 ${
            isSelected || isFilled || hintLetter
              ? "text-[#171717]"
              : "text-[#171717] dark:text-[#E4E4E7]"
          }`}
        >
          {cell.number}
        </span>
      )}

      {/* Letter text */}
      {displayText && (
        <span className="font-black text-base sm:text-lg md:text-xl leading-none flex items-center justify-center text-center uppercase select-none">
          {displayText}
        </span>
      )}
    </button>
  );
};

