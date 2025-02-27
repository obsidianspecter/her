"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoveCalculator() {
  const [calculating, setCalculating] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const handleCalculate = () => {
    setCalculating(true)
    setResult(null)

    // Simulate calculation with a delay
    setTimeout(() => {
      setCalculating(false)
      // Always show 100% match
      setResult(100)
    }, 3000)
  }

  return (
    <div className="w-full rounded-xl bg-background/30 backdrop-blur-md border border-border p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Perfect Match Calculator</h2>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <span className="text-xl font-bold">Anvin</span>
            </div>
          </div>

          <Heart className="h-8 w-8 text-primary" />

          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <span className="text-xl font-bold">Lakshitha</span>
            </div>
          </div>
        </div>

        {result !== null ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="text-5xl font-bold text-primary mb-2">{result}%</div>
            <p className="text-muted-foreground">
              {result === 100 ? "A perfect match made in heaven! ❤️" : "Calculating your compatibility..."}
            </p>
          </motion.div>
        ) : (
          <div className="h-24 flex items-center justify-center mb-8">
            {calculating && (
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                }}
              >
                <Heart className="h-12 w-12 text-primary" />
              </motion.div>
            )}
          </div>
        )}

        <Button
          onClick={handleCalculate}
          disabled={calculating}
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2"
        >
          {result !== null ? "Calculate Again" : "Calculate Love Match"}
        </Button>
      </div>
    </div>
  )
}

