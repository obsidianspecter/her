"use client"

import { useEffect } from "react"
import { create } from "zustand"

interface Song {
  title: string
  artist: string
  cover: string
  src?: string
}

const playlist: Song[] = [
  {
    title: "Young and Beautiful",
    artist: "Lana Del Rey",
    cover:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-annetnavi-792777.jpg-v9IVpWknU47IMBooFFkwLry1d9PCh7.jpeg",
    src: "https://open.spotify.com/track/2nMeu6UenVvwUktBCpLMK9",
  },
  {
    title: "Born to Die",
    artist: "Lana Del Rey",
    cover:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-annetnavi-792777.jpg-v9IVpWknU47IMBooFFkwLry1d9PCh7.jpeg",
    src: "https://open.spotify.com/track/5hMCxZSe7zH4UEuBSMgGhX",
  },
  {
    title: "Video Games",
    artist: "Lana Del Rey",
    cover:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-annetnavi-792777.jpg-v9IVpWknU47IMBooFFkwLry1d9PCh7.jpeg",
    src: "https://open.spotify.com/track/5UOo694cVvjcPFqLFiNWGU",
  },
  {
    title: "Summertime Sadness",
    artist: "Lana Del Rey",
    cover:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-annetnavi-792777.jpg-v9IVpWknU47IMBooFFkwLry1d9PCh7.jpeg",
    src: "https://open.spotify.com/track/1Bqxj0aH5KewYHKUg1IdrF",
  },
  {
    title: "Love",
    artist: "Lana Del Rey",
    cover:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-annetnavi-792777.jpg-v9IVpWknU47IMBooFFkwLry1d9PCh7.jpeg",
    src: "https://open.spotify.com/track/4OBZT9EnhYIV17t4pGw7ig",
  },
]

interface AudioStore {
  isPlaying: boolean
  currentSongIndex: number
  progress: number
  duration: number
  isMuted: boolean
  togglePlay: () => void
  nextSong: () => void
  prevSong: () => void
  setProgress: (value: number) => void
  toggleMute: () => void
}

const useAudioStore = create<AudioStore>((set) => ({
  isPlaying: false,
  currentSongIndex: 0,
  progress: 0,
  duration: 100,
  isMuted: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  nextSong: () =>
    set((state) => ({
      currentSongIndex: (state.currentSongIndex + 1) % playlist.length,
      progress: 0,
    })),
  prevSong: () =>
    set((state) => ({
      currentSongIndex: state.currentSongIndex === 0 ? playlist.length - 1 : state.currentSongIndex - 1,
      progress: 0,
    })),
  setProgress: (value) => set({ progress: value }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}))

export function useAudio() {
  const {
    isPlaying,
    currentSongIndex,
    progress,
    duration,
    isMuted,
    togglePlay,
    nextSong,
    prevSong,
    setProgress,
    toggleMute,
  } = useAudioStore()

  const currentSong = playlist[currentSongIndex]

  // Simulate progress updates
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        useAudioStore.setState((state) => {
          const newProgress = state.progress + 1

          if (newProgress >= state.duration) {
            nextSong()
            return { progress: 0 }
          }

          return { progress: newProgress }
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, nextSong])

  return {
    isPlaying,
    currentSong,
    progress,
    duration,
    isMuted,
    togglePlay,
    nextSong,
    prevSong,
    setProgress,
    toggleMute,
  }
}

