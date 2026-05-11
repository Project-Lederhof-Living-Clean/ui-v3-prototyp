import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ToastProps {
  message: string
  onDismiss: () => void
  durationMs?: number
}

export function Toast({ message, onDismiss, durationMs = 3500 }: ToastProps) {
  useEffect(() => {
    const id = window.setTimeout(onDismiss, durationMs)
    return () => window.clearTimeout(id)
  }, [message, onDismiss, durationMs])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-sm max-w-sm"
    >
      <span>{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="p-0.5 rounded hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}
