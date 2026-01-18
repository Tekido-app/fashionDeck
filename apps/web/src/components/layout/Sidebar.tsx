"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, User, LayoutGrid, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Home", href: "/app", icon: Home },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="fixed left-4 top-4 bottom-4 w-20 md:w-64 bg-black text-white rounded-2xl flex flex-col p-4 shadow-2xl z-50">
      <div className="flex items-center justify-center md:justify-start gap-3 p-2 mb-8">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl">
          F.
        </div>
        <span className="font-bold text-xl hidden md:block tracking-wide">
          FashionDeck
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon
                className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
              />
              <span className="hidden md:block">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white hidden md:block" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <LogOut className="w-6 h-6" />
          <span className="hidden md:block">Log Out</span>
        </button>
      </div>
    </div>
  );
}
