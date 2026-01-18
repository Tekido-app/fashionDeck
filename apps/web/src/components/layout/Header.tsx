"use client";

import { Search, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="flex items-center justify-between p-6 bg-transparent">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
          <input
            type="text"
            placeholder="Search for outfits, styles..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-black/5 transition-all outline-none text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="p-2.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-black relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              {user?.name || "Guest"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "Fashion Enthusiast"}
            </p>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
                alt="Guest"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
