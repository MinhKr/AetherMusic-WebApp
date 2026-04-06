import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TopNav from "@/components/TopNav";
import Image from "next/image";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fallback data for "Celestial" profile
  const stats = [
    { label: "Sonic Uploads", value: "12", icon: "cloud_upload", color: "text-primary" },
    { label: "Celestial Listeners", value: "1.2k", icon: "group", color: "text-secondary" },
    { label: "Total Resonance", value: "45k", icon: "bolt", color: "text-tertiary" },
  ];

  return (
    <main className="mr-8 pb-36 pt-4 page-transition flex-1">
      <TopNav placeholder="Search your archive..." />
      
      <div className="px-12 mt-12 relative">
        {/* Background Decorative Glow */}
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-secondary/5 blur-[120px]" />

        <div className="max-w-6xl mx-auto">
            {/* Header Section: Asymmetrical Editorial Layout */}
            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-end mb-24">
                {/* Large Avatar with Shadow Hierarchy */}
                <div className="relative group perspective-1000">
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary to-secondary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />
                    <div className="relative h-64 w-64 rounded-full p-2 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl transition-transform duration-700 hover:scale-[1.05] hover:rotate-2">
                        <div className="h-full w-full rounded-full overflow-hidden bg-surface-container-highest/40 flex items-center justify-center">
                            {user.user_metadata?.avatar_url ? (
                                <Image 
                                    src={user.user_metadata.avatar_url} 
                                    alt={user.email ?? "User"} 
                                    width={256} 
                                    height={256} 
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="material-symbols-outlined text-8xl text-primary/20">account_circle</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Identity & Bio */}
                <div className="flex-1 text-center lg:text-left z-10">
                    <span className="mb-6 inline-flex items-center gap-3 rounded-full bg-primary/10 pr-6 pl-2 py-2 font-label text-[10px] font-bold uppercase tracking-[0.4em] text-primary backdrop-blur-md outline outline-1 outline-primary/20">
                        <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[#0e0c1f]">
                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        </span>
                        Authenticated Astronaut
                    </span>
                    
                    <h1 className="text-editorial-lg text-gradient mb-6 leading-[0.8] lg:leading-[0.9]">
                        {user.email?.split('@')[0].toUpperCase()}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
                            <span className="font-label text-xs font-bold text-on-surface-variant tracking-widest uppercase">Nebula Station 01</span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">calendar_month</span>
                            <span className="font-label text-xs font-bold text-on-surface-variant tracking-widest uppercase">Joined Cycle 2026</span>
                        </div>
                    </div>
                </div>

                {/* Editorial "Status" Panel */}
                <div className="w-full lg:w-48 p-6 rounded-3xl glass-panel ghost-border shadow-2xl z-20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                            <span className="material-symbols-outlined text-primary text-lg">signal_cellular_alt</span>
                        </div>
                        <span className="text-[10px] font-black font-headline text-primary">LIVE</span>
                    </div>
                    <p className="font-headline text-lg font-bold leading-tight mb-1">Signal Status</p>
                    <p className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase mb-4">Synchronized</p>
                    <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[85%] bg-primary shadow-[0_0_8px_#00ffff]" />
                    </div>
                </div>
            </div>

            {/* Stats: Asymmetrical Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {stats.map((stat) => (
                    <div key={stat.label} className="group relative p-8 rounded-[32px] glass-panel ghost-border transition-all duration-500 hover:bg-white/5 hover:-translate-y-2 cursor-default overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                             <span className="material-symbols-outlined text-8xl">{stat.icon}</span>
                        </div>
                        <div className={`h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                            <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                        </div>
                        <h4 className="text-4xl font-headline font-black text-white mb-1">{stat.value}</h4>
                        <p className="font-label text-[11px] font-bold text-on-surface-variant tracking-[0.3em] uppercase">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Sections: Managed as Layered Glass */}
            <div className="space-y-12 pb-24">
                <section className="p-12 rounded-[40px] glass-panel-elevated ghost-border shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                        <span className="material-symbols-outlined text-white/5 text-9xl">auto_awesome</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-headline font-black tracking-tighter mb-8 flex items-center gap-3">
                            <span className="h-8 w-1 rounded-full bg-primary" />
                            Astrometrical Biography
                        </h3>
                        <p className="font-body text-lg text-on-surface-variant/80 max-w-3xl leading-relaxed">
                            A celestial conductor weaving sonic tapestries across the infinite void. Specializing in retro-futuristic resonance and gravitational synthwave, exploring the intersection of human emotion and cosmic frequencies.
                        </p>
                        
                        <div className="mt-12 flex flex-wrap gap-3">
                            {['Synthwave', 'Experimental', 'Digital Soul', 'Deep Space'].map(tag => (
                                <span key={tag} className="px-6 py-2 rounded-full glass-panel border border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 hover:text-primary hover:border-primary/40 transition-all cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="p-12 rounded-[40px] glass-panel ghost-border shadow-2xl relative overflow-hidden group transition-all duration-700 hover:bg-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                         <div className="flex-1">
                            <h3 className="text-2xl font-headline font-black tracking-tighter mb-4">Celestial Archive</h3>
                            <p className="font-body text-on-surface-variant/60 italic">Your personal directory of captured frequencies is currently being indexed across the nebula.</p>
                         </div>
                         <button className="px-10 py-5 primary-glow-button font-headline text-sm font-black tracking-[0.3em] uppercase">
                            Initialize Upload
                         </button>
                    </div>
                </section>
            </div>
        </div>
      </div>
    </main>
  );
}
