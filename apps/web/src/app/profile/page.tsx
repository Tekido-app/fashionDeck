"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Camera,
  Mail,
  User as UserIcon,
  MapPin,
  Calendar,
  Edit2,
  Shuffle,
  ChevronRight,
  Bell,
  Lock,
  LogOut,
  CreditCard,
  Shield,
  Check,
} from "lucide-react";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  // Edit Modes
  const [editMode, setEditMode] = useState<{
    profile: boolean;
    styles: boolean;
    sizes: boolean;
    about: boolean;
  }>({
    profile: false,
    styles: false,
    sizes: false,
    about: false,
  });

  // Local State for Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "Mumbai, India",
    styles: [] as string[],
    sizes: { tops: "M", bottoms: "32", shoes: "9" },
    settings: {
      notifications: { email: true, push: true, marketing: false },
      privacy: { publicProfile: true, showActivity: true },
    },
  });

  // Settings Accordion State
  const [activeSetting, setActiveSetting] = useState<string | null>(null);

  // Initialize state from user context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        location: user.location || "Mumbai, India",
        styles: user.preferences?.styles || ["Minimalist", "Streetwear"],
        sizes: {
          tops: user.preferences?.sizes?.tops || "M",
          bottoms: user.preferences?.sizes?.bottoms || "32",
          shoes: user.preferences?.sizes?.shoes || "9",
        },
        settings: {
          notifications: {
            email: user.settings?.notifications?.email ?? true,
            push: user.settings?.notifications?.push ?? true,
            marketing: user.settings?.notifications?.marketing ?? false,
          },
          privacy: {
            publicProfile: user.settings?.privacy?.publicProfile ?? true,
            showActivity: user.settings?.privacy?.showActivity ?? true,
          },
        },
      });
    }
  }, [user]);

  const toggleEdit = (section: keyof typeof editMode) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const saveSection = async (section: keyof typeof editMode) => {
    // Construct the update object based on the section
    let updateData = {};

    if (section === "profile") {
      updateData = { name: formData.name, email: formData.email };
    } else if (section === "about") {
      updateData = { location: formData.location };
    } else if (section === "styles") {
      updateData = {
        preferences: { ...user?.preferences, styles: formData.styles },
      };
    } else if (section === "sizes") {
      updateData = {
        preferences: { ...user?.preferences, sizes: formData.sizes },
      };
    }

    await updateProfile(updateData);
    toggleEdit(section);
  };

  const regenerateAvatar = async () => {
    const randomSeed = Math.random().toString(36).substring(7);
    await updateProfile({
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`,
    });
  };

  const toggleStyle = (style: string) => {
    setFormData((prev) => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter((s) => s !== style)
        : [...prev.styles, style],
    }));
  };

  const toggleSetting = async (
    category: "notifications" | "privacy",
    key: string,
  ) => {
    const newSettings = {
      ...formData.settings,
      [category]: {
        ...formData.settings[category],
        // @ts-ignore - dynamic key access
        [key]: !formData.settings[category][key],
      },
    };

    setFormData((prev) => ({ ...prev, settings: newSettings }));
    await updateProfile({ settings: newSettings });
  };

  const AVAILABLE_STYLES = [
    "Minimalist",
    "Streetwear",
    "Vintage",
    "Old Money",
    "Korean",
    "Y2K",
    "Gorpcore",
    "Avant Garde",
    "Casual",
    "Athleisure",
    "Business",
    "Party",
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Header Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative group">
        <div className="h-48 bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="px-8 md:px-12 pb-10 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8">
            {/* Avatar - Moves up to overlap cover */}
            <div className="relative group/avatar -mt-20 mb-4 md:mb-0 shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl bg-white">
                <img
                  src={
                    user?.avatar ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={regenerateAvatar}
                className="absolute bottom-3 right-3 p-2.5 bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 hover:scale-105 transition-all opacity-0 group-hover/avatar:opacity-100 translate-y-2 group-hover/avatar:translate-y-0"
                title="Regenerate Avatar"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>

            {/* User Info - Stays in the white area */}
            <div className="flex-1 w-full md:w-auto pt-2 md:pb-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1 w-full max-w-lg">
                  {editMode.profile ? (
                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-200 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full text-xl font-bold text-gray-900 bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => toggleEdit("profile")}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveSection("profile")}
                          className="px-6 py-2 text-sm font-bold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/20"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                        {user?.name || "Guest User"}
                      </h1>
                      <div className="flex items-center gap-3 text-gray-500 font-medium">
                        <Mail className="w-4 h-4" />
                        <span>{user?.email || "guest@fashiondeck.com"}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Badge>PRO MEMBER</Badge>
                        <Badge variant="secondary">EARLY ADOPTER</Badge>
                      </div>
                    </>
                  )}
                </div>

                {!editMode.profile && (
                  <button
                    onClick={() => toggleEdit("profile")}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
            <StatItem label="Saved Outfits" value="24" />
            <StatItem label="Favorite Brands" value="12" />
            <StatItem label="Collections" value="8" />
            <StatItem label="Style Score" value="98" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content (Left) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Style Vibe Section */}
          <Section
            title="Style Vibe"
            isEditing={editMode.styles}
            onEdit={() => toggleEdit("styles")}
            onSave={() => saveSection("styles")}
            onCancel={() => toggleEdit("styles")}
            count={formData.styles.length}
          >
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_STYLES.map((style) => {
                const isSelected = formData.styles.includes(style);
                return (
                  <button
                    key={style}
                    disabled={!editMode.styles}
                    onClick={() => toggleStyle(style)}
                    className={`
                      px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                      ${
                        isSelected
                          ? "bg-black text-white border-black shadow-lg shadow-black/10 scale-105"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }
                      ${!editMode.styles && !isSelected ? "opacity-40 grayscale" : ""}
                      ${editMode.styles ? "cursor-pointer active:scale-95" : "cursor-default"}
                    `}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Size Profile Section */}
          <Section
            title="Size Profile"
            isEditing={editMode.sizes}
            onEdit={() => toggleEdit("sizes")}
            onSave={() => saveSection("sizes")}
            onCancel={() => toggleEdit("sizes")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <SizeSelect
                label="Tops & Tees"
                value={formData.sizes.tops}
                options={["XS", "S", "M", "L", "XL", "XXL"]}
                isEditing={editMode.sizes}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    sizes: { ...formData.sizes, tops: val },
                  })
                }
              />
              <SizeSelect
                label="Bottoms"
                value={formData.sizes.bottoms}
                options={["28", "30", "32", "34", "36", "38", "40"]}
                isEditing={editMode.sizes}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    sizes: { ...formData.sizes, bottoms: val },
                  })
                }
              />
              <SizeSelect
                label="Shoes (UK)"
                value={formData.sizes.shoes}
                options={["6", "7", "8", "9", "10", "11", "12"]}
                isEditing={editMode.sizes}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    sizes: { ...formData.sizes, shoes: val },
                  })
                }
              />
            </div>
          </Section>

          {/* About Section (Location) */}
          <Section
            title="About"
            isEditing={editMode.about}
            onEdit={() => toggleEdit("about")}
            onSave={() => saveSection("about")}
            onCancel={() => toggleEdit("about")}
          >
            <div className="grid gap-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black border border-gray-100 shadow-sm mr-5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Contact Email
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    {formData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black border border-gray-100 shadow-sm mr-5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  {editMode.about ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-black transition-colors mt-1"
                      placeholder="City, Country"
                    />
                  ) : (
                    <p className="text-base font-semibold text-gray-900">
                      {formData.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black border border-gray-100 shadow-sm mr-5">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Member Since
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    January 2026
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Sidebar (Right) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Settings Card */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-8 pb-4">
              <h2 className="text-xl font-bold mb-2">Settings</h2>
              <p className="text-sm text-gray-500">
                Manage your app preferences
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Notifications */}
              <SettingAccordion
                icon={<Bell className="w-5 h-5" />}
                title="Notifications"
                isOpen={activeSetting === "notifications"}
                onToggle={() =>
                  setActiveSetting(
                    activeSetting === "notifications" ? null : "notifications",
                  )
                }
              >
                <div className="space-y-4 p-2">
                  <Toggle
                    label="Email Digest"
                    checked={formData.settings.notifications.email}
                    onChange={() => toggleSetting("notifications", "email")}
                  />
                  <Toggle
                    label="Push Notifications"
                    checked={formData.settings.notifications.push}
                    onChange={() => toggleSetting("notifications", "push")}
                  />
                  <Toggle
                    label="Marketing Emails"
                    checked={formData.settings.notifications.marketing}
                    onChange={() => toggleSetting("notifications", "marketing")}
                  />
                </div>
              </SettingAccordion>

              {/* Privacy */}
              <SettingAccordion
                icon={<Shield className="w-5 h-5" />}
                title="Privacy & Security"
                isOpen={activeSetting === "privacy"}
                onToggle={() =>
                  setActiveSetting(
                    activeSetting === "privacy" ? null : "privacy",
                  )
                }
              >
                <div className="space-y-4 p-2">
                  <Toggle
                    label="Public Profile"
                    checked={formData.settings.privacy.publicProfile}
                    onChange={() => toggleSetting("privacy", "publicProfile")}
                  />
                  <Toggle
                    label="Show Activity"
                    checked={formData.settings.privacy.showActivity}
                    onChange={() => toggleSetting("privacy", "showActivity")}
                  />
                  <button className="w-full text-left text-sm font-medium text-blue-600 hover:text-blue-700 py-2">
                    Change Password
                  </button>
                </div>
              </SettingAccordion>

              {/* Billing Placeholder */}
              <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center text-gray-500 group-hover:text-black transition-colors">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-black transition-colors">
                    Billing
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
              </div>

              {/* Sign Out */}
              <div className="p-4 hover:bg-red-50 transition-colors cursor-pointer group flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-white flex items-center justify-center text-red-500 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-red-600">Sign Out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
interface SectionProps {
  title: string;
  children: React.ReactNode;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  count?: number;
}

function Section({
  title,
  children,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  count,
}: SectionProps) {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 transition-all hover:shadow-md duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          {title}
          {count !== undefined && (
            <span className="text-xs font-bold bg-black text-white px-2.5 py-1 rounded-full">
              {count}
            </span>
          )}
        </h2>
        {isEditing ? (
          <div className="flex gap-2 animate-in fade-in duration-200">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-black hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save
            </button>
          </div>
        ) : (
          <button
            onClick={onEdit}
            className="p-3 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Badge({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <span
      className={`
      px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-md
      ${variant === "primary" ? "bg-black text-white" : "bg-gray-100 text-gray-600"}
    `}
    >
      {children}
    </span>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-black text-gray-900 tracking-tight">
        {value}
      </p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  );
}

interface SizeSelectProps {
  label: string;
  value: string;
  options: string[];
  isEditing: boolean;
  onChange: (val: string) => void;
}

function SizeSelect({
  label,
  value,
  options,
  isEditing,
  onChange,
}: SizeSelectProps) {
  return (
    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
        {label}
      </p>
      {isEditing ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5"
        >
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-3xl font-black text-gray-900">{value}</p>
      )}
    </div>
  );
}

interface SettingAccordionProps {
  icon: React.ReactNode;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function SettingAccordion({
  icon,
  title,
  isOpen,
  onToggle,
  children,
}: SettingAccordionProps) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all ${isOpen ? "bg-gray-50" : ""}`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-black text-white" : "bg-gray-50 text-gray-500"}`}
          >
            {icon}
          </div>
          <span
            className={`font-bold transition-colors ${isOpen ? "text-black" : "text-gray-700"}`}
          >
            {title}
          </span>
        </div>
        <ChevronRight
          className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${isOpen ? "rotate-90 text-black" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-6 bg-gray-50/50">{children}</div>
      </div>
    </div>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        onClick={onChange}
        className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${checked ? "bg-black" : "bg-gray-200"}`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
