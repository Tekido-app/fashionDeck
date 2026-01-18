"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAuth } from "@/context/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, isPublicRoute, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-black rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show dashboard layout for public routes
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Don't render dashboard if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex">
      {/* Sidebar Placeholder Space - since Sidebar is fixed, we need margin */}
      <div className="hidden md:block w-72 flex-shrink-0" />{" "}
      {/* 64 (width) + 4 (left) + 4 (margin right roughly) */}
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen md:pl-4 transition-all duration-300">
        <Header />
        <main className="flex-1 p-6 pt-2">{children}</main>
      </div>
    </div>
  );
}
