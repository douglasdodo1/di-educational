import { Search } from 'lucide-react'

interface CourseSearchBarProps {
  query: string
  setQuery: (query: string) => void
}

export const CourseSearchBar = ({ query, setQuery }: CourseSearchBarProps) => {
  return (
    <div className="relative flex-1">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar cursos..."
        className="border-border bg-card placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-11 w-full rounded-lg border pr-4 pl-10 text-sm transition-colors outline-none focus:ring-2"
      />
    </div>
  )
}
