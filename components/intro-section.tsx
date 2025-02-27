"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface IntroSectionProps {
  onBeginJourney: () => void
  isPlaying: boolean
  onToggleMusic: () => void
}

export default function IntroSection({ onBeginJourney, isPlaying, onToggleMusic }: IntroSectionProps) {
  const [headline, setHeadline] = useState("Lakshitha, you are my universe")

  useEffect(() => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()

    // Check if it's Lakshitha's birthday (example date: May 15)
    if (currentMonth === 4 && currentDay === 15) {
      setHeadline("Happy Birthday, Lakshitha! 🎂")
    }
    // Check if it's Anvin's birthday (example date: October 10)
    else if (currentMonth === 9 && currentDay === 10) {
      setHeadline("On My Special Day... 💝")
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <motion.h1 className="text-center text-white mb-8 max-w-3xl" variants={itemVariants}>
        {headline}
      </motion.h1>

      <motion.div className="flex flex-col sm:flex-row gap-4 mt-8" variants={itemVariants}>
        <Button
          onClick={onToggleMusic}
          className="bg-transparent hover:bg-primary/20 text-white rounded-full px-6 py-2 flex items-center gap-2 border-none"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          {isPlaying ? "Pause Music" : "Enable Music"}
        </Button>

        <Button
          onClick={onBeginJourney}
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 flex items-center gap-2"
        >
          <Heart className="h-5 w-5" />
          Begin Our Journey
        </Button>
      </motion.div>
    </motion.div>
  )
}

