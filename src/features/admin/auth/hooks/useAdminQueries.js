import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteAdminReview,
  getAdminAppointments,
  getAdminDashboard,
  getAdminDoctors,
  getAdminReviews,
  verifyAdminDoctor,
} from "../api/admin.api";

export const adminKeys = {
  dashboard: ["admin", "dashboard"],
  doctors: (params) => ["admin", "doctors", params],
  appointments: (params) => ["admin", "appointments", params],
  reviews: (params) => ["admin", "reviews", params],
};

export const useAdminDashboard = () =>
  useQuery({
    queryKey: adminKeys.dashboard,
    queryFn: async () => {
      const response = await getAdminDashboard();
      return response.data;
    },
  });

export const useAdminDoctors = (params) =>
  useQuery({
    queryKey: adminKeys.doctors(params),
    queryFn: async () => {
      const response = await getAdminDoctors(params);
      return response.data;
    },
  });

export const useVerifyDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyAdminDoctor,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "doctors"] });
      const snapshots = queryClient.getQueriesData({ queryKey: ["admin", "doctors"] });

      snapshots.forEach(([queryKey, oldData]) => {
        if (!oldData?.doctors) return;

        queryClient.setQueryData(queryKey, {
          ...oldData,
          doctors: oldData.doctors.map((doctor) =>
            doctor._id === id || doctor.user?._id === id
              ? { ...doctor, isVerified: true }
              : doctor
          ),
        });
      });

      return { snapshots };
    },
    onError: (error, _id, context) => {
      context?.snapshots?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error(error.response?.data?.message || "Could not verify doctor");
    },
    onSuccess: (response) => {
      toast.success(response.message || "Doctor verified successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard });
    },
  });
};

export const useAdminAppointments = (params) =>
  useQuery({
    queryKey: adminKeys.appointments(params),
    queryFn: async () => {
      const response = await getAdminAppointments(params);
      return response.data;
    },
  });

export const useAdminReviews = (params) =>
  useQuery({
    queryKey: adminKeys.reviews(params),
    queryFn: async () => {
      const response = await getAdminReviews(params);
      return response.data;
    },
  });

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminReview,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "reviews"] });
      const snapshots = queryClient.getQueriesData({ queryKey: ["admin", "reviews"] });

      snapshots.forEach(([queryKey, oldData]) => {
        if (!oldData?.reviews) return;

        queryClient.setQueryData(queryKey, {
          ...oldData,
          reviews: oldData.reviews.map((review) =>
            review.id === id || review._id === id
              ? { ...review, isDeleted: true }
              : review
          ),
        });
      });

      return { snapshots };
    },
    onError: (error, _id, context) => {
      context?.snapshots?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error(error.response?.data?.message || "Could not delete review");
    },
    onSuccess: (response) => {
      toast.success(response.message || "Review deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "reviews"] });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard });
    },
  });
};
