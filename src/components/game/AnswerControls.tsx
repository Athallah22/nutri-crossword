import React, { useEffect } from "react";
import type { RoundStatus } from "../../types/game";
import { CheckCircle, XCircle, Ban, RotateCcw, BookOpenCheck } from "lucide-react";

interface AnswerControlsProps {
  roundStatus: RoundStatus;
  isQuestionSelected: boolean;
  onMarkCorrect: () => void;
  onMarkIncorrect: () => void;
  onSkipQuestion: () => void;
  onRevealAnswerZeroPoints: () => void;
  onCancelRound: () => void;
}

export const AnswerControls: React.FC<AnswerControlsProps> = ({
  roundStatus,
  isQuestionSelected,
  onMarkCorrect,
  onMarkIncorrect,
  onSkipQuestion,
  onRevealAnswerZeroPoints,
  onCancelRound,
}) => {
  // Facilitator keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (roundStatus === "answering") {
        if (e.key === "1" || e.key === "Enter") {
          e.preventDefault();
          onMarkCorrect();
        } else if (e.key === "0" || e.key === "Backspace") {
          e.preventDefault();
          onMarkIncorrect();
        }
      }

      if (roundStatus === "wrong-action") {
        if (e.key === "1") {
          e.preventDefault();
          onSkipQuestion();
        } else if (e.key === "2" || e.key === "Enter") {
          e.preventDefault();
          onRevealAnswerZeroPoints();
        }
      }

      if (
        e.key === "Escape" &&
        (roundStatus === "playing" ||
          roundStatus === "answering" ||
          roundStatus === "wrong-action")
      ) {
        e.preventDefault();
        onCancelRound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    roundStatus,
    onMarkCorrect,
    onMarkIncorrect,
    onSkipQuestion,
    onRevealAnswerZeroPoints,
    onCancelRound,
  ]);

  const isAnswering = roundStatus === "answering";
  const isPlaying = roundStatus === "playing";
  const isWrongAction = roundStatus === "wrong-action";

  return (
    <div className="w-full bg-white dark:bg-[#1E1E20] border-[3px] sm:border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] flex flex-wrap items-center justify-between gap-2.5 transition-colors">
      {/* Facilitator label */}
      <div className="flex items-center space-x-2">
        <span
          className={`w-3 h-3 rounded-full border-2 border-[#171717] dark:border-[#3F3F46] ${
            isWrongAction
              ? "bg-[#E84C4F] animate-ping"
              : "bg-[#FFD84D]"
          }`}
        />
        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#171717] dark:text-[#F5F5F5]">
          {isWrongAction ? "Tindakan Jawaban Salah:" : "Kontrol Fasilitator:"}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
        {/* Cancel button if round is playing or answering */}
        {(isPlaying || isAnswering) && (
          <button
            type="button"
            onClick={onCancelRound}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#EFE9DD] dark:bg-[#27272A] hover:bg-white dark:hover:bg-[#3F3F46] text-[#171717] dark:text-[#F5F5F5] border-[2px] border-[#171717] dark:border-[#3F3F46] rounded-lg font-black text-xs shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            title="Batalkan ronde yang sedang berjalan"
          >
            <Ban className="w-3.5 h-3.5 text-[#E84C4F] stroke-[2.5]" />
            <span>Batalkan Ronde</span>
            <kbd className="hidden sm:inline-block bg-white dark:bg-[#18181B] border border-[#171717] dark:border-[#3F3F46] px-1 py-0.2 rounded text-[10px] text-[#171717] dark:text-[#F5F5F5] font-black">
              Esc
            </kbd>
          </button>
        )}

        {/* Evaluation buttons visible during ANSWERING state */}
        {isAnswering && (
          <>
            <button
              type="button"
              onClick={onMarkIncorrect}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-[#E84C4F] hover:bg-[#ff5c5f] text-white border-[2px] border-[#171717] dark:border-[#3F3F46] rounded-lg font-black text-xs sm:text-sm shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <XCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Salah / Buntu</span>
              <kbd className="hidden sm:inline-block bg-black/20 border border-white/40 px-1.5 py-0.2 rounded text-[10px] text-white font-black">
                0
              </kbd>
            </button>

            <button
              type="button"
              onClick={onMarkCorrect}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2 bg-[#2EAD67] hover:bg-[#34c475] text-white border-[2px] border-[#171717] dark:border-[#3F3F46] rounded-lg font-black text-xs sm:text-sm shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer animate-pulse"
            >
              <CheckCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Jawaban Benar (+100)</span>
              <kbd className="hidden sm:inline-block bg-black/20 border border-white/40 px-1.5 py-0.2 rounded text-[10px] text-white font-black">
                Enter
              </kbd>
            </button>
          </>
        )}

        {/* Options when student answered incorrectly (Wrong Action) */}
        {isWrongAction && (
          <>
            <button
              type="button"
              onClick={onSkipQuestion}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#A8D8FF] hover:bg-[#bde0fe] text-[#171717] border-[2px] border-[#171717] dark:border-[#3F3F46] rounded-lg font-black text-xs shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Lewati (Coba Lagi Nanti)</span>
              <kbd className="hidden sm:inline-block bg-white dark:bg-[#18181B] border border-[#171717] dark:border-[#3F3F46] px-1 py-0.2 rounded text-[10px] text-[#171717] dark:text-[#F5F5F5] font-black">
                1
              </kbd>
            </button>

            <button
              type="button"
              onClick={onRevealAnswerZeroPoints}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#FFD84D] hover:bg-[#ffe270] text-[#171717] border-[2px] border-[#171717] dark:border-[#3F3F46] rounded-lg font-black text-xs shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <BookOpenCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Buka Kunci Jawaban (0 Poin)</span>
              <kbd className="hidden sm:inline-block bg-white dark:bg-[#18181B] border border-[#171717] dark:border-[#3F3F46] px-1 py-0.2 rounded text-[10px] text-[#171717] dark:text-[#F5F5F5] font-black">
                Enter
              </kbd>
            </button>
          </>
        )}

        {!isAnswering && !isPlaying && !isWrongAction && (
          <div className="text-xs text-[#171717]/80 dark:text-[#F5F5F5]/70 font-bold italic py-1">
            {isQuestionSelected
              ? "Soal terpilih. Tunggu musik selesai..."
              : "Pilih nomor soal pada kotak TTS untuk memulai."}
          </div>
        )}
      </div>
    </div>
  );
};
