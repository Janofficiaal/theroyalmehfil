"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

const DEFAULT_VOLUME = 0.6; // Exactly 60% default volume as requested
const SESSION_STORAGE_KEY = "royal_mehfil_volume";

interface RoyalAudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  isAutoplayBlocked: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;
  enableMusic: () => void;
}

const RoyalAudioContext = createContext<RoyalAudioContextType | null>(null);

// Module-level singleton to guarantee exactly ONE HTMLAudioElement across all re-renders and route transitions
let globalAudioInstance: HTMLAudioElement | null = null;

function getSavedSessionVolume(): number {
  if (typeof window === "undefined") return DEFAULT_VOLUME;
  try {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (saved !== null) {
      const parsed = parseFloat(saved);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
        return parsed;
      }
    }
  } catch {
    // sessionStorage access restricted or not available
  }
  return DEFAULT_VOLUME;
}

function getGlobalAudio(): HTMLAudioElement {
  if (typeof window === "undefined") {
    return null as unknown as HTMLAudioElement;
  }
  if (!globalAudioInstance) {
    const audio = new Audio("/audio/royal-mehfil.mp3");
    audio.preload = "auto";
    audio.loop = true;
    // Exactly 60% default volume (or restored user session choice)
    audio.volume = getSavedSessionVolume();
    globalAudioInstance = audio;
    if (typeof window !== "undefined") {
      (window as unknown as { __ROYAL_AUDIO__?: HTMLAudioElement }).__ROYAL_AUDIO__ = audio;
    }
  }
  return globalAudioInstance;
}

export function RoyalAudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(DEFAULT_VOLUME);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAttemptedAutoplay = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = getGlobalAudio();
    if (!audio) return;
    audioRef.current = audio;

    // Ensure audio volume is exactly respected on initialization
    const initialVol = getSavedSessionVolume();
    audio.volume = initialVol;
    setVolumeState(initialVol);

    // Synchronize initial state with audio element
    setIsMuted(audio.muted);
    setIsPlaying(!audio.paused);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => {
      setIsMuted(audio.muted);
      setVolumeState(audio.volume);
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("volumechange", onVolumeChange);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    // Initial audible autoplay attempt as specified
    if (!hasAttemptedAutoplay.current) {
      hasAttemptedAutoplay.current = true;

      // Ensure audio is unmuted for audible autoplay attempt
      audio.muted = false;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsAutoplayBlocked(false);
          })
          .catch((err) => {
            // Browser blocked audible autoplay per policy
            console.info("[The Royal Mehfil] Browser policy blocked audible autoplay:", err.name);
            setIsPlaying(false);
            setIsAutoplayBlocked(true);

            // Per standard browser behavior: allow first interaction (click/touch) to resume seamlessly
            const unlockAudioOnGesture = () => {
              audio
                .play()
                .then(() => {
                  setIsPlaying(true);
                  setIsAutoplayBlocked(false);
                })
                .catch(() => {});

              removeGestureListeners();
            };

            const removeGestureListeners = () => {
              window.removeEventListener("pointerdown", unlockAudioOnGesture);
              window.removeEventListener("keydown", unlockAudioOnGesture);
              window.removeEventListener("touchstart", unlockAudioOnGesture);
            };

            window.addEventListener("pointerdown", unlockAudioOnGesture, { once: true, passive: true });
            window.addEventListener("keydown", unlockAudioOnGesture, { once: true, passive: true });
            window.addEventListener("touchstart", unlockAudioOnGesture, { once: true, passive: true });
          });
      }
    }

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("volumechange", onVolumeChange);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current || getGlobalAudio();
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsAutoplayBlocked(false);
        })
        .catch((err) => {
          console.warn("[The Royal Mehfil] Play request failed:", err);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current || getGlobalAudio();
    if (!audio) return;

    // Preserves playback position and does not overwrite volume
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const audio = audioRef.current || getGlobalAudio();
    if (!audio) return;

    const clamped = Math.max(0, Math.min(1, newVolume));
    audio.volume = clamped;
    if (audio.muted && clamped > 0) {
      audio.muted = false;
      setIsMuted(false);
    }
    setVolumeState(clamped);

    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, clamped.toString());
    } catch {
      // Ignore storage errors
    }
  }, []);

  const enableMusic = useCallback(() => {
    const audio = audioRef.current || getGlobalAudio();
    if (!audio) return;

    audio.muted = false;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsAutoplayBlocked(false);
      })
      .catch((err) => {
        console.warn("[The Royal Mehfil] Enable music failed:", err);
      });
  }, []);

  return (
    <RoyalAudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        isAutoplayBlocked,
        volume,
        currentTime,
        duration,
        togglePlay,
        toggleMute,
        setVolume,
        enableMusic,
      }}
    >
      {children}
    </RoyalAudioContext.Provider>
  );
}

export function useRoyalAudio(): RoyalAudioContextType {
  const context = useContext(RoyalAudioContext);
  if (!context) {
    throw new Error("useRoyalAudio must be used within a RoyalAudioProvider");
  }
  return context;
}
