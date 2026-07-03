"use client"

import { useEffect, useRef, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Play, Pause } from "lucide-react"

const VIDEO_SRC = "/video/vez-u-pokretu.mp4"
const VIDEO_POSTER = "/video/vez-u-pokretu-poster.webp"
const VIDEO_DURATION = "00:21"

export function VideoSection() {
  const { ref, isVisible } = useScrollReveal()
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVisible) return

    video.muted = true

    const syncState = () => {
      setIsPlaying(!video.paused)
    }

    const startPlayback = () => {
      if (userPausedRef.current || !video.paused) return

      video.muted = true
      void video.play().then(syncState).catch(() => setIsPlaying(false))
    }

    const handlePause = () => {
      if (!userPausedRef.current) {
        startPlayback()
        return
      }

      syncState()
    }

    video.addEventListener("canplay", startPlayback)
    video.addEventListener("play", syncState)
    video.addEventListener("pause", handlePause)

    startPlayback()

    return () => {
      video.removeEventListener("canplay", startPlayback)
      video.removeEventListener("play", syncState)
      video.removeEventListener("pause", handlePause)
    }
  }, [isVisible])

  const togglePlay = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      userPausedRef.current = false
      video.muted = true
      try {
        await video.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    } else {
      userPausedRef.current = true
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <section id="video" ref={ref} className="py-24 md:py-32 border-b border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          <div className="col-span-12 md:col-span-4 mb-8 md:mb-0 flex flex-col justify-end">
            <div
              className={cn(
                "transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Vez u Pokretu</h2>
              <p className="text-muted-foreground max-w-xs">
                Mašinski vez koji prati svaki detalj. Verna digitalizacija i precizni ubodi.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "col-span-12 md:col-span-8 relative aspect-video bg-neutral-900 overflow-hidden group",
              "transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
            )}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={VIDEO_POSTER}
              src={VIDEO_SRC}
              loop
              muted
              playsInline
              preload="metadata"
              disablePictureInPicture
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />

            {!isPlaying ? (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
                aria-label="Pusti video"
              >
                <span className="flex h-16 w-16 items-center justify-center border border-white/30 bg-black/50 text-white backdrop-blur-sm">
                  <Play className="h-7 w-7 translate-x-0.5" aria-hidden />
                </span>
              </button>
            ) : null}

            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 flex justify-between items-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
              <button
                type="button"
                onClick={togglePlay}
                className="p-3 bg-white/10 backdrop-blur hover:bg-white text-white hover:text-black transition-all duration-300 rounded-none border border-white/20"
                aria-label={isPlaying ? "Pauziraj video" : "Pusti video"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <span className="text-xs font-mono tracking-widest uppercase text-white/80">
                ADD VERT 2025 / {VIDEO_DURATION}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
