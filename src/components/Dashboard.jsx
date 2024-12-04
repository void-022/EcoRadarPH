import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { Toaster } from "@/components/ui/toaster";

export default function Dashboard({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <div className="h-48 w-48 bg-red-600"></div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
