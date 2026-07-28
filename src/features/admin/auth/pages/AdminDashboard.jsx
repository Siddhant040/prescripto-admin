import {
  Bell,
  CalendarClock,
  CheckCircle2,
  MessageSquareText,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { EmptyState, ErrorState, PageHeader, Panel } from "../components/adminUi";
import { useAdminDashboard } from "../hooks/useAdminQueries";

const statConfig = [
  { key: "users", label: "Users", icon: UsersRound, accent: "bg-slate-100 text-slate-700" },
  { key: "doctors", label: "Doctors", icon: Stethoscope, accent: "bg-emerald-50 text-emerald-700" },
  { key: "verifiedDoctors", label: "Verified", icon: CheckCircle2, accent: "bg-teal-50 text-teal-700" },
  { key: "appointments", label: "Appointments", icon: CalendarClock, accent: "bg-amber-50 text-amber-700" },
  { key: "completedAppointments", label: "Completed", icon: CheckCircle2, accent: "bg-green-50 text-green-700" },
  { key: "pendingAppointments", label: "Pending", icon: CalendarClock, accent: "bg-orange-50 text-orange-700" },
  { key: "activeReviews", label: "Active Reviews", icon: MessageSquareText, accent: "bg-cyan-50 text-cyan-700" },
  { key: "notifications", label: "Notifications", icon: Bell, accent: "bg-indigo-50 text-indigo-700" },
];

function AdminDashboard() {
  const { data, isLoading, isError, error } = useAdminDashboard();

  if (isError) {
    return (
      <div className="w-full px-1 pb-1">
        <PageHeader
          eyebrow="Admin dashboard"
          title="Platform overview"
          description="Monitor core Prescripto activity."
        />
        <ErrorState message={error?.response?.data?.message} />
      </div>
    );
  }

  const hasData = data && Object.values(data).some((value) => Number(value) > 0);

  return (
    <div className="w-full px-1 pb-1">
      <PageHeader
        eyebrow="Admin dashboard"
        title="Platform overview"
        description="Monitor users, doctors, appointments and moderation signals."
      />

      {isLoading ? (
        <DashboardSkeleton />
      ) : !hasData ? (
        <EmptyState
          title="No dashboard activity yet"
          message="Statistics will appear when users start using the platform."
        />
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {statConfig.map((item) => (
              <StatCard key={item.key} item={item} value={data?.[item.key] || 0} />
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <Panel className="p-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Appointment activity
              </p>
              <div className="mt-5 space-y-4">
                <ProgressRow
                  label="Completed"
                  value={data.completedAppointments}
                  total={data.appointments}
                  className="bg-emerald-500"
                />
                <ProgressRow
                  label="Pending"
                  value={data.pendingAppointments}
                  total={data.appointments}
                  className="bg-amber-500"
                />
              </div>
            </Panel>

            <Panel className="p-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Doctor verification
              </p>
              <div className="mt-5 space-y-4">
                <ProgressRow
                  label="Verified doctors"
                  value={data.verifiedDoctors}
                  total={data.doctors}
                  className="bg-teal-500"
                />
                <ProgressRow
                  label="Pending verification"
                  value={Math.max((data.doctors || 0) - (data.verifiedDoctors || 0), 0)}
                  total={data.doctors}
                  className="bg-orange-500"
                />
              </div>
            </Panel>
          </div>
        </div>
      )}
    </div>
  );
}

const StatCard = ({ item, value }) => {
  const Icon = item.icon;

  return (
    <Panel className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.accent}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </Panel>
  );
};

const ProgressRow = ({ label, value = 0, total = 0, className }) => {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-semibold text-slate-950">{value} / {total}</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${className}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="space-y-4">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Panel key={index} className="animate-pulse p-4">
          <div className="h-4 w-24 rounded-full bg-slate-200" />
          <div className="mt-4 h-9 w-16 rounded-full bg-slate-200" />
        </Panel>
      ))}
    </div>
    <div className="grid gap-4 xl:grid-cols-2">
      <Panel className="h-52 animate-pulse bg-slate-50" />
      <Panel className="h-52 animate-pulse bg-slate-50" />
    </div>
  </div>
);

export default AdminDashboard;
