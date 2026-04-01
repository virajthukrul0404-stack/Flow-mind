import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Sidebar } from "@/components/dashboard/sidebar";
import { getViewer } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const viewer = await getViewer();

  if (!viewer) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100/80 xl:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <DashboardHeader viewer={viewer} />
        <main className="px-4 py-6 pb-24 sm:px-6 lg:px-8">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
