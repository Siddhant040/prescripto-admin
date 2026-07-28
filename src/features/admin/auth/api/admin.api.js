import api from "./axios";

export const getAdminDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getAdminDoctors = async ({ page = 1, limit = 10, isVerified } = {}) => {
  const response = await api.get("/admin/doctors", {
    params: {
      page,
      limit,
      ...(isVerified !== "all" && isVerified !== undefined ? { isVerified } : {}),
    },
  });

  return response.data;
};

export const verifyAdminDoctor = async (id) => {
  const response = await api.patch(`/admin/doctors/${id}/verify`);
  return response.data;
};

export const getAdminAppointments = async ({ page = 1, limit = 10, status } = {}) => {
  const response = await api.get("/admin/appointments", {
    params: {
      page,
      limit,
      ...(status && status !== "all" ? { status } : {}),
    },
  });

  return response.data;
};

export const getAdminReviews = async ({
  page = 1,
  limit = 10,
  includeDeleted = false,
} = {}) => {
  const response = await api.get("/admin/reviews", {
    params: {
      page,
      limit,
      includeDeleted,
    },
  });

  return response.data;
};

export const deleteAdminReview = async (id) => {
  const response = await api.delete(`/admin/reviews/${id}`);
  return response.data;
};
