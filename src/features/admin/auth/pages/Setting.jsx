import { KeyRound, ShieldCheck } from "lucide-react";
import { PageHeader, Panel } from "../components/adminUi";

function Setting() {
  return (
    <div className="w-full px-1 pb-1">
      <PageHeader
        eyebrow="Settings"
        title="Admin preferences"
        description="Manage account security and portal preferences."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel className="p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-lg font-semibold text-slate-950">Security status</p>
              <p className="text-sm text-slate-500">Admin portal access is protected.</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-slate-600">
            Password and session controls can be wired here when backend endpoints are ready.
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <KeyRound className="h-5 w-5" />
            </span>
            <div>
              <p className="text-lg font-semibold text-slate-950">Change password</p>
              <p className="text-sm text-slate-500">UI placeholder for future integration.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {["Current password", "New password", "Confirm password"].map((label) => (
              <label key={label} className="block">
                <span className="text-sm font-medium text-slate-600">{label}</span>
                <input
                  type="password"
                  className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                />
              </label>
            ))}
            <button
              type="button"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Change Password
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}

export default Setting;
