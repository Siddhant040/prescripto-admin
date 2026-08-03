import { AlertCircle, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { getInitials } from "../utils/adminUtils";

export const PageHeader = ({ eyebrow, title, description, action }) => (
  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
        {eyebrow}
      </p>
      <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
        {title}
      </h1>
      {description ? (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
    {action}
  </div>
);

export const SearchBox = ({ value, onChange, placeholder = "Search..." }) => (
  <label className="relative block">
    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
    />
  </label>
);

export const SelectFilter = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const StatusBadge = ({ value }) => {
  const normalized = String(value || "unknown").toLowerCase();
  const className =
    {
      verified: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      unverified: "bg-amber-50 text-amber-700 ring-amber-200",
      pending: "bg-amber-50 text-amber-700 ring-amber-200",
      confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      completed: "bg-teal-50 text-teal-700 ring-teal-200",
      cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
      deleted: "bg-rose-50 text-rose-700 ring-rose-200",
      active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    }[normalized] || "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${className}`}>
      {normalized}
    </span>
  );
};

export const AvatarName = ({ avatar, name, subtitle }) => (
  <div className="flex min-w-0 items-center gap-3">
    {avatar ? (
      <img src={avatar} alt={name} className="h-10 w-10 rounded-2xl object-cover" />
    ) : (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f766e,#34d399)] text-xs font-semibold text-white">
        {getInitials(name)}
      </div>
    )}
    <div className="min-w-0">
      <p className="truncate font-semibold text-slate-950">{name || "Not available"}</p>
      <p className="truncate text-xs text-slate-500">{subtitle || "No details"}</p>
    </div>
  </div>
);

export const Panel = ({ children, className = "" }) => (
  <section className={`rounded-[20px] border border-emerald-100/70 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)] ${className}`}>
    {children}
  </section>
);

export const EmptyState = ({ title = "No records found", message }) => (
  <div className="flex min-h-60 flex-col items-center justify-center rounded-[20px] border border-dashed border-slate-200 bg-slate-50/70 p-6 text-center">
    <AlertCircle className="h-8 w-8 text-slate-400" />
    <h3 className="mt-3 text-base font-semibold text-slate-950">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-slate-500">
      {message || "Try adjusting your filters or search query."}
    </p>
  </div>
);

export const ErrorState = ({ message }) => (
  <Panel className="p-6">
    <div className="flex items-start gap-3 rounded-2xl bg-rose-50 p-4 text-rose-700">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">Could not load data</p>
        <p className="mt-1 text-sm">{message || "Please try again."}</p>
      </div>
    </div>
  </Panel>
);

export const TableSkeleton = ({ rows = 6, columns = 5 }) => (
  <div className="space-y-3 p-5">
    {Array.from({ length: rows }).map((_, row) => (
      <div key={row} className="grid animate-pulse gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(120px, 1fr))` }}>
        {Array.from({ length: columns }).map((__, column) => (
          <div key={column} className="h-5 rounded-full bg-slate-200" />
        ))}
      </div>
    ))}
  </div>
);

export const Pagination = ({ page, limit, total, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil((total || 0) / limit));

  return (
    <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-emerald-600 px-3 text-sm font-semibold text-white">
          {page}
        </span>
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  isLoading,
  onCancel,
  onConfirm,
  variant = "default",
}) => {
  if (!open) return null;

  const confirmClass =
    variant === "danger"
      ? "bg-rose-600 hover:bg-rose-700"
      : "bg-emerald-600 hover:bg-emerald-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${confirmClass}`}
          >
            {isLoading ? "Working..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
