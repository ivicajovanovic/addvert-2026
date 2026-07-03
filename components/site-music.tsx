"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

const MUSIC_SRC = "/music.mp3"
const MUSIC_VOLUME = 0.55
const STORAGE_KEY = "addvert-music-enabled"
const DESKTOP_MUSIC_QUERY = "(min-width: 1024px)"

function readStoredPreference(): boolean {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(STORAGE_KEY) === "true"
}

function writeStoredPreference(enabled: boolean) {
  window.localStorage.setItem(STORAGE_KEY, String(enabled))
}

export function SiteMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [canUseMusic, setCanUseMusic] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false

    try {
      await audio.play()
      setIsPlaying(true)
      return true
    } catch {
      setIsPlaying(false)
      return false
    }
  }, [])

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  const enableMusic = useCallback(async () => {
    writeStoredPreference(true)
    await playMusic()
  }, [playMusic])

  const disableMusic = useCallback(() => {
    writeStoredPreference(false)
    pauseMusic()
  }, [pauseMusic])

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      disableMusic()
    } else {
      void enableMusic()
    }
  }, [disableMusic, enableMusic, isPlaying])

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MUSIC_QUERY)
    const updateCanUseMusic = () => setCanUseMusic(mediaQuery.matches)

    updateCanUseMusic()
    mediaQuery.addEventListener("change", updateCanUseMusic)

    return () => {
      mediaQuery.removeEventListener("change", updateCanUseMusic)
    }
  }, [])

  useEffect(() => {
    if (!canUseMusic) return

    const audio = new Audio(MUSIC_SRC)
    audio.loop = true
    audio.preload = "none"
    audio.volume = MUSIC_VOLUME
    audioRef.current = audio

    const onCanPlay = () => {
      if (readStoredPreference()) {
        void playMusic()
      }
    }
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener("canplaythrough", onCanPlay)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)

    if (readStoredPreference()) {
      void audio.play().catch(() => undefined)
    }

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay)
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audio.pause()
      audioRef.current = null
    }
  }, [canUseMusic, playMusic])

  if (!canUseMusic) return null

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={isPlaying ? "Isključi muziku" : "Uključi muziku"}
      aria-pressed={isPlaying}
      title={isPlaying ? "Isključi muziku" : "Uključi muziku"}
      className={cn(
        "fixed bottom-[calc(6rem-10px)] right-8 z-50 flex size-11 items-center justify-center rounded-none border bg-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-40",
        isPlaying
          ? "border-white text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
          : "border-white/40 text-muted-foreground hover:border-white hover:text-white",
      )}
    >
      {isPlaying ? (
        <Volume2 className="size-5" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <VolumeX className="size-5" strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  )
}
