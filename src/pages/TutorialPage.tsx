import React from "react";
import { ArrowLeft, Play, MousePointerClick, Music, MessageSquareText, ShieldAlert } from "lucide-react";
import { ThemeToggle } from "../components/common/ThemeToggle";
import type { Theme } from "../hooks/useTheme";

interface TutorialPageProps {
  theme?: Theme;
  onToggleTheme?: () => void;
  onBack: () => void;
  onStartGame: () => void;
}

export const TutorialPage: React.FC<TutorialPageProps> = ({
  theme = "light",
  onToggleTheme,
  onBack,
  onStartGame,
}) => {
  return (
    <main className="min-h-screen w-full bg-[#FFF9ED] dark:bg-[#121212] text-[#171717] dark:text-[#F5F5F5] p-4 sm:p-8 flex flex-col justify-between transition-colors duration-200">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1E1E20] hover:bg-[#EFE9DD] dark:hover:bg-[#27272A] text-[#171717] dark:text-[#F5F5F5] rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer font-black text-sm"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center space-x-2">
            {onToggleTheme && (
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            )}
            <span className="text-xs sm:text-sm font-black text-[#171717] bg-[#FFD84D] px-3 py-1 rounded-md border-2 border-[#171717] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000]">
              Panduan Fasilitator & Kelas
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] dark:text-[#F5F5F5] tracking-tight mb-3">
            Cara Bermain TTS Gizi
          </h1>
          <p className="text-sm sm:text-base text-[#171717]/80 dark:text-[#F5F5F5]/70 font-bold max-w-xl mx-auto">
            Ikuti 3 langkah mudah berikut untuk menjalankan sesi permainan oper pena yang seru dan edukatif!
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Step 1 */}
          <div className="bg-white dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-6 shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FFD84D] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] text-[#171717] font-black text-2xl flex items-center justify-center mb-4">
                1
              </div>
              <div className="flex items-center gap-2 text-[#171717] dark:text-[#F5F5F5] text-sm font-black mb-2">
                <MousePointerClick className="w-4 h-4 stroke-[2.5]" />
                <span>Pilih Nomor Soal</span>
              </div>
              <h3 className="text-lg font-black text-[#171717] dark:text-[#F5F5F5] mb-2">
                Fasilitator Klik Grid
              </h3>
              <p className="text-xs sm:text-sm text-[#171717]/80 dark:text-[#F5F5F5]/70 font-bold leading-relaxed">
                Fasilitator mengklik salah satu nomor pada kotak TTS. Petunjuk soal akan muncul dan musik langsung berputar secara otomatis.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-6 shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#A8D8FF] text-[#171717] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] font-black text-2xl flex items-center justify-center mb-4">
                2
              </div>
              <div className="flex items-center gap-2 text-[#171717] dark:text-[#F5F5F5] text-sm font-black mb-2">
                <Music className="w-4 h-4 stroke-[2.5]" />
                <span>Musik Berputar</span>
              </div>
              <h3 className="text-lg font-black text-[#171717] dark:text-[#F5F5F5] mb-2">
                Oper Pena di Kelas!
              </h3>
              <p className="text-xs sm:text-sm text-[#171717]/80 dark:text-[#F5F5F5]/70 font-bold leading-relaxed">
                Selama musik berputar (acak 15–30 detik), seluruh siswa mengoper pena secara bergantian dengan tertib.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-6 shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FF765E] text-[#171717] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] font-black text-2xl flex items-center justify-center mb-4">
                3
              </div>
              <div className="flex items-center gap-2 text-[#171717] dark:text-[#F5F5F5] text-sm font-black mb-2">
                <MessageSquareText className="w-4 h-4 stroke-[2.5]" />
                <span>Musik Berhenti</span>
              </div>
              <h3 className="text-lg font-black text-[#171717] dark:text-[#F5F5F5] mb-2">
                Jawab & Nilai
              </h3>
              <p className="text-xs sm:text-sm text-[#171717]/80 dark:text-[#F5F5F5]/70 font-bold leading-relaxed">
                Siswa pemegang pena menjawab lisan. Fasilitator menekan tombol "Benar" (+100 poin) atau "Salah". Kotak TTS terisi otomatis!
              </p>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-[#FFF9ED] dark:bg-[#27272A] border-[3px] border-[#171717] dark:border-[#3F3F46] p-5 rounded-xl shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] flex items-start gap-3 mb-8 text-[#171717] dark:text-[#F5F5F5] text-xs sm:text-sm font-bold">
          <ShieldAlert className="w-6 h-6 text-[#E84C4F] flex-shrink-0 mt-0.5 stroke-[2.5]" />
          <div>
            <strong className="block text-[#E84C4F] font-black text-sm mb-1">
              Aturan Ketertiban & Keselamatan Kelas:
            </strong>
            Pastikan pena dioper dengan cara menyerahkan langsung dari tangan ke tangan. Dilarang keras melempar pena atau berlari di dalam ruangan kelas.
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onStartGame}
            className="px-8 py-4 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] font-black rounded-xl text-lg border-[4px] border-[#171717] shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-current stroke-[2.5]" />
            <span>Mulai Permainan TTS Sekarang</span>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-[#171717]/60 dark:text-[#F5F5F5]/50 font-black pt-8">
        TTS Gizi — Permainan Edukasi Berkelompok
      </div>
    </main>
  );
};

