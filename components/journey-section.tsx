"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import MusicPlayer from "@/components/music-player"
import BirthdayCountdown from "@/components/birthday-countdown"
import Timeline from "@/components/timeline"
import LoveCalculator from "@/components/love-calculator"
import ProtectedContent from "@/components/protected-content"
import Gallery from "@/components/gallery"
import { calculateDaysTogether } from "@/lib/date-utils"

interface JourneySectionProps {
  onReturnToStart: () => void
}

export default function JourneySection({ onReturnToStart }: JourneySectionProps) {
  const [daysTogether, setDaysTogether] = useState(0)

  useEffect(() => {
    // Calculate days together from November 21, 2024
    const startDate = new Date("2024-11-21")
    setDaysTogether(calculateDaysTogether(startDate))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
      className="absolute inset-0 w-full overflow-y-auto overflow-x-hidden py-8 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-primary mb-4">Our Love Story</h1>
          <p className="text-muted-foreground">{daysTogether} days of loving you, and counting...</p>
        </motion.div>

        <motion.div className="mb-16" variants={itemVariants}>
          <MusicPlayer />
        </motion.div>

        <motion.div className="mb-16" variants={itemVariants}>
          <BirthdayCountdown />
        </motion.div>

        <motion.div className="mb-16" variants={itemVariants}>
          <Timeline />
        </motion.div>

        <motion.div className="mb-16" variants={itemVariants}>
          <LoveCalculator />
        </motion.div>

        <motion.div className="mb-16" variants={itemVariants}>
          <ProtectedContent />
        </motion.div>

        <motion.div className="mb-16" variants={itemVariants}>
          <Gallery />
        </motion.div>

        <motion.div className="flex justify-center mt-12 mb-8" variants={itemVariants}>
          <Button
            onClick={onReturnToStart}
            className="bg-transparent hover:bg-primary/20 text-foreground rounded-full px-6 py-2 flex items-center gap-2 border-none"
          >
            <ArrowUp className="h-5 w-5" />
            Return to Start
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

