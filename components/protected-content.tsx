"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import confetti from "canvas-confetti"

export default function ProtectedContent() {
  const [password, setPassword] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState(false)

  const correctPassword = "20241121" // November 21, 2024

  const handleUnlock = () => {
    if (password === correctPassword) {
      setIsUnlocked(true)
      setError(false)

      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } else {
      setError(true)
      setIsUnlocked(false)
    }
  }

  const handleLock = () => {
    setIsUnlocked(false)
    setPassword("")
    setError(false)
  }

  return (
    <div className="w-full rounded-xl bg-background/30 backdrop-blur-md border border-border p-6 shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-6">
        {isUnlocked ? <Unlock className="h-6 w-6 text-primary" /> : <Lock className="h-6 w-6 text-primary" />}
        <h2 className="text-2xl font-bold text-center">
          {isUnlocked ? "Secret Message Unlocked" : "Protected Love Letter"}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {isUnlocked ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-6 p-4 bg-primary/10 rounded-lg">
              <h3 className="text-xl font-bold mb-4">My Dearest Lakshitha,</h3>
              <p className="mb-4">
                From the moment our paths crossed, I knew there was something special about you. Your smile lights up my
                world, and your laughter is the sweetest melody I've ever heard.
              </p>
              <p className="mb-4">
                Every moment spent with you feels like a beautiful dream I never want to wake up from. You've shown me
                what it means to truly love and be loved in return.
              </p>
              <p className="mb-4">
                I promise to cherish every moment, to hold your hand through life's journey, and to love you more with
                each passing day.
              </p>
              <p className="font-bold">
                Forever yours,
                <br />
                Anvin
              </p>
            </div>

            <Button
              onClick={handleLock}
              className="bg-transparent hover:bg-primary/20 text-foreground rounded-full px-6 py-2 flex items-center gap-2 mx-auto border-none"
            >
              <Lock className="h-4 w-4" />
              Lock Message
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="mb-6 text-muted-foreground">
              Enter the password to unlock a special message just for you. Hint: It's a special date in our relationship
              (format: YYYYMMDD).
            </p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mb-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                className={`flex-1 ${error ? "border-destructive" : ""}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnlock()
                  }
                }}
              />

              <Button onClick={handleUnlock} className="bg-primary hover:bg-primary/90 text-white">
                Unlock
              </Button>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-sm">
                Incorrect password. Please try again.
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

