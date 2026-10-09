import React, { useState } from "react";
import { Play, BookOpen, Volume2, Sparkles, Apple, Heart, Activity } from "lucide-react";
import { AudioSettings } from "../components/audio/AudioSettings";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { useAudio } from "../hooks/useAudio";
import type { Theme } from "../hooks/useTheme";

interface HomePageProps {
  theme?: Theme;
  onToggleTheme?: () => void;
  onStartGame: () => void;
  onOpenTutorial: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  theme = "light",
  onToggleTheme,
  onStartGame,
  onOpenTutorial,
}) => {
  const audio = useAudio();
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#FFF9ED] dark:bg-[#121212] text-[#171717] dark:text-[#F5F5F5] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden transition-colors duration-200">
      {/* Header Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            alt="Logo TTS Gizi"
            className="w-12 h-12 object-contain drop-shadow-[3px_3px_0px_#171717] dark:drop-shadow-[3px_3px_0px_#000000] select-none hover:scale-105 transition-transform"
          />
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#171717] dark:text-[#F5F5F5] block">
              TTS Gizi Seimbang
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {onToggleTheme && (
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          )}

          <button
            type="button"
            onClick={() => setIsAudioModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1E1E20] hover:bg-[#EFE9DD] dark:hover:bg-[#27272A] text-[#171717] dark:text-[#F5F5F5] rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs sm:text-sm font-black"
          >
            <Volume2 className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Pengaturan Audio</span>
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <section className="max-w-4xl mx-auto text-center my-auto py-6 sm:py-10 z-10 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FFD84D] border-[3px] border-[#171717] text-[#171717] px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black mb-4 shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000]">
          <Sparkles className="w-4 h-4 stroke-[2.5]" />
          <span>Game Interaktif: Oper Pena & Musik Acak</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#171717] dark:text-[#F5F5F5] tracking-tight leading-tight mb-3">
          TEKA-TEKI SILANG <br />
          <span className="bg-[#A8D8FF] text-[#171717] px-4 py-1 border-[4px] border-[#171717] inline-block shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] mt-2 transform -rotate-1">
            GIZI SEIMBANG
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-xl md:text-2xl text-[#171717]/90 dark:text-[#F5F5F5]/90 font-black max-w-2xl mx-auto mb-10 leading-relaxed mt-4">
          Uji Wawasan Gizimu, dan Taklukkan Tantangannya!
        </p>

        {/* Feature Icons Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 text-[#171717] dark:text-[#F5F5F5] text-xs sm:text-sm font-black">
          <div className="flex items-center gap-2 bg-white dark:bg-[#1E1E20] px-4 py-2.5 rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000]">
            <Apple className="w-4 h-4 text-[#FF765E] stroke-[2.5]" />
            <span>Materi Gizi Remaja</span>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-[#1E1E20] px-4 py-2.5 rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000]">
            <Activity className="w-4 h-4 text-[#2EAD67] stroke-[2.5]" />
            <span>Musik Acak 15–30s</span>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-[#1E1E20] px-4 py-2.5 rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000]">
            <Heart className="w-4 h-4 text-[#E84C4F] stroke-[2.5]" />
            <span>Ramah Layar Proyektor</span>
          </div>
        </div>

        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onStartGame}
            className="w-full sm:w-auto px-8 py-4 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] font-black rounded-xl text-lg sm:text-xl border-[4px] border-[#171717] shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-current stroke-[2.5]" />
            <span>Mulai Bermain Sekarang</span>
          </button>

          <button
            type="button"
            onClick={onOpenTutorial}
            className="w-full sm:w-auto px-7 py-4 bg-white dark:bg-[#1E1E20] hover:bg-[#EFE9DD] dark:hover:bg-[#27272A] text-[#171717] dark:text-[#F5F5F5] font-black rounded-xl text-base sm:text-lg border-[4px] border-[#171717] dark:border-[#3F3F46] shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 stroke-[2.5]" />
            <span>Cara & Aturan Main</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-xs text-[#171717]/70 dark:text-[#F5F5F5]/60 font-black py-4 border-t-[2px] border-[#171717] dark:border-[#3F3F46] z-10">
        TTS Gizi — Media Edukasi Gizi Interaktif & Teka-Teki Silang Berbasis Web.
      </footer>

      {/* Audio Settings Modal */}
      <AudioSettings
        preferences={audio.preferences}
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        onVolumeChange={audio.setVolume}
        onTrackChange={audio.setTrack}
        onToggleMute={audio.toggleMute}
        onToggleSfx={audio.toggleSfx}
        onTestMusic={audio.testMusic}
        onStopTest={audio.stopTest}
      />
    </main>
  );
};

