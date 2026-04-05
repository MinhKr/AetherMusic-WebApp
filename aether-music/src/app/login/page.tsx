import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-8">
        {/* Logo */}
        <div className="mb-12 text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-[#c1fffe] drop-shadow-[0_0_16px_rgba(0,255,255,0.5)]">
            SONIC
          </h1>
          <p className="mt-2 font-label text-sm uppercase tracking-[0.3em] text-secondary-dim opacity-80">
            Celestial Conductor
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl glass-panel ghost-border p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h2 className="mb-2 font-headline text-2xl font-bold text-on-surface text-center">
            Welcome to the Nebula
          </h2>
          <p className="mb-8 font-body text-sm text-on-surface-variant text-center">
            AetherMusic is now independent. Explore the cosmic rhythm as a guest traveler.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("guest", { redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-headline font-bold text-on-primary transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] cursor-pointer"
            >
              <span className="material-symbols-outlined">auto_awesome</span>
              Enter as Guest
            </button>
          </form>

          <p className="mt-8 text-center font-body text-[10px] text-on-surface-variant/40 uppercase tracking-[0.2em]">
            Standalone Edition · v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
