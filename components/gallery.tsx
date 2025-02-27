"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Unlock, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Gallery() {
  const [password, setPassword] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState(false)

  const correctPassword = "2106" // Password to unlock the gallery

  const handleUnlock = () => {
    if (password === correctPassword) {
      setIsUnlocked(true)
      setError(false)
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
    <div className="w-full rounded-xl transparent-bg border border-border p-6 shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-6">
        {isUnlocked ? <Unlock className="h-6 w-6 text-primary" /> : <Lock className="h-6 w-6 text-primary" />}
        <h2 className="text-2xl font-bold text-center">{isUnlocked ? "Our Gallery" : "Locked Gallery"}</h2>
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
              <h3 className="text-xl font-bold mb-4">Gallery Coming Soon</h3>
              <p className="mb-4">This section will be updated with our precious memories together.</p>
              <Image className="h-24 w-24 mx-auto text-primary" />
            </div>

            <Button
              onClick={handleLock}
              className="bg-transparent hover:bg-primary/20 text-foreground rounded-full px-6 py-2 flex items-center gap-2 mx-auto border-none"
            >
              <Lock className="h-4 w-4" />
              Lock Gallery
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
            <p className="mb-6 text-muted-foreground">Enter the password to unlock our gallery of memories.</p>

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

