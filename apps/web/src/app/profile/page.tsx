"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Camera,
  Mail,
  User as UserIcon,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    // You could update the user in AuthContext here
  };

  const handleCancel = () => {
    setEditedName(user?.name || "");
    setEditedEmail(user?.email || "");
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-700 relative">
          <button className="absolute bottom-4 right-4 p-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                  <img
                    src={
                      user?.avatar ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-all">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Name & Email */}
              <div className="pb-2">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-3xl font-bold text-gray-900 border-b-2 border-black focus:outline-none bg-transparent"
                    />
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="text-lg text-gray-500 border-b border-gray-300 focus:outline-none bg-transparent"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                      {user?.name || "Guest User"}
                    </h1>
                    <p className="text-lg text-gray-500">
                      {user?.email || "guest@fashiondeck.com"}
                    </p>
                  </>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                    Premium Member
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    Fashion Enthusiast
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 md:mt-0">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2.5 bg-gray-100 text-gray-900 rounded-xl font-medium text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2.5 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-all flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-500">Saved Outfits</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Favorite Brands</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-500">Collections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-500">Items Viewed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - About & Preferences */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              About
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{user?.email || "guest@fashiondeck.com"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Joined January 2026</span>
              </div>
            </div>
          </div>

          {/* Style Preferences */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Style Preferences</h2>
              <button className="text-sm text-gray-500 hover:text-black transition-colors">
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Minimalist",
                "Streetwear",
                "Vintage",
                "Black & White",
                "Korean Fashion",
                "Sustainable",
                "Casual",
                "Athleisure",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Size Preferences */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Size Preferences</h2>
              <button className="text-sm text-gray-500 hover:text-black transition-colors">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Tops</p>
                <p className="text-lg font-semibold">M</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Bottoms</p>
                <p className="text-lg font-semibold">32</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Shoes</p>
                <p className="text-lg font-semibold">10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Activity & Settings */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                {
                  action: "Saved outfit",
                  item: "Korean Minimal Look",
                  time: "2 hours ago",
                },
                {
                  action: "Viewed",
                  item: "Vintage Denim Jacket",
                  time: "5 hours ago",
                },
                {
                  action: "Created collection",
                  item: "Summer Essentials",
                  time: "1 day ago",
                },
                {
                  action: "Liked",
                  item: "Streetwear Bundle",
                  time: "2 days ago",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-black mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}{" "}
                      <span className="text-gray-600">{activity.item}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                Privacy Settings
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                Notifications
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                Payment Methods
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-red-600">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
