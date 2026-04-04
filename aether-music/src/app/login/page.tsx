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
          <h2 className="mb-2 font-headline text-2xl font-bold text-on-surface">
            Enter the Nebula
          </h2>
          <p className="mb-8 font-body text-sm text-on-surface-variant">
            Connect your Spotify account to unlock your personalized cosmic experience.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("spotify", { redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#1DB954] px-8 py-4 font-headline font-bold text-black transition-all hover:bg-[#1ed760] hover:shadow-[0_0_20px_rgba(29,185,84,0.4)]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Connect with Spotify
            </button>
          </form>

          <p className="mt-6 text-center font-body text-xs text-on-surface-variant/60">
            Requires a Spotify account. Premium needed for playback.
          </p>
        </div>
      </div>
    </div>
  );
}
