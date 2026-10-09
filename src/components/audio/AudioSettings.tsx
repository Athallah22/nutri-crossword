import React, { useState } from "react";
import type { AudioPreferences } from "../../types/game";
import { AVAILABLE_TRACKS, type AudioTrackId } from "../../services/audioService";
import { Volume2, VolumeX, Play, Square, X, Music2, BellRing } from "lucide-react";

interface AudioSettingsProps {
  preferences: AudioPreferences;
  isOpen: boolean;
  onClose: () => void;
  onVolumeChange: (vol: number) => void;
  onTrackChange: (trackId: string) => void;
  onToggleMute: () => void;
  onToggleSfx: () => void;
  onTestMusic: (trackId: AudioTrackId) => void;
  onStopTest: () => void;
}

export const AudioSettings: React.FC<AudioSettingsProps> = ({
  preferences,
  isOpen,
  onClose,
  onVolumeChange,
  onTrackChange,
  onToggleMute,
  onToggleSfx,
  onTestMusic,
  onStopTest,
}) => {
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleTestToggle = (trackId: AudioTrackId) => {
    if (isTesting) {
      onStopTest();
      setIsTesting(false);
    } else {
      onTestMusic(trackId);
      setIsTesting(true);
    }
  };

  const handleModalClose = () => {
    if (isTesting) {
      onStopTest();
      setIsTesting(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-none animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#FFF9ED] dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-6 shadow-[8px_8px_0px_#171717] dark:shadow-[8px_8px_0px_#000000] text-[#171717] dark:text-[#F5F5F5] relative transition-colors">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-1.5 text-[#171717] bg-[#FF765E] hover:bg-[#ff8f7a] rounded-lg border-2 border-[#171717] dark:border-[#3F3F46] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#FFD84D] border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] text-[#171717] flex items-center justify-center">
            <Music2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#171717] dark:text-[#F5F5F5]">Pengaturan Audio & Musik</h3>
            <p className="text-xs text-[#171717]/80 dark:text-[#F5F5F5]/70 font-bold">
              Sesuaikan volume dan pilihan musik untuk sesi kelas
            </p>
          </div>
        </div>

        {/* Volume Slider */}
        <div className="mb-6 bg-white dark:bg-[#27272A] border-[3px] border-[#171717] dark:border-[#3F3F46] p-4 rounded-xl shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000]">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-black text-[#171717] dark:text-[#F5F5F5] flex items-center gap-2">
              <Volume2 className="w-4 h-4 stroke-[2.5]" />
              Volume Musik & Efek:
            </label>
            <span className="text-sm font-black bg-[#FFD84D] text-[#171717] px-2 py-0.5 rounded border border-[#171717] dark:border-[#3F3F46]">
              {Math.round(preferences.volume * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={preferences.volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-3 bg-[#EFE9DD] dark:bg-[#18181B] rounded-none border-2 border-[#171717] dark:border-[#3F3F46] appearance-none cursor-pointer accent-[#FFD84D]"
          />
        </div>

        {/* Track Selection */}
        <div className="mb-6">
          <label className="text-sm font-black text-[#171717] dark:text-[#F5F5F5] block mb-3">
            Pilihan Musik Oper Pena:
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {AVAILABLE_TRACKS.map((track) => {
              const isSelected = preferences.selectedTrack === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => onTrackChange(track.id)}
                  className={`
                    p-3 rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] transition-all flex items-center justify-between cursor-pointer
                    ${
                      isSelected
                        ? "bg-[#FFD84D] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] text-[#171717]"
                        : "bg-white dark:bg-[#27272A] hover:bg-[#FFF9ED] dark:hover:bg-[#333338] text-[#171717] dark:text-[#F5F5F5] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000]"
                    }
                  `}
                >
                  <div>
                    <div className="font-black text-sm flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full border border-[#171717] dark:border-[#3F3F46] ${
                          isSelected ? "bg-[#2EAD67]" : "bg-white dark:bg-[#18181B]"
                        }`}
                      />
                      {track.name}
                    </div>
                    <div className="text-xs text-[#171717]/80 dark:text-[#F5F5F5]/70 font-bold mt-0.5">
                      {track.description}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTrackChange(track.id);
                      handleTestToggle(track.id as AudioTrackId);
                    }}
                    className={`
                      px-3 py-1.5 rounded-md text-xs font-black border-2 border-[#171717] dark:border-[#3F3F46] flex items-center gap-1.5 transition cursor-pointer shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000]
                      ${
                        isTesting && isSelected
                          ? "bg-[#E84C4F] text-white animate-pulse"
                          : "bg-white dark:bg-[#18181B] hover:bg-[#EFE9DD] dark:hover:bg-[#27272A] text-[#171717] dark:text-[#F5F5F5]"
                      }
                    `}
                  >
                    {isTesting && isSelected ? (
                      <>
                        <Square className="w-3.5 h-3.5 stroke-[3]" /> Stop
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 stroke-[3]" /> Tes
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={onToggleMute}
            className={`
              p-3 rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] flex items-center justify-center gap-2 font-black text-xs transition cursor-pointer shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
              ${
                preferences.isMuted
                  ? "bg-[#E84C4F] text-white"
                  : "bg-white dark:bg-[#27272A] text-[#171717] dark:text-[#F5F5F5] hover:bg-[#FFF9ED] dark:hover:bg-[#333338]"
              }
            `}
          >
            {preferences.isMuted ? (
              <VolumeX className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Volume2 className="w-4 h-4 stroke-[2.5]" />
            )}
            <span>{preferences.isMuted ? "Mode Senyap" : "Audio Aktif"}</span>
          </button>

          <button
            type="button"
            onClick={onToggleSfx}
            className={`
              p-3 rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] flex items-center justify-center gap-2 font-black text-xs transition cursor-pointer shadow-[3px_3px_0px_#171717] dark:shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
              ${
                preferences.soundEffectsEnabled
                  ? "bg-[#2EAD67] text-white"
                  : "bg-[#EFE9DD] dark:bg-[#27272A] text-[#171717]/60 dark:text-[#F5F5F5]/60"
              }
            `}
          >
            <BellRing className="w-4 h-4 stroke-[2.5]" />
            <span>SFX: {preferences.soundEffectsEnabled ? "Aktif" : "Mati"}</span>
          </button>
        </div>

        {/* Save and close button */}
        <button
          type="button"
          onClick={handleModalClose}
          className="w-full py-3.5 bg-[#FFD84D] hover:bg-[#ffe066] text-[#171717] font-black rounded-lg border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition cursor-pointer"
        >
          Selesai & Simpan Pengaturan
        </button>
      </div>
    </div>
  );
};
