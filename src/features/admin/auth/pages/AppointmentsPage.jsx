import { useMemo, useState } from "react";
import {
  AvatarName,
  EmptyState,
  ErrorState,
  formatDateTime,
  PageHeader,
  Pagination,
  Panel,
  SearchBox,
  SelectFilter,
  StatusBadge,
  TableSkeleton,
} from "../components/adminUi";
import { useAdminAppointments } from "../hooks/useAdminQueries";

const LIMIT = 10;

function AppointmentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { data, isLoading, isError, error } = useAdminAppointments({
    page,
    limit: LIMIT,
    status,
  });

  const appointments = data?.appointments || [];
  const filteredAppointments = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return appointments;

    return appointments.filter((appointment) =>
      [
        appointment.id,
        appointment.patient?.name,
        appointment.patient?.email,
        appointment.doctor?.name,
        appointment.doctor?.email,
        appointment.doctor?.specialization,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [appointments, search]);

  return (
    <div className="w-full px-1 pb-1">
      <PageHeader
        eyebrow="Appointments"
        title="Monitor all bookings"
        description="Review patient and doctor appointment activity."
      />

      <div className="space-y-4">
        <Panel className="p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px]">
            <SearchBox
              value={search}
              onChange={setSearch}
              placeholder="Search patient, doctor, email..."
            />
            <SelectFilter
              value={status}
              onChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
              options={[
                { label: "All Status", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Confirmed", value: "confirmed" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
              ]}
            />
          </div>
        </Panel>

        {isError ? (
          <ErrorState message={error?.response?.data?.message} />
        ) : (
          <Panel className="flex h-[620px] flex-col overflow-hidden">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Appointment list</h2>
                <p className="text-sm text-slate-500">Bookings across the platform.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {data?.total || 0} records
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-auto">
              {isLoading ? (
                <TableSkeleton columns={5} />
              ) : filteredAppointments.length === 0 ? (
                <div className="p-5">
                  <EmptyState title="No appointments found" />
                </div>
              ) : (
                <table className="min-w-[980px] w-full text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-400">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Patient</th>
                      <th className="px-5 py-4 font-semibold">Doctor</th>
                      <th className="px-5 py-4 font-semibold">Date & Time</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 font-semibold">Appointment ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="transition hover:bg-emerald-50/40">
                        <td className="px-5 py-4">
                          <AvatarName
                            avatar={appointment.patient?.avatar}
                            name={appointment.patient?.name}
                            subtitle={appointment.patient?.email}
                          />
                        </td>
                        <td className="px-5 py-4">
                          <AvatarName
                            avatar={appointment.doctor?.avatar}
                            name={appointment.doctor?.name}
                            subtitle={appointment.doctor?.specialization}
                          />
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-700">
                          {formatDateTime(appointment.date)}
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge value={appointment.status} />
                        </td>
                        <td className="px-5 py-4 text-slate-500">{appointment.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <Pagination
              page={page}
              limit={LIMIT}
              total={data?.total || filteredAppointments.length}
              onPageChange={setPage}
            />
          </Panel>
        )}
      </div>
    </div>
  );
}

export default AppointmentsPage;
