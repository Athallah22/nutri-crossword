import React from "react";
import { Sun, Moon } from "lucide-react";
import type { Theme } from "../../hooks/useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = "",
}) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
      title={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
      className={`p-2.5 rounded-lg border-[3px] border-[#171717] dark:border-[#E5E5E5] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center justify-center ${
        isDark
          ? "bg-[#27272A] hover:bg-[#3F3F46] text-[#FFD84D] shadow-[3px_3px_0px_#000000]"
          : "bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] shadow-[3px_3px_0px_#171717]"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 stroke-[2.5] animate-in spin-in-90 duration-200" />
      ) : (
        <Moon className="w-5 h-5 stroke-[2.5] animate-in spin-in-90 duration-200" />
      )}
    </button>
  );
};
