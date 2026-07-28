import { Mail, ShieldCheck, User } from "lucide-react";
import { AvatarName, PageHeader, Panel } from "../components/adminUi";
import { useAuth } from "../hooks/useAuth";

function MyProfile() {
  const { user } = useAuth();

  return (
    <div className="w-full px-1 pb-1">
      <PageHeader
        eyebrow="My profile"
        title="Admin account"
        description="Review your Prescripto admin identity."
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Panel className="p-5">
          <AvatarName avatar={user?.avatar} name={user?.name} subtitle={user?.email} />
          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
            <p className="text-sm font-semibold text-emerald-800">Administrator</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Admin access is used for platform monitoring, verification, and moderation.
            </p>
          </div>
        </Panel>

        <Panel className="p-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Account information
          </p>
          <div className="mt-4 grid gap-3">
            <Info icon={User} label="Name" value={user?.name} />
            <Info icon={Mail} label="Email" value={user?.email} />
            <Info icon={ShieldCheck} label="Active Role" value={user?.activeRole || "admin"} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

const Info = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <Icon className="h-4 w-4" />
    </span>
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-1 text-[15px] font-medium text-slate-900">{value || "Not available"}</p>
    </div>
  </div>
);

export default MyProfile;
