
import * as React from "react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number
    max?: number
    /**
     * The background color of the progress track.
     */
    background?: string
    /**
     * The fill color of the progress indicator.
     */
    fill?: string
  }
>(({ className, value = 0, max = 100, background, fill, ...props }, ref) => {
  const percentage = (value / max) * 100

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-primary/20",
        background,
        className
      )}
      role="progressbar"
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuemin={0}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full flex-1 rounded-full bg-primary transition-all",
          fill
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }
