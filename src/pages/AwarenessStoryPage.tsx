import { useNavigate } from 'react-router-dom'

export function AwarenessStoryPage() {
  const navigate = useNavigate()
  return (
    <div className="fixed inset-0 bg-stone-950 text-stone-50 flex flex-col items-center justify-center text-center px-6 font-sans">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Awareness Story</p>
      <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
        Full-viewport narrative — coming in a later milestone.
      </h1>
      <p className="mt-6 text-stone-400 max-w-xl">
        This route renders outside the application shell. It will hold the slide-by-slide story.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-10 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  )
}
