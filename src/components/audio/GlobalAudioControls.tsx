"use client";

import React from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { useRoyalAudio } from "@/context/RoyalAudioContext";

export default function GlobalAudioControls() {
  const {
    isPlaying,
    isMuted,
    isAutoplayBlocked,
    volume,
    setVolume,
    togglePlay,
    toggleMute,
    enableMusic,
  } = useRoyalAudio();

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-3">
      {/* ── Autoplay Restriction Fallback: Subtle & Elegant Enable Music Pill ── */}
      {isAutoplayBlocked && !isPlaying && (
        <button
          type="button"
          onClick={enableMusic}
          aria-label="Enable Royal Mehfil background music"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#D4AF62] bg-[#2E0712]/90 backdrop-blur-md text-[#FFF8E9] shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:border-[#F2B8C6] hover:bg-[#3E0B19] transition-all duration-300 cursor-pointer animate-pulse"
        >
          <div className="w-5 h-5 rounded-full bg-[#D4AF62]/20 border border-[#D4AF62]/60 flex items-center justify-center">
            <Music className="w-2.5 h-2.5 text-[#D4AF62] group-hover:text-[#F2B8C6]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-kudus text-[10px] tracking-[0.16em] uppercase text-[#FFF8E9]">
              ENABLE MUSIC
            </span>
            <span className="text-[9px] text-[#F7DCE3]/80 -mt-0.5 tracking-wider font-sans">
              Royal Mehfil Anthem
            </span>
          </div>
          <Volume2 className="w-3.5 h-3.5 text-[#D4AF62] ml-1" />
        </button>
      )}

      {/* ── Persistent Luxury Audio Widget (Desktop & Mobile) ── */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#D4AF62]/35 bg-[#1B050B]/85 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.55)] transition-all duration-300 hover:border-[#D4AF62]/70 group"
        role="region"
        aria-label="Background music controls"
      >
        {/* Subtle Animated Champagne-Gold Sound Waves */}
        <div
          className="flex items-center gap-[2.5px] px-1 h-4 cursor-pointer"
          onClick={togglePlay}
          title={isPlaying ? "Pause Anthem" : "Play Anthem"}
        >
          <span
            className={`w-[2px] rounded-full bg-[#D4AF62] transition-all duration-300 ${
              isPlaying && !isMuted ? "animate-sound-wave-1" : "h-1.5 opacity-40"
            }`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#E8D6A3] transition-all duration-300 ${
              isPlaying && !isMuted ? "animate-sound-wave-2" : "h-2.5 opacity-40"
            }`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#D4AF62] transition-all duration-300 ${
              isPlaying && !isMuted ? "animate-sound-wave-3" : "h-3.5 opacity-40"
            }`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#F2B8C6] transition-all duration-300 ${
              isPlaying && !isMuted ? "animate-sound-wave-4" : "h-2 opacity-40"
            }`}
          />
        </div>

        {/* Brand Anthem Micro Label (Hidden on small mobile) */}
        <span
          className="hidden sm:inline-block font-kudus text-[9px] tracking-[0.16em] uppercase text-[#FFF8E9]/90 cursor-pointer select-none pl-1 pr-1.5"
          onClick={togglePlay}
        >
          {isPlaying ? "ANTHEM" : "PAUSED"}
        </span>

        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-7 h-7 rounded-full flex items-center justify-center text-[#FFF8E9] hover:text-[#F2B8C6] hover:bg-[#D4AF62]/15 transition-all duration-200 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Mute / Unmute Button */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          className="w-7 h-7 rounded-full flex items-center justify-center text-[#FFF8E9] hover:text-[#F2B8C6] hover:bg-[#D4AF62]/15 transition-all duration-200 cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-[#F2B8C6]" strokeWidth={1.75} />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#D4AF62]" strokeWidth={1.75} />
          )}
        </button>

        {/* Champagne-Gold Volume Slider & Exact Percentage Display */}
        <div className="hidden md:flex items-center gap-1.5 pl-1 pr-1 border-l border-[#D4AF62]/20">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Volume level"
            className="w-14 h-1 accent-[#D4AF62] cursor-pointer bg-white/15 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D4AF62] [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(212,175,98,0.8)]"
          />
          <span
            suppressHydrationWarning
            className="font-kudus text-[9px] text-[#FFF8E9]/80 w-6 text-right tabular-nums select-none"
          >
            {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
          </span>
        </div>
      </div>
    </div>
  );
}
