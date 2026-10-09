import React, { useEffect } from "react";
import { RotateCcw, X, AlertTriangle } from "lucide-react";

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Enter") {
        e.preventDefault();
        onConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-none animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FFF9ED] dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl p-6 sm:p-7 shadow-[8px_8px_0px_#171717] dark:shadow-[8px_8px_0px_#000000] text-center text-[#171717] dark:text-[#F5F5F5] relative transition-colors">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#171717] dark:text-[#F5F5F5] bg-white dark:bg-[#27272A] hover:bg-[#EFE9DD] dark:hover:bg-[#3F3F46] rounded-lg border-2 border-[#171717] dark:border-[#3F3F46] shadow-[2px_2px_0px_#171717] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-16 h-16 mx-auto rounded-xl bg-[#FF765E] border-[3px] border-[#171717] dark:border-[#3F3F46] shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] text-white flex items-center justify-center mb-4">
          <RotateCcw className="w-8 h-8 stroke-[2.5]" />
        </div>

        {/* Title & Message */}
        <h3 className="text-xl sm:text-2xl font-black text-[#171717] dark:text-[#F5F5F5] tracking-tight mb-2">
          Ulangi & Acak Permainan?
        </h3>
        <p className="text-xs sm:text-sm text-[#171717]/80 dark:text-[#F5F5F5]/80 font-bold max-w-xs mx-auto mb-6 leading-relaxed">
          Progres ronde saat ini akan direset dan paket soal baru akan diacak secara otomatis untuk kelas.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white dark:bg-[#27272A] hover:bg-[#EFE9DD] dark:hover:bg-[#3F3F46] text-[#171717] dark:text-[#F5F5F5] border-[3px] border-[#171717] dark:border-[#3F3F46] rounded-lg font-black text-xs sm:text-sm shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition cursor-pointer"
          >
            <span>Batal</span>
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-[#FF765E] hover:bg-[#ff8f7a] text-white border-[3px] border-[#171717] dark:border-[#3F3F46] rounded-lg font-black text-xs sm:text-sm shadow-[4px_4px_0px_#171717] dark:shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
            <span>Ya, Ulangi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
