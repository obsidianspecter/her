"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Cake } from "lucide-react"

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isBirthday, setIsBirthday] = useState(false)

  useEffect(() => {
    // Set Lakshitha's birthday (June 21)
    const calculateTimeLeft = () => {
      const today = new Date()
      let birthday = new Date(today.getFullYear(), 5, 21) // June is month 5 (0-indexed)

      // If birthday has passed this year, set for next year
      if (today > birthday) {
        birthday = new Date(today.getFullYear() + 1, 5, 21)
      }

      // Check if today is the birthday
      const isTodayBirthday = today.getDate() === 21 && today.getMonth() === 5

      setIsBirthday(isTodayBirthday)

      if (isTodayBirthday) {
        // Trigger confetti if it's the birthday
        triggerConfetti()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const difference = birthday.getTime() - today.getTime()

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <div className="w-full rounded-xl transparent-bg border border-border p-6 shadow-lg">
      <div className="flex flex-col items-center text-center">
        <Cake className="h-12 w-12 text-primary mb-4" />

        <h2 className="text-2xl font-bold mb-6">
          {isBirthday ? "Happy Birthday, Lakshitha! 🎂" : "Countdown to Lakshitha's Birthday"}
        </h2>

        {isBirthday ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: 2,
              repeatType: "reverse",
            }}
            className="text-2xl font-bold text-primary"
          >
            Today is your special day! 🎉
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CountdownItem value={timeLeft.days} label="Days" />
            <CountdownItem value={timeLeft.hours} label="Hours" />
            <CountdownItem value={timeLeft.minutes} label="Minutes" />
            <CountdownItem value={timeLeft.seconds} label="Seconds" />
          </div>
        )}
      </div>
    </div>
  )
}

interface CountdownItemProps {
  value: number
  label: string
}

function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
        <span className="text-2xl md:text-3xl font-bold text-primary">{value}</span>
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </motion.div>
  )
}

