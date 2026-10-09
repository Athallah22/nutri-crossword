import type { AudioPreferences } from "../types/game";

export type AudioTrackId =
  | "local-music-01"
  | "local-music-02"
  | "local-music-03"
  | "synth-fun-groove"
  | "synth-happy-bounce";

export interface AudioTrackOption {
  id: AudioTrackId;
  name: string;
  description: string;
}

export const AVAILABLE_TRACKS: AudioTrackOption[] = [
  {
    id: "local-music-01",
    name: "Ceria Gizi Groove (Musik 1)",
    description: "Musik melodi ceria dengan tempo ritmis untuk oper pena.",
  },
  {
    id: "local-music-02",
    name: "Energi Remaja (Musik 2)",
    description: "Irama riang dan ceria bersemangat.",
  },
  {
    id: "local-music-03",
    name: "Marimba Pop Tropis (Musik 3)",
    description: "Ketukan marimba hangat dan santai.",
  },
  {
    id: "synth-fun-groove",
    name: "Sintesis Web Audio (Groove)",
    description: "Musik sintetis prosedural langsung dari browser.",
  },
  {
    id: "synth-happy-bounce",
    name: "Sintesis Web Audio (Bouncy)",
    description: "Irama ritmis sintetis instan.",
  },
];

class AudioService {
  private audioCtx: AudioContext | null = null;
  private currentHtmlAudio: HTMLAudioElement | null = null;
  private playPromise: Promise<void> | null = null;
  private synthLoopTimer: number | null = null;
  private _isPlaying = false;
  private currentVolume = 0.7;
  private isMuted = false;
  private sfxEnabled = true;

  public async init(): Promise<void> {
    try {
      if (!this.audioCtx) {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtxClass) {
          this.audioCtx = new AudioCtxClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        await this.audioCtx.resume();
      }
    } catch (e) {
      console.warn("AudioContext init warning:", e);
    }
  }

  public updatePreferences(prefs: AudioPreferences): void {
    this.currentVolume = Math.max(0, Math.min(1, prefs.volume));
    this.isMuted = prefs.isMuted;
    this.sfxEnabled = prefs.soundEffectsEnabled;

    if (this.currentHtmlAudio) {
      this.currentHtmlAudio.volume = this.isMuted ? 0 : this.currentVolume;
    }
  }

  public async play(trackId: string = "local-music-01"): Promise<void> {
    // Cleanly stop any existing playback first
    this.stop();
    await this.init();
    this._isPlaying = true;

    // Track mapping to file
    const fileMap: Record<string, string> = {
      "local-music-01": "/audio/music-01.mp3",
      "local-music-02": "/audio/music-02.mp3",
      "local-music-03": "/audio/music-03.mp3",
      "local-custom": "/audio/music-01.mp3",
    };

    const audioFile = fileMap[trackId];
    if (audioFile) {
      try {
        const audio = new Audio(audioFile);
        audio.loop = true;
        audio.volume = this.isMuted ? 0 : this.currentVolume;
        this.currentHtmlAudio = audio;

        this.playPromise = audio.play();
        await this.playPromise;
        this.playPromise = null;
        return;
      } catch (err: unknown) {
        // Only log if it's not an intentional abort
        if (err instanceof Error && err.name !== "AbortError") {
          console.warn("Audio file playback fallback to synth:", err.message);
        }
      }
    }

    // Fallback to Web Audio Synthesizer
    this.playSyntheticBgm(trackId as AudioTrackId);
  }

  public stop(): void {
    this._isPlaying = false;

    if (this.synthLoopTimer !== null) {
      clearInterval(this.synthLoopTimer);
      this.synthLoopTimer = null;
    }

    if (this.currentHtmlAudio) {
      const audioToStop = this.currentHtmlAudio;
      this.currentHtmlAudio = null;

      if (this.playPromise) {
        this.playPromise
          .then(() => {
            audioToStop.pause();
            audioToStop.currentTime = 0;
          })
          .catch(() => {})
          .finally(() => {
            this.playPromise = null;
          });
      } else {
        try {
          audioToStop.pause();
          audioToStop.currentTime = 0;
        } catch {
          // ignore
        }
      }
    }
  }

  public isPlaying(): boolean {
    return this._isPlaying;
  }

  // --- Web Audio Sound Effects ---

  public playCorrectSound(): void {
    if (!this.sfxEnabled || this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        const vol = this.currentVolume * 0.35;
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(vol, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      } catch {
        // ignore
      }
    });
  }

  public playIncorrectSound(): void {
    if (!this.sfxEnabled || this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const freqs = [330, 260];

    freqs.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);

        const vol = this.currentVolume * 0.3;
        gain.gain.setValueAtTime(vol, now + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.3);
      } catch {
        // ignore
      }
    });
  }

  public playStopAlertSound(): void {
    if (!this.sfxEnabled || this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    [587.33, 880, 1174.66].forEach((f) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        const vol = this.currentVolume * 0.3;
        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.55);
      } catch {
        // ignore
      }
    });
  }

  // --- Procedural BGM Synthesizer ---

  private playSyntheticBgm(trackId: AudioTrackId): void {
    if (!this.audioCtx) return;

    const scaleA = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
    const bassScale = [130.81, 146.83, 164.81, 196.0, 220.0];

    const melodyPatterns: Record<string, number[]> = {
      "synth-fun-groove": [0, 2, 4, 3, 2, 0, 4, 5, 2, 1, 3, 4, 0, 2, 5, 3],
      "synth-happy-bounce": [4, 5, 4, 2, 0, 2, 4, 4, 3, 2, 3, 5, 4, 2, 0, 0],
    };

    const pattern = melodyPatterns[trackId] || melodyPatterns["synth-fun-groove"];
    let step = 0;
    const tempoMs = 220;

    const playNote = () => {
      if (!this._isPlaying || !this.audioCtx || this.isMuted) return;

      try {
        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        const noteIdx = pattern[step % pattern.length];
        const freq = scaleA[noteIdx % scaleA.length];
        const vol = this.currentVolume * 0.18;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(vol, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + (tempoMs / 1000) * 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + (tempoMs / 1000));

        if (step % 2 === 0) {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          const bassFreq = bassScale[(noteIdx + 1) % bassScale.length];

          bassOsc.type = "sine";
          bassOsc.frequency.setValueAtTime(bassFreq, now);

          const bVol = this.currentVolume * 0.14;
          bassGain.gain.setValueAtTime(bVol, now);
          bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

          bassOsc.connect(bassGain);
          bassGain.connect(ctx.destination);

          bassOsc.start(now);
          bassOsc.stop(now + 0.3);
        }
      } catch {
        // ignore
      }

      step++;
    };

    playNote();
    this.synthLoopTimer = window.setInterval(playNote, tempoMs);
  }
}

export const audioService = new AudioService();
