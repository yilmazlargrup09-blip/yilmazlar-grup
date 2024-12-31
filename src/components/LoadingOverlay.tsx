

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
}

export function LoadingOverlay({ isLoading, children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
         sdfg
        </div>
      )}
      <div className={isLoading ? "pointer-events-none" : undefined}>
        {children}
      </div>
    </div>
  )
}