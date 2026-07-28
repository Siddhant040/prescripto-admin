import { useMemo, useState } from "react";
import { Star, Trash2 } from "lucide-react";
import {
  AvatarName,
  ConfirmDialog,
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
import { useAdminReviews, useDeleteReview } from "../hooks/useAdminQueries";

const LIMIT = 10;

function ReviewsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState("false");
  const [selectedReview, setSelectedReview] = useState(null);

  const { data, isLoading, isError, error } = useAdminReviews({
    page,
    limit: LIMIT,
    includeDeleted: includeDeleted === "true",
  });
  const deleteMutation = useDeleteReview();

  const reviews = data?.reviews || [];
  const filteredReviews = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return reviews;

    return reviews.filter((review) =>
      [
        review.review,
        review.patient?.name,
        review.patient?.email,
        review.doctor?.name,
        review.doctor?.specialization,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [reviews, search]);

  const confirmDelete = () => {
    if (!selectedReview) return;

    deleteMutation.mutate(selectedReview.id, {
      onSuccess: () => setSelectedReview(null),
    });
  };

  return (
    <div className="w-full px-1 pb-1">
      <PageHeader
        eyebrow="Reviews"
        title="Moderate patient reviews"
        description="Review ratings, feedback and soft-deleted records."
      />

      <div className="space-y-4">
        <Panel className="p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px]">
            <SearchBox
              value={search}
              onChange={setSearch}
              placeholder="Search review, patient, doctor..."
            />
            <SelectFilter
              value={includeDeleted}
              onChange={(value) => {
                setIncludeDeleted(value);
                setPage(1);
              }}
              options={[
                { label: "Active Reviews", value: "false" },
                { label: "Include Deleted", value: "true" },
              ]}
            />
          </div>
        </Panel>

        {isError ? (
          <ErrorState message={error?.response?.data?.message} />
        ) : (
          <Panel className="flex h-[660px] flex-col overflow-hidden">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Review list</h2>
                <p className="text-sm text-slate-500">Patient feedback and moderation status.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {data?.total || 0} records
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {isLoading ? (
                <TableSkeleton rows={5} columns={3} />
              ) : filteredReviews.length === 0 ? (
                <EmptyState title="No reviews found" />
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                  {filteredReviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-[20px] border border-slate-100 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] transition hover:border-emerald-100 hover:shadow-[0_14px_28px_rgba(15,23,42,0.06)]"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <AvatarName
                          avatar={review.patient?.avatar}
                          name={review.patient?.name}
                          subtitle={review.patient?.email}
                        />
                        <StatusBadge value={review.isDeleted ? "deleted" : "active"} />
                      </div>

                      <div className="mt-4 flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${index < review.rating ? "fill-current" : "text-slate-200"}`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-slate-700">
                          {review.rating}/5
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {review.review || "No review text provided."}
                      </p>

                      <div className="mt-4 rounded-2xl bg-slate-50/80 p-3">
                        <AvatarName
                          avatar={review.doctor?.avatar}
                          name={review.doctor?.name}
                          subtitle={review.doctor?.specialization}
                        />
                        <p className="mt-3 text-xs text-slate-500">
                          Appointment: {formatDateTime(review.appointment?.date)}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <p className="text-xs text-slate-500">
                          Posted {formatDateTime(review.createdAt)}
                        </p>
                        <button
                          type="button"
                          disabled={review.isDeleted}
                          onClick={() => setSelectedReview(review)}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-rose-200 px-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <Pagination
              page={page}
              limit={LIMIT}
              total={data?.total || filteredReviews.length}
              onPageChange={setPage}
            />
          </Panel>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(selectedReview)}
        title="Delete review?"
        description="This will soft delete the review and recalculate the doctor's rating."
        confirmLabel="Delete Review"
        variant="danger"
        isLoading={deleteMutation.isPending}
        onCancel={() => setSelectedReview(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default ReviewsPage;
