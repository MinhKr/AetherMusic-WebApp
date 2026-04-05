import { auth, signOut } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="mr-8 pb-36 pt-6">
      <div className="px-8">
        {/* Profile hero */}
        <section className="relative mb-12 h-72 w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-surface-container" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />
          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-10">
            <div className="flex items-end gap-6">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/40 flex items-center justify-center border-2 border-primary/40 shadow-[0_0_20px_rgba(0,255,255,0.3)] flex-shrink-0">
                <span className="material-symbols-outlined text-5xl text-primary/70" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
              </div>
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">
                  Independent Explorer
                </span>
                <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-white">
                  {user?.name ?? "Guest Traveler"}
                </h2>
                <p className="font-body text-on-surface-variant">
                  Aether Music Platform · Standalone Edition
                </p>
              </div>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-surface-container-high/80 px-6 py-3 font-headline text-sm font-bold text-on-surface backdrop-blur-md outline outline-1 outline-white/10 transition-all hover:outline-primary/40"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Sign Out
              </button>
            </form>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-8">
          {/* Left: Placeholder DNA */}
          <div className="col-span-2 space-y-8">
            <div>
              <h3 className="mb-6 font-headline text-2xl font-bold">Sonic DNA</h3>
              <div className="rounded-2xl glass-panel ghost-border p-12 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-primary/20 mb-4">
                  dna
                </span>
                <h4 className="font-headline text-xl font-bold text-on-surface">Sequence Pending</h4>
                <p className="mt-2 text-sm text-on-surface-variant max-w-xs">
                  We are building an independent recommendation engine. Your Sonic DNA will be reconstructed soon.
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-headline text-2xl font-bold">Your Universe</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 rounded-2xl glass-panel ghost-border flex items-center justify-center opacity-20">
                    <span className="text-[10px] uppercase tracking-widest">Orbit Alpha</span>
                </div>
                <div className="h-32 rounded-2xl glass-panel ghost-border flex items-center justify-center opacity-20">
                    <span className="text-[10px] uppercase tracking-widest">Orbit Beta</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Status */}
          <div>
            <h3 className="mb-6 font-headline text-2xl font-bold">Status</h3>
            <div className="space-y-4 rounded-2xl glass-panel ghost-border p-6">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant">Identity</span>
                    <span className="text-sm font-bold text-primary">Guest</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant">Sync</span>
                    <span className="text-sm font-bold text-secondary">Disabled</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant">Version</span>
                    <span className="text-sm font-bold text-white/40">1.0.0-standalone</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
