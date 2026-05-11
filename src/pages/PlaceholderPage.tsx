interface PlaceholderPageProps {
  title: string
  description?: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="px-6 lg:px-10 py-10 max-w-4xl">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-3 text-stone-600 dark:text-stone-400">{description}</p>
      )}
      <div className="mt-8 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 p-8 text-stone-500 dark:text-stone-400 text-sm">
        Section not yet implemented — coming in a later milestone.
      </div>
    </div>
  )
}
