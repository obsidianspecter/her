"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Shuffle, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/lib/use-audio"

interface Song {
  title: string
  artist: string
  cover: string
}

export default function MusicPlayer() {
  const {
    isPlaying,
    togglePlay,
    currentSong,
    nextSong,
    prevSong,
    progress,
    duration,
    isMuted,
    toggleMute,
    setProgress,
  } = useAudio()

  return (
    <div className="w-full rounded-xl backdrop-blur-md bg-background/30 border border-border p-4 md:p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Playlist</h2>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/3 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSong.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={currentSong.cover || "/placeholder.svg"}
                alt={currentSong.title}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <div className="text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentSong.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl font-bold"
              >
                {currentSong.title}
              </motion.h3>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentSong.artist}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-muted-foreground"
              >
                {currentSong.artist}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="w-full">
            <Slider
              value={[progress]}
              max={duration}
              step={1}
              onValueChange={(value) => setProgress(value[0])}
              className="my-4"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-between items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" onClick={toggleMute} className="rounded-full">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={prevSong} className="rounded-full">
                <SkipBack className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>

              <Button
                onClick={togglePlay}
                className="bg-primary hover:bg-primary/90 text-white rounded-full w-12 h-12 flex items-center justify-center"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
              </Button>

              <Button variant="ghost" size="icon" onClick={nextSong} className="rounded-full">
                <SkipForward className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>

            <Button variant="ghost" size="icon" onClick={() => {}} className="rounded-full">
              <Shuffle className="h-5 w-5" />
              <span className="sr-only">Shuffle</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}

