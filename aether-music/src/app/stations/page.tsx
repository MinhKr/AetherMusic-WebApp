import TopNav from "@/components/TopNav";

export default function StationsPage() {
  return (
    <main className="mr-8 pb-36 pt-4 page-transition flex-1">
      <TopNav placeholder="Search stations..." />
      
      <div className="px-12 mt-20 relative flex flex-col items-center justify-center text-center">
        {/* Background Decorative Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[180px] animate-pulse" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <span className="mb-10 inline-flex items-center gap-3 rounded-full bg-white/5 pr-6 pl-2 py-2 font-label text-[10px] font-bold uppercase tracking-[0.4em] text-primary backdrop-blur-md outline outline-1 outline-white/10">
                <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[#0e0c1f]">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
                </span>
                Nebula Expansion
            </span>
            
            <h1 className="text-editorial-lg text-gradient leading-[0.8] mb-12">
                STATIONS<br />
                <span className="ml-12 lg:ml-24 whitespace-nowrap">COMING SOON</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
                {[
                    { label: "Infinite Flow", icon: "all_inclusive", desc: "AI-curated streams based on your sonic signature." },
                    { label: "Celestial Radio", icon: "radio", desc: "Live broadcasts from curators across the network." },
                    { label: "Resonance Sync", icon: "sync", desc: "Listen with other astronauts in real-time." }
                ].map((feature) => (
                    <div key={feature.label} className="p-8 rounded-[32px] glass-panel-elevated ghost-border transition-all duration-700 hover:-translate-y-2 group">
                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 group-hover:bg-primary/10 group-hover:border-primary/40 transition-all">
                            <span className="material-symbols-outlined text-2xl text-on-surface-variant group-hover:text-primary">{feature.icon}</span>
                        </div>
                        <h4 className="font-headline text-lg font-bold text-white mb-2">{feature.label}</h4>
                        <p className="font-body text-xs text-on-surface-variant/60 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-20 p-8 rounded-[40px] glass-panel ghost-border border-dashed flex flex-col items-center gap-6 max-w-2xl">
                 <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    <p className="font-label text-xs font-bold uppercase tracking-[0.4em] text-primary">Transmitting coordinates...</p>
                 </div>
                 <p className="font-body text-on-surface-variant/40 italic">We are currently indexing infinite radio frequencies to ensure stable celestial broadcasts. Check back shortly.</p>
            </div>
        </div>
      </div>
    </main>
  );
}
