import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { getViewer } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const viewer = await getViewer();

  if (!viewer) {
    redirect("/login");
  }

  return (
    <div className="flex bg-white dark:bg-zinc-950 min-h-screen selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900/30 dark:selection:text-blue-100">
      <Sidebar />
      <div className="flex-1 md:ml-64 relative w-full max-w-[100vw] overflow-x-hidden">
        <main className="w-full h-full p-4 md:p-8 pt-20 md:pt-8 animate-in fade-in duration-500">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
