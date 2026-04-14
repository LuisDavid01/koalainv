import { cn } from '@/lib/utils'

interface SketchIllustrationProps {
  className?: string
}

export default function SketchIllustration({
  className,
}: SketchIllustrationProps) {
  return (
    <div className={cn('relative', className)}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="20"
          y="20"
          width="360"
          height="260"
          rx="8"
          stroke="currentColor"
          strokeWidth="3"
          className="text-foreground"
        />

        <rect
          x="20"
          y="20"
          width="360"
          height="40"
          rx="8"
          fill="currentColor"
          className="text-primary/20"
        />
        <circle
          cx="50"
          cy="40"
          r="8"
          fill="currentColor"
          className="text-primary"
        />
        <circle
          cx="75"
          cy="40"
          r="8"
          fill="currentColor"
          className="text-primary"
        />
        <circle
          cx="100"
          cy="40"
          r="8"
          fill="currentColor"
          className="text-primary"
        />

        <rect
          x="40"
          y="80"
          width="100"
          height="12"
          rx="2"
          fill="currentColor"
          className="text-secondary"
        />
        <rect
          x="40"
          y="100"
          width="320"
          height="8"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/30"
        />
        <rect
          x="40"
          y="116"
          width="280"
          height="8"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/30"
        />
        <rect
          x="40"
          y="132"
          width="300"
          height="8"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/30"
        />

        <rect
          x="40"
          y="160"
          width="80"
          height="12"
          rx="2"
          fill="currentColor"
          className="text-secondary"
        />
        <rect
          x="40"
          y="180"
          width="320"
          height="8"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/30"
        />
        <rect
          x="40"
          y="196"
          width="260"
          height="8"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/30"
        />
        <rect
          x="40"
          y="212"
          width="290"
          height="8"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/30"
        />

        <path
          d="M280 100 L320 100 L340 130 L320 160 L280 160 L260 130 Z"
          stroke="currentColor"
          strokeWidth="3"
          fill="currentColor"
          className="text-primary/30"
        />
        <path
          d="M340 160 L360 160 L360 180"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-foreground"
        />

        <path
          d="M240 100 L260 100 L280 80 L280 160"
          stroke="currentColor"
          strokeWidth="3"
          fill="currentColor"
          className="text-accent/30"
        />

        <rect
          x="40"
          y="240"
          width="45"
          height="6"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/40"
        />
        <rect
          x="95"
          y="240"
          width="45"
          height="6"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/40"
        />
        <rect
          x="150"
          y="240"
          width="45"
          height="6"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/40"
        />
        <rect
          x="205"
          y="240"
          width="45"
          height="6"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/40"
        />
        <rect
          x="260"
          y="240"
          width="45"
          height="6"
          rx="2"
          fill="currentColor"
          className="text-muted-foreground/40"
        />
      </svg>
    </div>
  )
}
