import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TopNav from "@/components/TopNav";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mr-8 pb-36 pt-6 flex-1">
      <TopNav placeholder="Search profile..." />
      <div className="px-8 mt-20 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-6xl mb-6 text-primary">account_circle</span>
        <h2 className="text-3xl font-headline font-bold mb-2">Astronaut Profile</h2>
        <p className="font-body text-on-surface-variant max-w-md">
          Identity: {user.email} <br/>
          ID: {user.id}
        </p>
      </div>
    </main>
  );
}
