import { useEffect, useState, useCallback } from "react";
import type { AudioPreferences } from "../types/game";
import { audioService, type AudioTrackId } from "../services/audioService";
import { loadAudioPreferences, saveAudioPreferences } from "../utils/storage";

export function useAudio() {
  const [preferences, setPreferences] = useState<AudioPreferences>(loadAudioPreferences);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    audioService.updatePreferences(preferences);
    saveAudioPreferences(preferences);
  }, [preferences]);

  const playMusic = useCallback(async (trackId?: AudioTrackId) => {
    try {
      const activeTrack = (trackId || preferences.selectedTrack) as AudioTrackId;
      await audioService.play(activeTrack);
      setIsPlaying(true);
    } catch (e) {
      console.error("Audio playback error:", e);
      setIsPlaying(false);
      throw e;
    }
  }, [preferences.selectedTrack]);

  const stopMusic = useCallback(() => {
    audioService.stop();
    setIsPlaying(false);
  }, []);

  const setVolume = useCallback((volume: number) => {
    setPreferences((prev) => ({ ...prev, volume }));
  }, []);

  const setTrack = useCallback((selectedTrack: string) => {
    setPreferences((prev) => ({ ...prev, selectedTrack }));
  }, []);

  const toggleMute = useCallback(() => {
    setPreferences((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const toggleSfx = useCallback(() => {
    setPreferences((prev) => ({ ...prev, soundEffectsEnabled: !prev.soundEffectsEnabled }));
  }, []);

  const testMusic = useCallback(async (trackId?: AudioTrackId) => {
    await playMusic(trackId);
  }, [playMusic]);

  const stopTest = useCallback(() => {
    stopMusic();
  }, [stopMusic]);

  return {
    preferences,
    isPlaying,
    playMusic,
    stopMusic,
    setVolume,
    setTrack,
    toggleMute,
    toggleSfx,
    testMusic,
    stopTest,
    playCorrectSound: () => audioService.playCorrectSound(),
    playIncorrectSound: () => audioService.playIncorrectSound(),
    playStopAlertSound: () => audioService.playStopAlertSound(),
  };
}
