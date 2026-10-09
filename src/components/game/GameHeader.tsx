import React, { useState } from "react";
import type { GameStats } from "../../types/game";
import type { Theme } from "../../hooks/useTheme";
import { Volume2, HelpCircle, Maximize2, Minimize2, RotateCcw } from "lucide-react";
import { ThemeToggle } from "../common/ThemeToggle";
import { ResetConfirmModal } from "./ResetConfirmModal";

interface GameHeaderProps {
  stats: GameStats;
  roundNumber: number;
  puzzleIndex?: number;
  totalPuzzles?: number;
  puzzleTitle?: string;
  theme?: Theme;
  onToggleTheme?: () => void;
  onOpenAudioSettings: () => void;
  onOpenTutorial: () => void;
  onResetGame: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  stats,
  roundNumber,
  puzzleTitle,
  theme = "light",
  onToggleTheme,
  onOpenAudioSettings,
  onOpenTutorial,
  onResetGame,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => { });
      setIsFullscreen(false);
    }
  };

  const handleConfirmReset = () => {
    setIsResetModalOpen(false);
    onResetGame();
  };

  return (
    <>
      <header className="w-full bg-white dark:bg-[#1E1E20] border-b-[3px] border-[#171717] dark:border-[#3F3F46] text-[#171717] dark:text-[#F5F5F5] py-3 px-4 sm:px-6 shadow-[0px_4px_0px_#171717] dark:shadow-[0px_4px_0px_#000000] transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Brand / Title */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="TTS Gizi"
              className="w-11 h-11 object-contain drop-shadow-[2px_2px_0px_#171717] dark:drop-shadow-[2px_2px_0px_#000000] select-none hover:scale-105 transition-transform"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#171717] dark:text-[#F5F5F5] flex items-center gap-2">
                TTS GIZI
              </h1>
              <p className="text-xs text-[#171717]/80 dark:text-[#F5F5F5]/70 font-bold hidden sm:block">
                {puzzleTitle || "Media Edukasi Interaktif Kelas & Proyektor"}
              </p>
            </div>
          </div>

          {/* Center: Live Stats Badges */}
          <div className="flex items-center gap-3 sm:gap-6 bg-[#FFF9ED] dark:bg-[#27272A] border-[3px] border-[#171717] dark:border-[#3F3F46] px-4 py-2 rounded-xl shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000]">
            <div className="text-center">
              <span className="text-[10px] sm:text-xs text-[#171717] dark:text-[#F5F5F5]/80 font-black uppercase tracking-wider block">
                Ronde
              </span>
              <span className="text-lg sm:text-2xl font-black text-[#171717] dark:text-[#F5F5F5]">
                #{roundNumber}
              </span>
            </div>

            <div className="h-7 w-[2px] bg-[#171717] dark:bg-[#3F3F46]" />

            <div className="text-center">
              <span className="text-[10px] sm:text-xs text-[#171717] dark:text-[#F5F5F5]/80 font-black uppercase tracking-wider block">
                Skor Total
              </span>
              <span className="text-lg sm:text-2xl font-black text-[#2EAD67]">
                {stats.totalScore}
              </span>
            </div>

            <div className="h-7 w-[2px] bg-[#171717] dark:bg-[#3F3F46]" />

            <div className="text-center">
              <span className="text-[10px] sm:text-xs text-[#171717] dark:text-[#F5F5F5]/80 font-black uppercase tracking-wider block">
                Progres Soal
              </span>
              <span className="text-lg sm:text-2xl font-black text-[#FF765E]">
                {stats.completedQuestions}/{stats.totalQuestions}
              </span>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center space-x-2">
            {onToggleTheme && (
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            )}

            <button
              type="button"
              onClick={onOpenAudioSettings}
              className="p-2.5 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] rounded-lg border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              title="Pengaturan Audio & Musik"
            >
              <Volume2 className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={onOpenTutorial}
              className="p-2.5 bg-[#A8D8FF] hover:bg-[#bce0fd] text-[#171717] rounded-lg border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              title="Petunjuk & Cara Bermain"
            >
              <HelpCircle className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2.5 bg-[#EFE9DD] dark:bg-[#27272A] hover:bg-white dark:hover:bg-[#3F3F46] text-[#171717] dark:text-[#F5F5F5] rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer hidden md:flex"
              title="Tampilan Layar Penuh (Proyektor)"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5 stroke-[2.5]" /> : <Maximize2 className="w-5 h-5 stroke-[2.5]" />}
            </button>

            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="p-2.5 bg-[#FF765E] hover:bg-[#ff8f7a] text-[#171717] rounded-lg border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              title="Ulangi & Acak Paket Permainan"
            >
              <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Centered Neobrutalism Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </>
  );
};


