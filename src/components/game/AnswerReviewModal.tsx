import React from "react";
import type { Question } from "../../types/puzzle";
import { BookOpen, X, Eye, ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

interface AnswerReviewModalProps {
  isOpen: boolean;
  puzzleTitle: string;
  questions: Question[];
  incorrectQuestionIds?: string[];
  onClose: () => void;
  onReviewBoard: () => void;
}

export const AnswerReviewModal: React.FC<AnswerReviewModalProps> = ({
  isOpen,
  puzzleTitle,
  questions,
  incorrectQuestionIds = [],
  onClose,
  onReviewBoard,
}) => {
  if (!isOpen) return null;

  const acrossQuestions = questions.filter((q) => q.direction === "across");
  const downQuestions = questions.filter((q) => q.direction === "down");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-none animate-in fade-in duration-150">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#FFF9ED] dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-2xl shadow-[8px_8px_0px_#171717] dark:shadow-[8px_8px_0px_#000000] flex flex-col overflow-hidden text-[#171717] dark:text-[#F5F5F5] transition-colors">
        {/* Header */}
        <div className="px-5 py-4 border-b-[3px] border-[#171717] dark:border-[#3F3F46] bg-[#FFD84D] text-[#171717] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white border-[2px] border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                Kunci Jawaban & Pembahasan
              </h3>
              <p className="text-xs font-bold text-[#171717]/80 truncate max-w-md">
                {puzzleTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white hover:bg-[#FF765E] hover:text-white border-[2px] border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Content List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Section Mendatar */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#A8D8FF] text-[#171717] border-[2px] border-[#171717] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] px-3 py-1 rounded-md text-xs sm:text-sm font-black uppercase tracking-wider">
                Mendatar ({acrossQuestions.length} Soal)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {acrossQuestions.map((q) => {
                const wasIncorrect = incorrectQuestionIds.includes(q.id);
                return (
                  <div
                    key={q.id}
                    className="bg-white dark:bg-[#27272A] border-[3px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-3.5 shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-black text-xs sm:text-sm bg-[#FFD84D] text-[#171717] px-2 py-0.5 rounded border border-[#171717]">
                          #{q.number} Mendatar
                        </span>
                        {wasIncorrect ? (
                          <span className="text-[10px] font-black text-[#E84C4F] bg-[#FF765E]/15 border border-[#E84C4F] px-1.5 py-0.5 rounded flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Sempat Dilewati / Salah
                          </span>
                        ) : (
                          <span className="text-[10px] font-black text-[#2EAD67] bg-[#2EAD67]/15 border border-[#2EAD67] px-1.5 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Terjawab Benar
                          </span>
                        )}
                      </div>

                      {/* Jawaban Highlight */}
                      <div className="mb-2">
                        <span className="text-xs font-bold text-[#171717]/70 dark:text-[#F5F5F5]/70 block">
                          Jawaban:
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-black text-base sm:text-lg tracking-wider text-[#171717] dark:text-[#38BDF8] bg-[#FFF9ED] dark:bg-[#18181B] border-[2px] border-[#171717] dark:border-[#3F3F46] px-2.5 py-0.5 rounded-lg">
                            {q.answer}
                          </span>
                          <span className="text-[11px] font-bold text-[#171717]/70 dark:text-[#F5F5F5]/70">
                            ({q.answer.length} Huruf) • {q.category}
                          </span>
                        </div>
                      </div>

                      {/* Pertanyaan / Clue */}
                      <p className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F5] leading-snug mb-2">
                        "{q.clue}"
                      </p>
                    </div>

                    {/* Hint Edukasi */}
                    {q.hint && (
                      <div className="mt-2 bg-[#FFF9ED] dark:bg-[#18181B] border border-[#171717]/30 dark:border-[#3F3F46] p-2 rounded-lg text-[11px] font-bold text-[#171717]/80 dark:text-[#F5F5F5]/80 flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-[#FFD84D] stroke-[2.5] flex-shrink-0 mt-0.5" />
                        <span>{q.hint}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section Menurun */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#FF765E] text-white border-[2px] border-[#171717] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] px-3 py-1 rounded-md text-xs sm:text-sm font-black uppercase tracking-wider">
                Menurun ({downQuestions.length} Soal)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {downQuestions.map((q) => {
                const wasIncorrect = incorrectQuestionIds.includes(q.id);
                return (
                  <div
                    key={q.id}
                    className="bg-white dark:bg-[#27272A] border-[3px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-3.5 shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-black text-xs sm:text-sm bg-[#FF765E] text-white px-2 py-0.5 rounded border border-[#171717]">
                          #{q.number} Menurun
                        </span>
                        {wasIncorrect ? (
                          <span className="text-[10px] font-black text-[#E84C4F] bg-[#FF765E]/15 border border-[#E84C4F] px-1.5 py-0.5 rounded flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Sempat Dilewati / Salah
                          </span>
                        ) : (
                          <span className="text-[10px] font-black text-[#2EAD67] bg-[#2EAD67]/15 border border-[#2EAD67] px-1.5 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Terjawab Benar
                          </span>
                        )}
                      </div>

                      {/* Jawaban Highlight */}
                      <div className="mb-2">
                        <span className="text-xs font-bold text-[#171717]/70 dark:text-[#F5F5F5]/70 block">
                          Jawaban:
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-black text-base sm:text-lg tracking-wider text-[#171717] dark:text-[#38BDF8] bg-[#FFF9ED] dark:bg-[#18181B] border-[2px] border-[#171717] dark:border-[#3F3F46] px-2.5 py-0.5 rounded-lg">
                            {q.answer}
                          </span>
                          <span className="text-[11px] font-bold text-[#171717]/70 dark:text-[#F5F5F5]/70">
                            ({q.answer.length} Huruf) • {q.category}
                          </span>
                        </div>
                      </div>

                      {/* Pertanyaan / Clue */}
                      <p className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F5] leading-snug mb-2">
                        "{q.clue}"
                      </p>
                    </div>

                    {/* Hint Edukasi */}
                    {q.hint && (
                      <div className="mt-2 bg-[#FFF9ED] dark:bg-[#18181B] border border-[#171717]/30 dark:border-[#3F3F46] p-2 rounded-lg text-[11px] font-bold text-[#171717]/80 dark:text-[#F5F5F5]/80 flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-[#FFD84D] stroke-[2.5] flex-shrink-0 mt-0.5" />
                        <span>{q.hint}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t-[3px] border-[#171717] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-[#1E1E20] hover:bg-[#EFE9DD] dark:hover:bg-[#3F3F46] text-[#171717] dark:text-[#F5F5F5] font-black rounded-lg border-[2px] border-[#171717] dark:border-[#3F3F46] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs sm:text-sm"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            Kembali ke Skor Akhir
          </button>

          <button
            type="button"
            onClick={onReviewBoard}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] font-black rounded-lg border-[2px] border-[#171717] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs sm:text-sm"
          >
            <Eye className="w-4 h-4 stroke-[2.5]" />
            Lihat di Papan TTS
          </button>
        </div>
      </div>
    </div>
  );
};
