import { cn } from '@/lib/utils'

interface SplitContainerProps {
  left: React.ReactNode
  right: React.ReactNode
  rightExpanded?: boolean
}

export function SplitContainer({ left, right, rightExpanded = false }: SplitContainerProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-2">
      <div
        className={cn(
          'flex flex-col items-center justify-center p-6 md:p-12 transition-all duration-500 ease-out',
          rightExpanded ? 'md:col-span-1 md:opacity-40 md:grayscale' : 'md:col-span-1'
        )}
      >
        {left}
      </div>
      <div
        className={cn(
          'flex flex-col items-center justify-center p-6 md:p-12 transition-all duration-500 ease-out',
          rightExpanded ? 'md:col-span-1' : 'md:col-span-1'
        )}
      >
        {right}
      </div>
    </div>
  )
}
