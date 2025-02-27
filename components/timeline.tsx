"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

interface TimelineEvent {
  date: string
  title: string
  description: string
}

const events: TimelineEvent[] = [
  {
    date: "November 21, 2024",
    title: "The Day We Met",
    description: "The stars aligned when our paths crossed for the first time.",
  },
  {
    date: "December 25, 2024",
    title: "Our First Date",
    description: "A magical evening that marked the beginning of our journey together.",
  },
  {
    date: "February 14, 2025",
    title: "First Valentine's Day",
    description: "Celebrating love and creating memories that will last a lifetime.",
  },
  {
    date: "June 21, 2025",
    title: "Your Birthday",
    description: "Celebrating the day the world received its most precious gift - you.",
  },
]

export default function Timeline() {
  return (
    <div className="w-full rounded-xl bg-background/30 backdrop-blur-md border border-border p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Our Journey Together</h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:translate-x-[-0.5px]" />

        {events.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  )
}

interface TimelineItemProps {
  event: TimelineEvent
  index: number
}

function TimelineItem({ event, index }: TimelineItemProps) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center md:items-start gap-4 mb-12 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center transform translate-x-[-14px] md:translate-x-[-16px]">
        <Calendar className="h-4 w-4 text-primary-foreground" />
      </div>

      {/* Content */}
      <div
        className={`w-full md:w-[calc(50%-20px)] ml-12 md:ml-0 ${
          isEven ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
        }`}
      >
        <div className="bg-card p-4 rounded-lg shadow-md">
          <div className="text-sm text-muted-foreground mb-1">{event.date}</div>
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

