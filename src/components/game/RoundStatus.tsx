import React from "react";
import type { RoundStatus as RoundStatusType } from "../../types/game";
import { Music, VolumeX, AlertCircle, Sparkles } from "lucide-react";

interface RoundStatusProps {
  status: RoundStatusType;
  durationRemaining: number | null;
}

export const RoundStatus: React.FC<RoundStatusProps> = ({
  status,
}) => {
  if (status === "playing") {
    return (
      <div className="w-full bg-[#FFD84D] text-[#171717] px-3.5 py-2 sm:py-2.5 rounded-xl border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] flex flex-col sm:flex-row items-center justify-between gap-2.5 animate-pulse">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-lg bg-white border-[2px] border-[#171717] shadow-[2px_2px_0px_#171717] text-[#171717] flex items-center justify-center animate-spin">
            <Music className="w-5 h-5 stroke-[3]" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black tracking-tight text-[#171717]">
              MUSIK BERPUTAR! OPER PENA!
            </h4>
            <p className="text-[11px] sm:text-xs font-bold text-[#171717]/90">
              Oper pena secara tertib dari tangan ke tangan!
            </p>
          </div>
        </div>

        {/* Dynamic Soundwave Visualizer Bars */}
        <div className="flex items-center gap-1 h-6 bg-white border-[2px] border-[#171717] px-2.5 py-1 rounded-md shadow-[2px_2px_0px_#171717]">
          {[40, 90, 60, 100, 75, 45, 85, 60, 95, 50].map((height, idx) => (
            <div
              key={idx}
              className="w-1.5 bg-[#171717] rounded-none animate-bounce"
              style={{
                height: `${height}%`,
                animationDelay: `${idx * 0.1}s`,
                animationDuration: "0.5s",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (status === "answering") {
    return (
      <div className="w-full bg-[#A8D8FF] text-[#171717] px-3.5 py-2 sm:py-2.5 rounded-xl border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] flex items-center justify-between gap-2.5 animate-bounce">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-lg bg-white border-[2px] border-[#171717] shadow-[2px_2px_0px_#171717] text-[#171717] flex items-center justify-center">
            <VolumeX className="w-5 h-5 stroke-[3]" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black tracking-tight text-[#171717]">
              MUSIK BERHENTI! WAKTU MENJAWAB!
            </h4>
            <p className="text-[11px] sm:text-xs font-bold text-[#171717]">
              Peserta pemegang pena, sebutkan jawabanmu secara lisan!
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-xs font-black bg-white border-[2px] border-[#171717] px-2.5 py-1 rounded-md shadow-[2px_2px_0px_#171717]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF765E] stroke-[2.5]" />
          Giliran Menjawab
        </div>
      </div>
    );
  }

  if (status === "audio-error") {
    return (
      <div className="w-full bg-[#FF765E]/20 border-[2px] border-[#E84C4F] text-[#171717] dark:text-[#F5F5F5] p-2.5 rounded-xl shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-[#E84C4F] flex-shrink-0 stroke-[2.5]" />
        <div className="text-xs font-bold">
          <strong>Peringatan Audio:</strong> Audio tidak dapat diputar otomatis. Lanjutkan dengan timer visual.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-[#1E1E20] border-[3px] border-[#171717] dark:border-[#3F3F46] text-[#171717] dark:text-[#F5F5F5] px-3.5 py-2 sm:py-2.5 rounded-xl shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] flex items-center justify-between text-xs sm:text-sm font-bold transition-colors">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#2EAD67] border border-[#171717] dark:border-[#3F3F46] animate-ping" />
        <span>Status Ronde: <strong>Menunggu Pemilihan Soal</strong></span>
      </div>
      <span className="text-[#171717]/70 dark:text-[#F5F5F5]/70 font-black text-xs hidden sm:inline">Klik nomor pada kotak TTS untuk memulai</span>
    </div>
  );
};
