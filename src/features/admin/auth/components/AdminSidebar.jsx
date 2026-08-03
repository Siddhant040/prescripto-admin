import {
    CalendarDays,
    LayoutGrid,
    MessageSquareText,
    ShieldCheck,
    Stethoscope,
    UsersRound,
    X
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutGrid, end: true },
  { label: "Doctors", to: "/admin/doctors", icon: Stethoscope },
  { label: "Appointments", to: "/admin/appointments", icon: CalendarDays },
  { label: "Reviews", to: "/admin/reviews", icon: MessageSquareText },
  
];

function AdminSidebar({ isMobileOpen = false, onClose }) {
  return (
    <>
      <aside className="sticky top-3 hidden max-h-[calc(100vh-1.5rem)] min-h-[calc(100vh-1.5rem)] flex-col rounded-[24px] border border-slate-200 bg-white px-4 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] xl:flex">
        <SidebarContent />
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />
          <aside className="relative flex h-full w-[min(320px,calc(100vw-2rem))] flex-col bg-white px-4 py-5 shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent onNavigate={onClose} />
          </aside>
        </div>
      ) : null}
    </>
  );
}

const SidebarContent = ({ onNavigate }) => (
  <>
    <div className="flex items-center gap-3 px-2">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f766e,#34d399)] text-white shadow-[0_10px_22px_rgba(15,118,110,0.2)]">
        <ShieldCheck className="h-5 w-5" />
      </div>
      <div>
        <p className="text-base font-semibold tracking-tight text-slate-950">
          Prescripto
        </p>
        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
          Admin Portal
        </p>
      </div>
    </div>

    <nav className="mt-7 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex h-12 items-center gap-3 rounded-2xl px-3 text-[15px] font-medium transition ${
                isActive
                  ? "bg-[linear-gradient(135deg,#0f766e,#14b8a6)] text-white shadow-[0_12px_24px_rgba(15,118,110,0.2)]"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-slate-950"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-emerald-700"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>

    <div className="mt-auto rounded-[20px] border border-emerald-100 bg-emerald-50/70 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
        <UsersRound className="h-5 w-5" />
      </div>
      <p className="mt-4 font-semibold text-slate-950">Admin workspace</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Manage verification, appointments and review moderation.
      </p>
    </div>
  </>
);

export default AdminSidebar;
