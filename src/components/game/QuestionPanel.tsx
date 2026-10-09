import React from "react";
import type { Question } from "../../types/puzzle";
import type { RoundStatus } from "../../types/game";
import { Sparkles, HelpCircle, Lightbulb, Check } from "lucide-react";

interface QuestionPanelProps {
  question: Question | null;
  roundStatus: RoundStatus;
  hintsUsed: number;
  unfilledCount?: number;
  isAntiSpoilActive?: boolean;
  onUseHint: () => void;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  roundStatus,
  hintsUsed,
  unfilledCount = 0,
  isAntiSpoilActive = false,
  onUseHint,
}) => {
  if (!question) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-white dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] transition-colors duration-200 min-h-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#FFD84D] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] flex items-center justify-center text-[#171717] mb-3 animate-bounce">
          <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </div>
        <h3 className="text-lg sm:text-xl font-black text-[#171717] dark:text-[#F5F5F5] mb-1.5">
          Siap Memulai Ronde!
        </h3>
        <p className="text-xs sm:text-sm text-[#171717]/80 dark:text-[#F5F5F5]/70 font-bold max-w-xs leading-relaxed">
          Fasilitator, silakan klik salah satu <strong className="text-[#FF765E] underline decoration-2">nomor soal</strong> pada kotak TTS untuk memutar musik dan memulai oper pena.
        </p>
      </div>
    );
  }

  const directionLabel = question.direction === "across" ? "Mendatar" : "Menurun";
  const remainingHints = Math.max(0, 3 - hintsUsed);
  const showTextClue = hintsUsed >= 2;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-3.5 sm:p-4 shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] justify-between transition-colors duration-200 min-h-0 overflow-y-auto">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#FFD84D] text-[#171717] border-[2px] border-[#171717] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] px-2.5 py-0.5 rounded-md font-black text-xs sm:text-sm">
              {directionLabel.toUpperCase()} #{question.number}
            </span>
            <span className="bg-[#A8D8FF] text-[#171717] border-[2px] border-[#171717] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-black">
              {question.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] sm:text-xs font-black text-[#171717] dark:text-[#F5F5F5] bg-[#EFE9DD] dark:bg-[#27272A] border-[2px] border-[#171717] dark:border-[#3F3F46] px-2 py-0.5 rounded-md shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000]">
              {question.answer.length} Huruf
            </span>
            {unfilledCount > 0 && (
              <span className="text-[11px] sm:text-xs font-black text-[#171717] bg-[#FFD84D] border-[2px] border-[#171717] px-1.5 py-0.5 rounded-md shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000]">
                {unfilledCount} Kosong
              </span>
            )}
          </div>
        </div>

        {/* Question Clue */}
        <div className="mt-1 mb-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#171717] dark:text-[#F5F5F5] leading-snug tracking-tight">
            "{question.clue}"
          </h2>
        </div>

        {/* Anti-Spoil Protection Callout Banner */}
        {isAntiSpoilActive && (
          <div className="mb-2.5 bg-[#A8D8FF] text-[#171717] border-[2px] border-[#171717] dark:border-[#3F3F46] p-2.5 rounded-lg shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] text-[11px] sm:text-xs font-bold flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#171717] flex-shrink-0 mt-0.5 stroke-[2.5]" />
            <div>
              <strong className="text-[#171717] block font-black uppercase text-[10px] tracking-wide">
                Proteksi Anti-Bocoran (Anti-Spoil)
              </strong>
              Tinggal 1 huruf kosong tersisa! Pembukaan huruf otomatis dinonaktifkan agar siswa menebak sendiri.
            </div>
          </div>
        )}

        {/* 3-Tier Hint Section */}
        <div className="space-y-2 bg-[#FFF9ED] dark:bg-[#27272A] border-[3px] border-[#171717] dark:border-[#3F3F46] p-3 rounded-xl shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#171717] dark:text-[#F5F5F5] flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-[#171717] dark:text-[#FFD84D] stroke-[2.5]" />
              Bantuan Hint
            </span>

            {/* Hint Progress Badges (1, 2, 3) */}
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((lvl) => (
                <span
                  key={lvl}
                  className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black border border-[#171717] dark:border-[#3F3F46] transition-all ${
                    hintsUsed >= lvl
                      ? "bg-[#2EAD67] text-white shadow-[1px_1px_0px_#171717] dark:shadow-[1px_1px_0px_#000000]"
                      : "bg-[#EFE9DD] dark:bg-[#18181B] text-[#171717]/60 dark:text-[#A1A1AA]"
                  }`}
                >
                  {hintsUsed >= lvl ? <Check className="w-3 h-3 stroke-[3]" /> : lvl}
                </span>
              ))}
            </div>
          </div>

          {/* Unlocked Hint Details */}
          {hintsUsed >= 1 && !isAntiSpoilActive && (
            <div className="text-[11px] sm:text-xs text-[#171717] dark:text-[#F5F5F5] bg-white dark:bg-[#1E1E20] border border-[#171717] dark:border-[#3F3F46] p-2 rounded-md shadow-[1px_1px_0px_#171717] dark:shadow-[1px_1px_0px_#000000] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF765E] flex-shrink-0 stroke-[2.5]" />
              <span className="font-bold">
                <strong>Hint 1:</strong> Huruf kosong pertama dibuka pada kotak TTS.
              </span>
            </div>
          )}

          {showTextClue && question.hint && (
            <div className="text-[11px] sm:text-xs text-[#171717] dark:text-[#F5F5F5] bg-white dark:bg-[#1E1E20] border border-[#171717] dark:border-[#3F3F46] p-2 rounded-md shadow-[1px_1px_0px_#171717] dark:shadow-[1px_1px_0px_#000000] flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF765E] flex-shrink-0 mt-0.5 stroke-[2.5]" />
              <div className="font-bold">
                <strong className="text-[#FF765E] block">Hint 2:</strong> {question.hint}
              </div>
            </div>
          )}

          {hintsUsed >= 3 && !isAntiSpoilActive && (
            <div className="text-[11px] sm:text-xs text-[#171717] dark:text-[#F5F5F5] bg-white dark:bg-[#1E1E20] border border-[#171717] dark:border-[#3F3F46] p-2 rounded-md shadow-[1px_1px_0px_#171717] dark:shadow-[1px_1px_0px_#000000] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF765E] flex-shrink-0 stroke-[2.5]" />
              <span className="font-bold">
                <strong>Hint 3:</strong> Huruf kosong terakhir dibuka pada kotak TTS.
              </span>
            </div>
          )}

          {/* Trigger Hint Button */}
          {isAntiSpoilActive ? (
            !showTextClue ? (
              <button
                type="button"
                onClick={onUseHint}
                className="w-full py-2 px-3 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] border-[2px] border-[#171717] rounded-lg font-black text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Buka Petunjuk Teks Ekstra</span>
              </button>
            ) : (
              <div className="text-center text-[10px] sm:text-[11px] text-[#171717]/80 dark:text-[#F5F5F5]/70 font-black py-0.5">
                Petunjuk teks dibuka. Ajak siswa menebak huruf terakhir!
              </div>
            )
          ) : remainingHints > 0 ? (
            <button
              type="button"
              onClick={onUseHint}
              className="w-full py-2 px-3 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] border-[2px] border-[#171717] rounded-lg font-black text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>
                Buka Hint #{hintsUsed + 1} ({remainingHints}x Tersisa)
              </span>
            </button>
          ) : (
            <div className="text-center text-[10px] text-[#171717]/70 dark:text-[#F5F5F5]/60 font-black py-0.5">
              Seluruh 3 bantuan telah digunakan
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-2 border-t-[2px] border-[#171717] dark:border-[#3F3F46] flex items-center justify-between text-xs font-black text-[#171717] dark:text-[#F5F5F5]">
        <span>Nilai: <strong className="text-[#2EAD67]">+{question.points} Poin</strong></span>
        <span>Status: <strong className="bg-[#A8D8FF] text-[#171717] px-2 py-0.5 rounded border border-[#171717] capitalize">{roundStatus}</strong></span>
      </div>
    </div>
  );
};


