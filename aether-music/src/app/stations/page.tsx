import TopNav from "@/components/TopNav";

export default function StationsPage() {
  return (
    <main className="mr-8 pb-36 pt-6 flex-1">
      <TopNav placeholder="Search stations..." />
      <div className="px-8 mt-20 flex flex-col items-center justify-center opacity-60 text-center">
        <span className="material-symbols-outlined text-6xl mb-6">radio</span>
        <h2 className="text-3xl font-headline font-bold mb-2">Stations</h2>
        <p className="font-body text-on-surface-variant max-w-sm">
          Coming soon. Explore infinite cosmic radio stations curated from your library.
        </p>
      </div>
    </main>
  );
}
