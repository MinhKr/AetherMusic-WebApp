export default function TopNav({ placeholder = "Search the nebula..." }: { placeholder?: string }) {
  return (
    <header className="flex items-center justify-between w-full px-8 py-6 mb-8">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-primary">
            search
          </span>
          <input
            className="w-full rounded-full border-0 bg-surface-container-lowest/20 py-3 pl-12 pr-6 text-on-surface backdrop-blur-md outline outline-1 outline-white/15 placeholder:text-white/30 focus:outline-primary/40 focus:ring-0 font-body text-sm"
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="ml-8 flex items-center gap-6">
        <button className="relative text-white/70 transition-all duration-200 hover:text-[#bc87fe]">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_#00ffff]" />
        </button>
        <button className="text-white/70 transition-all duration-200 hover:text-[#bc87fe]">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}
