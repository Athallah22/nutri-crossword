import React, { useState } from "react";
import type { GameStats } from "../../types/game";
import type { Question } from "../../types/puzzle";
import { Trophy, Award, CheckCircle2, XCircle, RotateCcw, Home, Sparkles, BookOpen, Eye } from "lucide-react";
import { AnswerReviewModal } from "./AnswerReviewModal";

interface CompletionModalProps {
  stats: GameStats;
  questions?: Question[];
  puzzleTitle?: string;
  incorrectQuestionIds?: string[];
  onRestart: () => void;
  onNextPuzzle?: () => void;
  onGoHome: () => void;
  onReviewBoard?: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  stats,
  questions = [],
  puzzleTitle = "Teka-Teki Silang Gizi",
  incorrectQuestionIds = [],
  onRestart,
  onNextPuzzle,
  onGoHome,
  onReviewBoard,
}) => {
  const [isAnswerReviewOpen, setIsAnswerReviewOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-none animate-in fade-in duration-200">
        <div className="w-full max-w-xl bg-[#FFF9ED] dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-5 sm:p-7 shadow-[8px_8px_0px_#171717] dark:shadow-[8px_8px_0px_#000000] text-center text-[#171717] dark:text-[#F5F5F5] transition-colors">
          {/* Trophy Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl bg-[#FFD84D] border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] text-[#171717] flex items-center justify-center mb-3 sm:mb-4">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#171717] dark:text-[#F5F5F5] tracking-tight mb-1.5 sm:mb-2">
            Hebat! TTS Selesai!
          </h2>
          <p className="text-xs sm:text-sm text-[#171717]/90 dark:text-[#F5F5F5]/80 font-bold max-w-md mx-auto mb-4 sm:mb-6">
            Seluruh kotak Teka-Teki Silang telah berhasil dijawab oleh kelas!
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5 bg-white dark:bg-[#27272A] border-[3px] border-[#171717] dark:border-[#3F3F46] p-3 sm:p-4 rounded-xl shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000]">
            <div className="p-1 sm:p-2">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF765E] mx-auto mb-1 stroke-[2.5]" />
              <span className="text-[10px] sm:text-xs text-[#171717] dark:text-[#F5F5F5] block font-black">Skor Akhir</span>
              <span className="text-xl sm:text-2xl font-black text-[#2EAD67]">{stats.totalScore}</span>
            </div>

            <div className="p-1 sm:p-2 border-x-[2px] border-[#171717] dark:border-[#3F3F46]">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#2EAD67] mx-auto mb-1 stroke-[2.5]" />
              <span className="text-[10px] sm:text-xs text-[#171717] dark:text-[#F5F5F5] block font-black">Soal Benar</span>
              <span className="text-xl sm:text-2xl font-black text-[#2EAD67]">{stats.correctCount}</span>
            </div>

            <div className="p-1 sm:p-2">
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#E84C4F] mx-auto mb-1 stroke-[2.5]" />
              <span className="text-[10px] sm:text-xs text-[#171717] dark:text-[#F5F5F5] block font-black">Salah / Lewati</span>
              <span className="text-xl sm:text-2xl font-black text-[#E84C4F]">{stats.incorrectCount}</span>
            </div>
          </div>

          {/* Educational Nutrition Note */}
          <div className="bg-[#A8D8FF] dark:bg-[#1E293B] border-[3px] border-[#171717] dark:border-[#38BDF8] p-3 sm:p-4 rounded-xl text-left mb-5 text-[#171717] dark:text-[#F1F5F9] text-xs sm:text-sm font-bold shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000]">
            <strong className="block text-[#171717] dark:text-[#38BDF8] font-black text-xs sm:text-sm mb-1">
              Pesan Edukasi Remaja Putri:
            </strong>
            Cegah anemia dengan makan bergizi seimbang (kaya zat besi & protein), minum TTD 1 tablet seminggu sekali malam sebelum tidur, serta hindari minum teh, kopi, atau susu bersamaan dengan tablet tambah darah!
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-2.5 justify-center">
              {onNextPuzzle && (
                <button
                  type="button"
                  onClick={onNextPuzzle}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3 bg-[#A8D8FF] hover:bg-[#bce0fd] text-[#171717] font-black rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs sm:text-sm"
                >
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  Paket Soal Lain
                </button>
              )}

              <button
                type="button"
                onClick={onRestart}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] font-black rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs sm:text-sm"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                Mainkan Lagi
              </button>
            </div>

            {/* Review & Navigation Buttons */}
            <div className="flex flex-wrap gap-2 justify-center pt-1 border-t border-[#171717]/10 dark:border-[#3F3F46]/50">
              {questions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsAnswerReviewOpen(true)}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white dark:bg-[#27272A] hover:bg-[#FFF9ED] text-[#171717] dark:text-[#F5F5F5] font-black rounded-lg border-[2px] border-[#171717] dark:border-[#3F3F46] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs"
                >
                  <BookOpen className="w-4 h-4 text-[#FF765E] stroke-[2.5]" />
                  Kunci Jawaban
                </button>
              )}

              {onReviewBoard && (
                <button
                  type="button"
                  onClick={onReviewBoard}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white dark:bg-[#27272A] hover:bg-[#FFF9ED] text-[#171717] dark:text-[#F5F5F5] font-black rounded-lg border-[2px] border-[#171717] dark:border-[#3F3F46] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs"
                >
                  <Eye className="w-4 h-4 text-[#2EAD67] stroke-[2.5]" />
                  Lihat Papan TTS
                </button>
              )}

              <button
                type="button"
                onClick={onGoHome}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white dark:bg-[#27272A] hover:bg-[#EFE9DD] dark:hover:bg-[#3F3F46] text-[#171717] dark:text-[#F5F5F5] font-black rounded-lg border-[2px] border-[#171717] dark:border-[#3F3F46] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs"
              >
                <Home className="w-4 h-4 stroke-[2.5]" />
                Beranda
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Review Modal */}
      <AnswerReviewModal
        isOpen={isAnswerReviewOpen}
        puzzleTitle={puzzleTitle}
        questions={questions}
        incorrectQuestionIds={incorrectQuestionIds}
        onClose={() => setIsAnswerReviewOpen(false)}
        onReviewBoard={() => {
          setIsAnswerReviewOpen(false);
          onReviewBoard?.();
        }}
      />
    </>
  );
};

