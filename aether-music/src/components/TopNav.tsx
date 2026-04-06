export default function TopNav({ placeholder = "Search the nebula..." }: { placeholder?: string }) {
  return (
    <header className="flex items-center justify-between w-full px-12 py-8 mb-4 sticky top-0 z-40 bg-surface-dim/60 backdrop-blur-xl">
      {/* Search - Full rounded pill with Ghost Border */}
      <div className="flex-1 max-w-2xl relative group">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center bg-surface-container-lowest/20 rounded-full ghost-border group-focus-within:outline-primary/40 transition-all duration-300">
          <span className="material-symbols-outlined ml-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            className="w-full border-0 bg-transparent py-4 pl-4 pr-8 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-0 font-body text-sm tracking-wide"
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>

      {/* Action buttons with editorial spacing */}
      <div className="ml-12 flex items-center gap-8">
        <button className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-primary/10 transition-all duration-300">
          <span className="material-symbols-outlined text-on-surface-variant/60 group-hover:text-primary transition-colors">notifications</span>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#00ffff]" />
        </button>
        <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-secondary/10 transition-all duration-300">
          <span className="material-symbols-outlined text-on-surface-variant/60 group-hover:text-secondary transition-colors">settings</span>
        </button>
      </div>
    </header>
  );
}
