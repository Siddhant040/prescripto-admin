import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  AvatarName,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  PageHeader,
  Pagination,
  Panel,
  SearchBox,
  SelectFilter,
  StatusBadge,
  TableSkeleton,
} from "../components/adminUi";
import { useAdminDoctors, useVerifyDoctor } from "../hooks/useAdminQueries";

const LIMIT = 10;

function DoctorsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isVerified, setIsVerified] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { data, isLoading, isError, error } = useAdminDoctors({
    page,
    limit: LIMIT,
    isVerified,
  });
  const verifyMutation = useVerifyDoctor();

  const doctors = data?.doctors || [];
  const filteredDoctors = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return doctors;

    return doctors.filter((doctor) =>
      [
        doctor.user?.name,
        doctor.user?.email,
        doctor.specialization,
        doctor.clinicAddress,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [doctors, search]);

  const confirmVerify = () => {
    if (!selectedDoctor) return;

    verifyMutation.mutate(selectedDoctor._id, {
      onSuccess: () => setSelectedDoctor(null),
    });
  };

  return (
    <div className="w-full px-1 pb-1">
      <PageHeader
        eyebrow="Doctors"
        title="Manage doctor verification"
        description="Review doctors and verify profiles for patient booking."
      />

      <div className="space-y-4">
        <Panel className="p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px]">
            <SearchBox
              value={search}
              onChange={setSearch}
              placeholder="Search doctor, email, specialization..."
            />
            <SelectFilter
              value={isVerified}
              onChange={(value) => {
                setIsVerified(value);
                setPage(1);
              }}
              options={[
                { label: "All Doctors", value: "all" },
                { label: "Verified", value: "true" },
                { label: "Unverified", value: "false" },
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
                <h2 className="text-lg font-semibold text-slate-950">Doctor list</h2>
                <p className="text-sm text-slate-500">Paginated verification queue.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {data?.total || 0} records
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-auto">
              {isLoading ? (
                <TableSkeleton columns={6} />
              ) : filteredDoctors.length === 0 ? (
                <div className="p-5">
                  <EmptyState title="No doctors found" />
                </div>
              ) : (
                <table className="min-w-[900px] w-full text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-400">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Doctor</th>
                      <th className="px-5 py-4 font-semibold">Specialization</th>
                      <th className="px-5 py-4 font-semibold">Experience</th>
                      <th className="px-5 py-4 font-semibold">Fee</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDoctors.map((doctor) => (
                      <tr key={doctor._id} className="transition hover:bg-emerald-50/40">
                        <td className="px-5 py-4">
                          <AvatarName
                            avatar={doctor.user?.avatar}
                            name={doctor.user?.name}
                            subtitle={doctor.user?.email}
                          />
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-700">
                          {doctor.specialization || "Not added"}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {doctor.experience ?? 0} years
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          Rs. {doctor.consultationFee ?? 0}
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge value={doctor.isVerified ? "verified" : "unverified"} />
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            disabled={doctor.isVerified}
                            onClick={() => setSelectedDoctor(doctor)}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Verify
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <Pagination
              page={page}
              limit={LIMIT}
              total={data?.total || filteredDoctors.length}
              onPageChange={setPage}
            />
          </Panel>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(selectedDoctor)}
        title="Verify doctor?"
        description={`This will mark ${selectedDoctor?.user?.name || "this doctor"} as verified and allow patients to book appointments.`}
        confirmLabel="Verify Doctor"
        isLoading={verifyMutation.isPending}
        onCancel={() => setSelectedDoctor(null)}
        onConfirm={confirmVerify}
      />
    </div>
  );
}

export default DoctorsPage;
