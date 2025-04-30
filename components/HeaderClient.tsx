'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggler } from "./ThemeToggler";

export default function HeaderClient() {
  const pathname = usePathname();
  
  // Check if we're on the login page
  const isLoginPage = pathname === '/login';
  
  return (
    <div className="flex space-x-2 items-center">
      {!isLoginPage && (
        <Link
          href="/redirects"
          className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium"
        >
          Redirects
        </Link>
      )}
      <ThemeToggler />
    </div>
  );
}
