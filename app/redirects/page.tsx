import { Metadata } from "next";
import RedirectManager from "@/components/RedirectManager";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Redirect Link Manager",
  description: "Create and manage redirect links",
};

export default function RedirectsPage() {
  // If not authenticated, redirect to login page
  if (!isAuthenticated()) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Redirect Link Manager</h1>
        <LogoutButton />
      </div>
      <RedirectManager />
    </div>
  );
}
