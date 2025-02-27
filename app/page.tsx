"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import IntroSection from "@/components/intro-section"
import JourneySection from "@/components/journey-section"
import { useAudio } from "@/lib/use-audio"

// Dynamically import StarField with SSR disabled
const StarField = dynamic(() => import("@/components/star-field"), {
  ssr: false,
})

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showJourney, setShowJourney] = useState(false)
  const { isPlaying, togglePlay } = useAudio()

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <StarField />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-2xl md:text-4xl font-bold text-primary mb-4"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
              }}
            >
              Loading our universe...
            </motion.div>
            <motion.div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </motion.div>
          </motion.div>
        ) : showJourney ? (
          <JourneySection key="journey" onReturnToStart={() => setShowJourney(false)} />
        ) : (
          <IntroSection
            key="intro"
            onBeginJourney={() => setShowJourney(true)}
            isPlaying={isPlaying}
            onToggleMusic={togglePlay}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

