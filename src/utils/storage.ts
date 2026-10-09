import type { AudioPreferences } from "../types/game";

const AUDIO_STORAGE_KEY = "tts_gizi_audio_preferences";

export const defaultAudioPreferences: AudioPreferences = {
  volume: 0.7,
  selectedTrack: "local-music-01",
  isMuted: false,
  soundEffectsEnabled: true,
};

export function loadAudioPreferences(): AudioPreferences {
  try {
    const raw = localStorage.getItem(AUDIO_STORAGE_KEY);
    if (!raw) return defaultAudioPreferences;
    return { ...defaultAudioPreferences, ...JSON.parse(raw) };
  } catch {
    return defaultAudioPreferences;
  }
}

export function saveAudioPreferences(prefs: AudioPreferences): void {
  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn("Failed to save audio preferences to localStorage:", e);
  }
}
