import api from "./axios";
export const adminLogin = async (userData) => {
const response = await api.post("/auth2/admin/admin-login", userData);
return response.data    
}
export const getCurrentUser = async ()=>{
  const response = await api.get("/auth2/admin/me");
  return response.data;
}
export const  refreshAccessToken = async () => {
  const response = await api.post("/auth2/admin/refresh-token");
  return response.data;
};
export const adminLogout = async () => {
  const response = await api.post("/auth2/admin/logout");
  return response.data;
}
