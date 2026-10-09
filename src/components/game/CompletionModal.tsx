import React from "react";
import type { GameStats } from "../../types/game";
import { Trophy, Award, CheckCircle2, XCircle, RotateCcw, Home, Sparkles } from "lucide-react";

interface CompletionModalProps {
  stats: GameStats;
  onRestart: () => void;
  onNextPuzzle?: () => void;
  onGoHome: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  stats,
  onRestart,
  onNextPuzzle,
  onGoHome,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-none animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#FFF9ED] dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-6 sm:p-8 shadow-[8px_8px_0px_#171717] dark:shadow-[8px_8px_0px_#000000] text-center text-[#171717] dark:text-[#F5F5F5] transition-colors">
        {/* Trophy Icon */}
        <div className="w-20 h-20 mx-auto rounded-xl bg-[#FFD84D] border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] text-[#171717] flex items-center justify-center mb-4">
          <Trophy className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-[#171717] dark:text-[#F5F5F5] tracking-tight mb-2">
          Hebat! TTS Selesai!
        </h2>
        <p className="text-sm sm:text-base text-[#171717]/90 dark:text-[#F5F5F5]/80 font-bold max-w-md mx-auto mb-6">
          Seluruh kotak Teka-Teki Silang Gizi telah berhasil dijawab oleh kelas!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 bg-white dark:bg-[#27272A] border-[3px] border-[#171717] dark:border-[#3F3F46] p-4 rounded-xl shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000]">
          <div className="p-2">
            <Award className="w-6 h-6 text-[#FF765E] mx-auto mb-1 stroke-[2.5]" />
            <span className="text-xs text-[#171717] dark:text-[#F5F5F5] block font-black">Skor Akhir</span>
            <span className="text-2xl font-black text-[#2EAD67]">{stats.totalScore}</span>
          </div>

          <div className="p-2 border-x-[2px] border-[#171717] dark:border-[#3F3F46]">
            <CheckCircle2 className="w-6 h-6 text-[#2EAD67] mx-auto mb-1 stroke-[2.5]" />
            <span className="text-xs text-[#171717] dark:text-[#F5F5F5] block font-black">Soal Benar</span>
            <span className="text-2xl font-black text-[#2EAD67]">{stats.correctCount}</span>
          </div>

          <div className="p-2">
            <XCircle className="w-6 h-6 text-[#E84C4F] mx-auto mb-1 stroke-[2.5]" />
            <span className="text-xs text-[#171717] dark:text-[#F5F5F5] block font-black">Salah / Lewati</span>
            <span className="text-2xl font-black text-[#E84C4F]">{stats.incorrectCount}</span>
          </div>
        </div>

        {/* Educational Nutrition Note */}
        <div className="bg-[#A8D8FF] dark:bg-[#1E293B] border-[3px] border-[#171717] dark:border-[#38BDF8] p-4 rounded-xl text-left mb-6 text-[#171717] dark:text-[#F1F5F9] text-xs sm:text-sm font-bold shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000]">
          <strong className="block text-[#171717] dark:text-[#38BDF8] font-black text-sm mb-1">
            Pesan Gizi untuk Remaja Hebat:
          </strong>
          Ingat untuk selalu mengonsumsi makanan beragam dengan porsi gizi seimbang (Isi Piringku), minum air putih minimal 8 gelas sehari, serta rutin berolahraga agar tubuh tetap bugar dan berprestasi!
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {onNextPuzzle && (
            <button
              type="button"
              onClick={onNextPuzzle}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#A8D8FF] hover:bg-[#bce0fd] text-[#171717] font-black rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-sm sm:text-base"
            >
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
              Paket Soal Lain
            </button>
          )}

          <button
            type="button"
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] font-black rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-sm sm:text-base"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            Mainkan Lagi
          </button>

          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-[#27272A] hover:bg-[#EFE9DD] dark:hover:bg-[#3F3F46] text-[#171717] dark:text-[#F5F5F5] font-black rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-sm sm:text-base"
          >
            <Home className="w-5 h-5 stroke-[2.5]" />
            Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

