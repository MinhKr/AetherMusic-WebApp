import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TopNav from "@/components/TopNav";

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mr-8 pb-36 pt-6 flex-1">
      <TopNav placeholder="Search your collection..." />
      <div className="px-8 mt-20 flex flex-col items-center justify-center opacity-60 text-center">
        <span className="material-symbols-outlined text-6xl mb-6">library_music</span>
        <h2 className="text-3xl font-headline font-bold mb-2">Your Library</h2>
        <p className="font-body text-on-surface-variant max-w-sm">
          Coming soon. This page will display your saved tracks and custom playlists stored safely in the Nebula via Supabase.
        </p>
      </div>
    </main>
  );
}
