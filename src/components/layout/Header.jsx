import { Bell, ChevronUp, LayoutGrid, LogOut, Search, Settings, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../features/admin/auth/hooks/useAuth";

const getInitials = (name) => {
  if (!name) return "AM";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};

const getFirstName = (name) => {
  if (!name) return "Alex";
  return name.split(" ").filter(Boolean)[0] || "Alex";
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const Header = ({ onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, handleLogout, isLoggingOut } = useAuth();

  // UI-only fallback data (no auth or navigation)
  const profileName = user?.name ?? "Alex";
  const profileEmail = user?.email ?? "";
  const profileImage = user?.avatar; // leave empty to use initials fallback

  const avatarFallback = getInitials(profileName);
  const firstName = getFirstName(profileName);
  const greeting = useMemo(() => getGreeting(), []);
   const menuRef = useRef(null);
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);
  const onLogout = async () => {
    try {
      const response = await handleLogout();
      toast.success(response?.message || "Logged out successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Logout failed"
      );
    }
  };
  if(!user){
    return <div>Loading...</div>
  }

  return (
    <header className="sticky top-3 z-30 min-h-18 rounded-[24px] border border-emerald-100/80 bg-white/95 px-6 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition hover:border-emerald-200 hover:bg-emerald-100"
            aria-label="Workspace menu"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>

          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-slate-950">
              {greeting}, {firstName}
            </h1>
            <p className="mt-0.5 text-[13px] text-slate-500">Here's what's happening with your healthcare today.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-emerald-100 bg-slate-50/70 px-4 py-2.5 lg:w-85">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctors or appointments..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="flex items-center gap-3">
            <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-100 bg-white text-slate-700">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>

            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="flex h-11 items-center gap-2 rounded-full border border-emerald-100 bg-white p-1.5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#0f766e,#34d399)] text-sm font-semibold text-white">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={profileName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    avatarFallback
                  )}
                </div>

                <ChevronUp
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-64 rounded-3xl border border-slate-200 bg-white p-2 shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
                  {/* User Info */}
                  <div className="flex items-center gap-3 rounded-2xl px-3 py-3">
                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#0f766e,#34d399)] text-sm font-semibold text-white">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={profileName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        avatarFallback
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {profileName}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {profileEmail}
                      </p>
                    </div>
                  </div>

                  <div className="my-2 h-px bg-slate-100" />

                  {/* Profile */}
                  <Link
                    to="/admin/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>

                  {/* Settings */}
                  <Link
                    to="/admin/settings"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Link>

                  <div className="my-2 h-px bg-slate-100" />

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={async () => {
                      setIsMenuOpen(false);
                      await onLogout();
                    }}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
