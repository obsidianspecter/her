export function calculateDaysTogether(startDate: Date): number {
  const today = new Date()
  const timeDiff = today.getTime() - startDate.getTime()
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

